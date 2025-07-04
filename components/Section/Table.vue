<template>
  <div class=" p-6 bg-white rounded-2xl shadow-md">
    <div class="grid grid-cols-4 gap-3">
      <div class="text-xl font-semibold col-span-3">{{props.section.name}}</div>
      <div class="justify-self-end">
        <ExtracurricularCreate :section_id="props.section.id" @created="handleCreated"></ExtracurricularCreate>
      </div>
    </div>
    <el-table v-if="props.section.extracurriculars.length>0" :data="extracurriculars" class="w-full">
      <el-table-column label="Titulo">
        <template #default="scope">
          <div class="flex space-x-2 items-center">
            <div>{{scope.row.title}}</div>
            <Icon v-if="scope.row.accredited" name="streamline-ultimate:check-badge-bold" class="!text-sky-400"></Icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="institution" label="Institución" />
      <el-table-column label="Tipo">
        <template #default="scope"><div>{{scope.row.topic.name}}</div></template>
      </el-table-column>
      <el-table-column label="Estado">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)" effect="light" round>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Inicio">
        <template #default="scope">
          {{ formatDate(scope.row.start_date) }}
        </template>
      </el-table-column>

      <el-table-column label="Fin">
        <template #default="scope">
          {{ formatDate(scope.row.end_date) }}
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Activo" >
        <template #default="scope">
          <ExtracurricularActive :id="scope.row.id" :active="scope.row.active"></ExtracurricularActive>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Editar" >
        <template #default="scope">
          <ExtracurricularUpdate :extracurricular="scope.row" :extracurricular_id="scope.row.id" @updated="handleUpdated"></ExtracurricularUpdate>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Eliminar" >
        <template #default="scope">
          <ExtracurricularDelete :id="scope.row.id" @deleted="removeExtracurricular"></ExtracurricularDelete>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
  import dayjs from 'dayjs'
  import 'dayjs/locale/es'
  dayjs.locale('es')

  const props = defineProps({
    section: { type: Object, required: true }
  })
  const extracurriculars = ref([...props.section.extracurriculars])

  function formatDate(date) {
    return dayjs(date).format('D MMMM YYYY') // Ejemplo: 4 mayo 2025
  }

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
  function getStatusType(status) {
    switch (status) {
      case 'Finalizado':
        return 'success'
      case 'Acreditado':
        return 'primary'
      case 'En revisión':
        return 'warning'
      default:
        return ''
    }
  }

</script>