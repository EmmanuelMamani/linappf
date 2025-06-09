<template>
  <div>
    <el-button  type="primary" @click="open=true" class="!text-xs md:!text-sm"> Ingresar </el-button>
    <el-dialog v-model="open" title="Iniciar Sesión" class="!w-11/12 md:!w-1/3">
      <el-form label-width="auto" v-model="form">
        <el-form-item label="Usuario:">
          <el-input v-model="form.username"  placeholder="Introducir usuario"/>
        </el-form-item>
        <el-form-item label="Contraseña:">
          <el-input v-model="form.password" type="password" placeholder="Introducir contraseña" show-password/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="">
          <el-button @click="open = false">Cancelar</el-button>
          <el-button type="primary" @click="login">Ingresar</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRuntimeConfig } from '#app'

const open = ref(false)
const form = ref({ username: '', password: '' })
const error = ref(null)

const auth = useAuthStore()
const config = useRuntimeConfig()

async function login() {
  error.value = null
  open.value = false

  try {
    const res = await fetch(`${config.public.apiBase}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.value.username,
        password: form.value.password
      })
    })

    if (!res.ok) {
      const data = await res.json()
      ElNotification({
        title: 'Error',
        message: 'Credenciales incorrectas, intente nuevamente',
        type: 'error',
      })
      throw new Error(data.message || 'Error al iniciar sesión')
    }

    const data = await res.json()
    auth.setToken(data.token)
    auth.setUser(data.user)
    ElNotification({
      title: 'Exito',
      message: 'Inicio de sesion exitoso',
      type: 'success',
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  }
}
</script>
