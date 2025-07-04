<template>
  <div>
    <el-button type="success" @click="open = true" :loading="loading">Crear Sección</el-button>

    <el-dialog v-model="open" title="Nueva Sección" width="400px" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="form.name" placeholder="Nombre de la sección" />
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
  order: { type: Number, required: true }
})

const open = ref(false)
const loading = ref(false)
const emit = defineEmits(['created'])
const form = ref({
  name: ''
})

const formRef = ref()

const rules = {
  name: [
    { required: true, message: 'El nombre es requerido', trigger: 'blur' }
  ]
}

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true

    try {
      const response = await sanctum(`/api/section`, {
        method: 'POST',
        body: {
          name: form.value.name,
          order: props.order
        },
      })
      emit('created', response)
      ElMessage.success('Sección creada correctamente')
      form.value.name = ''
      open.value = false
    } catch (error) {
      console.error(error)
      ElMessage.error('Error al crear la sección')
    } finally {
      loading.value = false
    }
  })
}
</script>
