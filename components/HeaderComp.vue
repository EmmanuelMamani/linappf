

<template>
  <div class="w-full mt-5 flex items-start">
    <div class="w-1/6 flex">
      <img src="/assets/img/logo_umss.png" alt="logo UMSS" class="w-2/3 md:w-1/2 mx-auto" />
      <!--<img src="/assets/img/logo_fce.png" alt="logo FCE" class=" w-2/3 md:w-1/2 mx-auto" />-->
    </div>

    <div class="w-5/6 lg:!w-4/6  flex items-center pr-2 mx-auto">
      <el-menu :default-active="activeIndex" class="grow justify-center !space-x-1  md:!space-x-20 w-1/2" mode="horizontal">
        <el-menu-item index="1" class="!text-xs sm:!text-sm md:!text-base">Inicio</el-menu-item>
        <el-menu-item index="2" class="!text-xs sm:!text-sm md:!text-base" >Conócenos</el-menu-item>
        <el-menu-item index="3" class="!text-xs sm:!text-sm md:!text-base" >Cronograma</el-menu-item>
      </el-menu>
      <UserLogin class="ml-5" />
    </div>
  </div>

</template>
<script lang="ts" setup>
  const activeIndex = ref('1')
</script>
