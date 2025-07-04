<template>
  <div class=" p-6 bg-white rounded-2xl shadow-md">
    <div class="grid grid-cols-4 gap-3">
      <div class="text-xl font-semibold col-span-3">{{props.section.name}}</div>
      <div class="justify-self-end">
        <ExtracurricularCreate :section_id="props.section.id" @created="handleCreated"></ExtracurricularCreate>
      </div>
    </div>
    <el-table v-if="props.section.extracurriculars.length>0" :data="extracurriculars" class="w-full">
      <el-table-column prop="title" label="Titulo" />
      <el-table-column prop="institution" label="Institución" />
      <el-table-column prop="start_date" label="Inicio" />
      <el-table-column prop="end_date" label="Fin" />
      <el-table-column fixed="right" label="Editar" min-width="120">
        <template #default="scope">
          <ExtracurricularUpdate :extracurricular="scope.row" :extracurricular_id="scope.row.id" @updated="handleUpdated"></ExtracurricularUpdate>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Eliminar" min-width="120">
        <template #default="scope">
          <ExtracurricularDelete :id="scope.row.id" @deleted="removeExtracurricular"></ExtracurricularDelete>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
  const props = defineProps({
    section: { type: Object, required: true }
  })
  const extracurriculars = ref([...props.section.extracurriculars])

  function handleCreated(newItem) {
    extracurriculars.value.push(newItem)
    extracurriculars.value.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
  }
  function handleUpdated(updatedItem) {
    const i = extracurriculars.value.findIndex(e => e.id === updatedItem.id)
    if (i !== -1) {
      extracurriculars.value[i] = updatedItem
      extracurriculars.value.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    }
  }
  function removeExtracurricular(id) {
    extracurriculars.value = extracurriculars.value.filter(w => w.id !== id)
  }
</script>