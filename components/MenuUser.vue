<template>
  <el-menu
      :default-active="activeIndex"
      background-color="#172554"
      text-color="#ffff"
      active-text-color="#facc15"
      class="!pt-5"
  >
    <el-menu-item index="1">
      <template #title>
        <NuxtLink to="/dashboard" class="flex space-x-2 items-center !w-full">
          <Icon name="material-symbols-light:home-outline-rounded" class="text-2xl"/>
          <span>Inicio</span>
        </NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="2">
      <template #title>
        <Icon name="hugeicons:computer-desk-01" class="text-2xl"/>
        <span class="ml-2">Taller</span>
      </template>
    </el-menu-item>

    <el-menu-item index="3">
      <template #title>
        <Icon name="material-symbols-light:book-outline" class="text-2xl"/>
        <span class="ml-2">Kardex</span>
      </template>
    </el-menu-item>

    <el-menu-item index="4">
      <template #title>
        <Icon name="lets-icons:date-range" class="text-2xl"/>
        <span class="ml-2">Horario</span>
      </template >
    </el-menu-item>

    <el-menu-item index="5">
      <template #title>
        <Icon name="streamline-cyber:network" class="text-2xl"/>
        <span class="ml-2">Oferta laboral</span>
      </template>
    </el-menu-item>

    <el-menu-item index="6">
      <template #title>
        <NuxtLink to="/workshop" class="flex space-x-2 items-center !w-full">
          <Icon name="lsicon:file-import-filled" class="text-2xl"/>
          <span>Importar lista</span>
        </NuxtLink>
      </template>
    </el-menu-item>

    <el-menu-item index="7" @click="handleLogout">
      <template #title>
        <Icon name="material-symbols-light:logout-rounded" class="text-2xl"/>
        <span class="ml-2">Salir</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>

const activeIndex = ref("1")

const { logout } = useSanctumAuth()
const sanctum = useSanctumClient()
const userStore = useUserStore()
await userStore.refresh()

async function handleLogout() {
  try {

    await ElMessageBox.confirm(
        '¿Estás seguro de que quieres cerrar sesión?',
        'Confirmar cierre de sesión',
        {
          confirmButtonText: 'Sí, cerrar sesión',
          cancelButtonText: 'Cancelar',
          type: 'warning',
          center: true
        }
    )

    await logout()

    document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/'
    document.cookie = 'laravel_session=; Max-Age=0; path=/'
    navigateTo('/')

    ElNotification({
      title: 'Éxito',
      message: 'Sesión cerrada exitosamente',
      type: 'success',
      duration: 3000
    })

  } catch (error) {
    if (error === 'cancel') {
      return
    }
    console.error('Error al cerrar sesión:', error)
  }
}
</script>