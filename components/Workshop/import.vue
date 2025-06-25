<template>
  <div>
    <el-button type="success" @click="open = true">Importar Lista</el-button>

    <el-dialog v-model="open" title="Importar lista de estudiantes" class="!w-11/12 md:!w-1/3">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">

        <el-form-item label="Tipo de lista:" prop="type">
          <el-select
              v-model="form.type"
              placeholder="Selecciona un tipo"
              size="large"
              clearable
          >
            <el-option
                v-for="type in types"
                :key="type.id"
                :label="type.name"
                :value="type.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Lista:" prop="list">
          <el-upload
              v-model:file-list="form.list"
              :auto-upload="false"
              :limit="1"
              accept=".csv"
          >
            <el-button type="primary">Seleccionar lista</el-button>
            <template #tip>
              <div class="el-upload__tip">
                Solo archivos CSV con las columnas requeridas
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <div>
          <el-button @click="open = false">Cancelar</el-button>
          <el-button type="primary" @click="imported">Importar</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import Papa from 'papaparse'

const open = ref(false)
const form = ref({list: [], type: null})
const formRef = ref()
const types = ref([])
const config = useRuntimeConfig()
const sanctum = useSanctumClient()
const requiredHeaders = ['name', 'ci', 'code_plan', 'birthdate', 'code_est']
const emit = defineEmits(['update:workshopList'])

const rules = {
  type: [{required: true, message: 'Selecciona un tipo de lista', trigger: 'change'}],
  list: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('Selecciona un archivo CSV'))
          return
        }

        const file = value[0]?.raw
        if (!file) {
          callback(new Error('Archivo no válido'))
          return
        }

        if (!file.name.toLowerCase().endsWith('.csv')) {
          callback(new Error('El archivo debe ser .csv'))
          return
        }

        callback()
      },
      trigger: 'change'
    }
  ]
}

async function fetchWorkshopTypes() {
  try {
    const data = await $fetch('/workshopTypes', {
      baseURL: config.public.apiBase,
      credentials: 'include'
    })
    types.value = data
  } catch (error) {
    console.error('Error al cargar workshop types:', error)
    ElMessage.error('Error al cargar los tipos de taller')
  }
}

onMounted(fetchWorkshopTypes)

async function imported() {
  try {
    await formRef.value.validate()

    const file = form.value.list[0].raw
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const csvText = event.target?.result

        const parsedResults = await new Promise((resolve, reject) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const headers = Object.keys(results.data[0] || {})
              const isValidFormat = requiredHeaders.every(h => headers.includes(h))

              if (!isValidFormat) {
                reject(new Error('El archivo CSV no tiene las columnas requeridas.'))
                return
              }
              resolve(results)
            },
            error: (err) => {
              reject(new Error('Error al procesar el archivo: ' + err.message))
            }
          })
        })

        const workshop= await sanctum('/api/workshop', {
          method: 'POST',
          body: {
            type: form.value.type,
            students: parsedResults.data,
          },
        })

        emit('update:workshopList', workshop)

        // Resetear formulario
        form.value = { list: [], type: null }
        open.value = false
        ElMessage.success('Lista importada correctamente')

      } catch (error) {
        ElMessage.error(error.message)
      }
    }

    reader.onerror = () => {
      throw new Error('Error al leer el archivo')
    }

    reader.readAsText(file)
  } catch (error) {
    if (error?.errors) {
      // Errores de validación del formulario
      ElMessage.warning('Completa correctamente todos los campos')
    } else {
      // Otros errores
      console.error('Error en imported:', error)
      ElMessage.error(error.message || 'Error al importar la lista')
    }
  }
}
</script>