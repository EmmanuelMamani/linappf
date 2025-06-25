<template>
  <div class="w-11/12 mx-auto my-5">
    <div class="flex justify-end mb-5">
      <WorkshopImport @update:workshopList="workshopList = $event"></WorkshopImport>
    </div>
    <el-empty description="Sin informacion" v-if="workshopList.length==0" />
    <el-table v-if="workshopList.length>0" :data="workshopList" height="500" class="w-full">
      <el-table-column prop="name" label="Nombre" width="180" />
      <el-table-column prop="ci" label="CI" width="180" />
      <el-table-column prop="code_est" label="Codigo Estudiante" width="180" />
      <el-table-column prop="code_plan" label="Carrera" width="180" />
      <el-table-column prop="birthdate" label="Nacimiento" width="180" />
      <el-table-column fixed="right" label="Eliminar" min-width="120">
        <template #default="scope">
          <WorkshopDelete :id="scope.row.id" @deleted="removeWorkshop"></WorkshopDelete>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
  const workshopList = ref([])
  definePageMeta({
    layout: 'dashboard',
  })

  function removeWorkshop(id) {
    workshopList.value = workshopList.value.filter(w => w.id !== id)
  }
</script>