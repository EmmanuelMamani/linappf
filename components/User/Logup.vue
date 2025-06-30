<template>
  <div>
    <el-button type="primary" @click="open=true" class="!text-xs md:!text-sm">Postular</el-button>
    <el-dialog v-model="open" title="Iniciar Sesión" class="!w-11/12 md:!w-1/3">
      <el-form label-width="auto" ref="formRef" :model="form" :rules="rules">
        <el-form-item label="CI:" prop="ci">
          <el-input v-model="form.ci" placeholder="Introducir CI" />
        </el-form-item>
        <el-form-item label="Fecha Nacimiento:" prop="birthdate">
          <el-date-picker
              v-model="form.birthdate"
              type="date"
              placeholder="Introducir fecha de nacimiento"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="Email:" prop="email">
          <el-input v-model="form.email" placeholder="Introducir email" />
        </el-form-item>
        <el-form-item label="Celular (opcional):">
          <el-input v-model="form.cellphone" placeholder="Introducir Celular" />
        </el-form-item>
        <el-form-item label="Telefono (opcional):">
          <el-input v-model="form.telephone" placeholder="Introducir Telefono" />
        </el-form-item>
        <el-form-item label="Contraseña:" prop="password">
          <el-input
              v-model="form.password"
              type="password"
              placeholder="Introducir contraseña"
              show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="">
          <el-button @click="open = false">Cancelar</el-button>
          <el-button type="primary" @click="register">Postular</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const open = ref(false)
const formRef = ref()
const sanctum = useSanctumClient()
const form = ref({
  ci: "",
  password: "",
  email: "",
  birthdate: null,
  cellphone: "",
  telephone: ""
})

const rules = {
  ci: [
    { required: true, message: 'CI es obligatorio', trigger: 'blur' },
    { min: 4, message: 'CI debe tener al menos 4 caracteres', trigger: 'blur' }
  ],
  birthdate: [
    { required: true, message: 'Fecha de nacimiento es obligatoria', trigger: 'change' }
  ],
  email: [
    { required: true, message: 'Email es obligatorio', trigger: 'blur' },
    { type: 'email', message: 'Formato de email no válido', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Contraseña es obligatoria', trigger: 'blur' },
    { min: 6, message: 'Contraseña mínima de 6 caracteres', trigger: 'blur' }
  ]
}

async function register() {
  try {

    await formRef.value.validate()

    await sanctum(`/api/register`, {
      method: 'POST',
      body: {
        ci: form.value.ci,
        password: form.value.password,
        email: form.value.email,
        birthdate: form.value.birthdate,
        cellphone: form.value.cellphone,
        telephone: form.value.telephone,
      }
    })

    ElMessage.success('Estudiante registrado exitosamente')
    window.location.reload()
  } catch (error) {
    const msg = error?.data?.message || 'Error al registrar estudiante'
    ElMessage.error(msg)
  }
}
</script>