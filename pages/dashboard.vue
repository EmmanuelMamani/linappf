<template>
  <div class="p-5">
    <client-only>
      <UserPresentation></UserPresentation>
      <div class="mt-3 space-y-3">
        <SectionTable v-for="(section) in sections" :key="section.id" :section="section" ></SectionTable>
      </div>
      <div class="flex justify-end p-5">
        <SectionCreate :order="sections.length+1"></SectionCreate>
      </div>
    </client-only>
  </div>
</template>

<script setup>
  const sanctum = useSanctumClient()
  const sections=ref([])
  definePageMeta({
    layout: 'dashboard',
  })
  async function getSections() {
    sections.value = await sanctum(`/api/sections`, {method: 'GET'})
  }
  onMounted(() => {
    getSections()
  })
</script>
