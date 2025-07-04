<template>
  <div>
    <el-button type="success" @click="open = true" :loading="loading">
      Agregar
    </el-button>

    <el-dialog v-model="open" title="Agregar Actividad" width="500px" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" label-position="left">
        <el-form-item label="Título" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="Institución" prop="institution">
          <el-input v-model="form.institution" />
        </el-form-item>

        <el-form-item label="Inicio" prop="start_date">
          <el-date-picker v-model="form.start_date" type="date"    format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="Fin" prop="end_date">
          <el-date-picker v-model="form.end_date" type="date"    format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="Tipo" prop="topic_id">
          <el-select v-model="form.topic_id" placeholder="Selecciona un tipo" size="large">
            <el-option v-for="topic in topics" :key="topic.id" :label="topic.name" :value="topic.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Diploma (opcional)">
          <el-upload
              :auto-upload="false"
              :show-file-list="true"
              :limit="1"
              :on-change="handleFileChange"
          >
            <el-button>Seleccionar archivo</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="open = false">Cancelar</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          Guardar
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const sanctum = useSanctumClient()
const props = defineProps({
  section_id: { type: Number, required: true }
})

const open = ref(false)
const loading = ref(false)
const emit = defineEmits(['created'])
const form = ref({
  title: '',
  institution: '',
  start_date: '',
  end_date: '',
  topic_id: null,
})

const diplomaFile = ref(null)
const topics=ref([])
const formRef = ref()

const rules = {
  title: [{ required: true, message: 'Título requerido', trigger: 'blur' }],
  institution: [{ required: true, message: 'Institución requerida', trigger: 'blur' }],
  start_date: [{ required: true, message: 'Fecha de inicio requerida', trigger: 'change' }],
  end_date: [
    { required: true, message: 'Fecha de fin requerida', trigger: 'change' },
    {
      validator: (_, value, callback) => {
        if (!value || !form.value.start_date) {
          return callback()
        }
        if (new Date(value) < new Date(form.value.start_date)) {
          return callback(new Error('La fecha de fin no puede ser menor que la fecha de inicio'))
        }
        callback()
      },
      trigger: 'change',
    }
  ],
  topic_id: [{ required: true, message: 'Tema requerido', trigger: 'change' }],
}

const handleFileChange = (file) => {
  diplomaFile.value = file.raw
}

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('institution', form.value.institution)
    formData.append('start_date', form.value.start_date)
    formData.append('end_date', form.value.end_date)
    formData.append('topic_id', form.value.topic_id)
    formData.append('section', props.section_id)
    if (diplomaFile.value) {
      formData.append('diploma_file', diplomaFile.value)
    }
    try {
      const response=await sanctum('/api/extracurricular', {
        method: 'POST',
        body: formData,
      })
      emit('created', response)
      ElMessage.success('Actividad creada')
      open.value = false
      resetForm()
    } catch (e) {
      console.error(e)
      ElMessage.error('Error al guardar')
    } finally {
      loading.value = false
    }
  })
}

function resetForm() {
  form.value = {
    title: '',
    institution: '',
    start_date: '',
    end_date: '',
    topic_id: null,
  }
  diplomaFile.value = null
}
async function getTopics(){
  try {
    topics.value = await sanctum(`/api/topics`, {
      method: 'GET',
    })
  } catch (error) {
    console.error(error)
  }
}
onMounted(getTopics)
</script>
