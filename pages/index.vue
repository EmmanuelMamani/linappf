<template>
  <div class="w-9/12 sm:w-8/12 mx-auto sm:flex sm:space-x-2 items-center space-y-5 sm:space-y-0 mt-5 sm:mt-0">
    <div class=" w-full sm:w-4/5">
      <h1 class="text-xl sm:text-2xl md:text-3xl  lg:text-4xl font-bold mb-5">Facultad de Ciencias Economicas</h1>
      <p class="md:text-lg lg:text-xl text-gray-600 text-justify">La facultad mas grande de la UMSS con mas de 10.000 estudiantes formados, reconocida a nivel nacional y con acreditaciones de mas del 80 % de sus carreras.
        Forma parte de nosotros</p>
      <div class="flex space-x-10 mt-5 items-center">
        <UserLogup></UserLogup>
        <a href="#" class="flex items-center "  >
          <div class="bg-red-400 w-7 h-7 flex items-center rounded-full justify-center mr-2 outline-1 outline-offset-2 outline-red-400">
            <Icon name="material-symbols-light:play-arrow-rounded"  class="!text-white text-2xl"/>
          </div>
          <span>Ver presentación</span>
        </a>
      </div>
    </div>
    <div class="flex justify-center sm:justify-end w-full">
      <img src="/assets/img/girl.jpg" alt="estudiante" class="w-5/6 md:w-1/2">
    </div>
  </div>
</template>
<script setup>
  definePageMeta({
  })
</script>