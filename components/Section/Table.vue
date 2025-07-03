<template>
  <div class=" p-6 bg-white rounded-2xl shadow-md">
    <div class="grid grid-cols-4 gap-3">
      <div class="text-xl font-semibold col-span-3">{{props.section.name}}</div>
      <div class="justify-self-end">
        <ExtracurricularCreate :section_id="props.section.id"></ExtracurricularCreate>
      </div>
    </div>
    <el-table v-if="props.section.extracurriculars.length>0" :data="props.section.extracurriculars" class="w-full">
      <el-table-column prop="title" label="Titulo" />
      <el-table-column prop="institution" label="Institución" />
      <el-table-column prop="start_date" label="Inicio" />
      <el-table-column prop="end_date" label="Fin" />
    </el-table>
  </div>
</template>
<script setup>
  const props = defineProps({
    section: { type: Object, required: true }
  })
</script>