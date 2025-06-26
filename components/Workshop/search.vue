<template>
  <div class="flex space-x-3 w-full items-center">
    <el-select class="!w-1/4"  v-model="form.age_id" placeholder="Selecciona una gestion" size="large">
      <el-option v-for="age in ageList" :key="age.id" :label="`${age.period}/${age.name}`" :value="age.id"/>
    </el-select>
    <el-select class="!w-1/4"  v-model="form.type_id" placeholder="Selecciona un tipo de lista" size="large">
      <el-option v-for="type in workshopList" :key="type.id" :label="type.name" :value="type.id"/>
    </el-select>
    <el-button type="primary" @click="search">Buscar</el-button>
  </div>
</template>
<script setup>
  const sanctum = useSanctumClient()
  const ageList = ref([])
  const workshopList = ref([])
  const form = ref({age_id:null,type_id:null})
  const emit = defineEmits(['update:workshopList'])

  async function fetchAges() {
    try {
      ageList.value = await sanctum(`/api/age`, {
        method: 'GET',
      })
    } catch (error) {
      console.error(error)
    }
  }
  async function fetchTypes() {
    try {
      workshopList.value = await sanctum(`/api/workshopTypes`, {
        method: 'GET',
      })
    } catch (error) {
      console.error(error)
    }
  }
  async function search() {
    try {
      const response = await sanctum(`/api/workshop/search`, {
        method: 'POST',
        body:{
          age_id:form.value.age_id,
          type_id:form.value.type_id,
        }
      })
      emit('update:workshopList', response)
    } catch (error) {
      ElMessage.error('Lista no encontrada')
    }
  }
  onMounted(async () => {
    await fetchAges()
    await fetchTypes()
  })
</script>