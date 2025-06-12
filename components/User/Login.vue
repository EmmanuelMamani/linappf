<template>
  <div>
    <el-button type="primary" @click="open = true">
      Iniciar Sesión
    </el-button>

    <el-dialog v-model="open" title="Iniciar Sesión" width="400px" :close-on-click-modal="false">

      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="handleLogin">

        <el-form-item label="Email" prop="username">
          <el-input v-model="form.username" type="email" placeholder="Ingresa tu email" :disabled="loading"/>
        </el-form-item>

        <el-form-item label="Contraseña" prop="password">
          <el-input v-model="form.password" type="password" placeholder="Ingresa tu contraseña" :disabled="loading" @keyup.enter="handleLogin" show-password/>
        </el-form-item>

        <div v-if="error" class="mb-4">
          <el-alert :title="error" type="error" show-icon :closable="false"/>
        </div>

      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="open = false" :disabled="loading">Cancelar</el-button>
          <el-button type="primary" @click="handleLogin" :loading="loading">Iniciar Sesión</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

const { login } = useSanctumAuth()

const open = ref(false)
const loading = ref(false)
const error = ref(null)
const formRef = ref()

const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: 'El email es requerido', trigger: 'blur' },
    { type: 'email', message: 'Formato de email inválido', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'La contraseña es requerida', trigger: 'blur' },
    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
  ]
}

async function handleLogin() {
  if (!formRef.value) return

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  error.value = null

  try {
    await login({
      email: form.value.username,
      password: form.value.password
    })

    ElNotification({
      title: 'Éxito',
      message: 'Inicio de sesión exitoso',
      type: 'success',
    })

    open.value = false
    form.value = { username: '', password: '' }

  } catch (err) {

    const message = err.data?.message || 'Credenciales incorrectas, intente nuevamente'

    error.value = message

    ElNotification({
      title: 'Error',
      message: message,
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

watch(open, (newVal) => {
  if (newVal) {
    error.value = null
  }
})
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>