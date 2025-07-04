<template>
  <el-switch v-model="activeLocal"  @change="updateStatus" />
</template>
<script setup>
  const props = defineProps({
    id: { type: Number, required: true },
    active: { type: Number, required: true },
  })
  const activeLocal = ref(!!props.active)

  const sanctum = useSanctumClient()

  async function updateStatus() {
    try {
      await sanctum(`/api/extracurricular/${props.id}/active`, {
        method: 'POST',
      })
      ElMessage.success('Estado actualizado')
    } catch (e) {
      console.error(e)
      ElMessage.error('Error al actualizar')
    }
  }

</script>