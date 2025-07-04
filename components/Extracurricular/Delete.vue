<template>
  <el-popconfirm  title="¿Seguro que quieres eliminarlo?" placement="top" confirm-button-text="Si" @confirm="deleted">
    <template #reference>
      <el-button type="danger" >Eliminar</el-button>
    </template>
  </el-popconfirm>
</template>

<script setup>
const props = defineProps({
  id: { type: Number, required: true }
})

const emit = defineEmits(['deleted'])
const sanctum = useSanctumClient()

async function deleted() {
  try {
    await sanctum(`/api/extracurricular/${props.id}`, {
      method: 'DELETE',
    })

    emit('deleted', props.id)
    ElMessage.success('Eliminado correctamente')
  } catch (error) {
    console.error(error)
    ElMessage.error('Error al eliminar el registro')
  }
}
</script>
