<template>
  <div class="grid grid-cols-5 gap-6 p-6 bg-white rounded-2xl shadow-md items-start" v-if="user">
    <div class="col-start-5 justify-self-end">
      <UserUpdate></UserUpdate>
    </div>

    <div class="flex flex-col col-span-1 space-y-3">

      <div class="flex justify-center mb-3">
        <div class="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-white text-6xl overflow-hidden">
          <img v-if="user?.photo" :src="`${config.public.apiBase}storage/${user.photo}`" alt="profile" />
          <Icon v-if="!user?.photo" name="el:user" class="text-6xl text-slate-700" />
        </div>
      </div>

      <div class="flex items-center space-x-2 text-slate-700">
        <Icon name="foundation:telephone" class="text-lg" />
        <span class="text-sm">{{ user?.cellphone }}</span>
      </div>

      <div class="flex items-center space-x-2 text-slate-700">
        <Icon name="mi:email" class="text-lg" />
        <span class="text-sm break-words">{{ user?.email }}</span>
      </div>
    </div>


    <div class="col-span-4 space-y-4">
      <h1 class="text-4xl font-bold text-gray-800 uppercase tracking-wide">
        {{ user?.name }}
      </h1>

      <div>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Presentación</h2>
        <p class="text-gray-600 text-justify leading-relaxed text-base whitespace-pre-line">
          {{ user?.profile?.presentation }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
const userStore = useUserStore()
const config = useRuntimeConfig()
const user = computed(() => userStore.user)
</script>
