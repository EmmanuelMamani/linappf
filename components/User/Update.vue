<template>
  <div>
    <el-button type="warning" @click="openDialog">Actualizar Info.</el-button>

    <el-dialog v-model="dialogVisible" title="Actualizar Información" width="600px">
      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="120px"
          label-position="left"
          enctype="multipart/form-data"
      >
        <el-form-item label="Celular" prop="cellphone">
          <el-input v-model="form.cellphone" />
        </el-form-item>

        <el-form-item label="Correo" prop="email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>

        <el-form-item label="Contraseña" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Foto (opcional)" prop="photo">
          <el-upload
              class="upload-demo"
              action=""
              :auto-upload="false"
              :limit="1"
              :on-change="handleFileChange"
              accept="image/*"
          >
            <el-button type="primary">Seleccionar Imagen</el-button>
            <template #tip>
              <div class="el-upload__tip text-gray-500 text-sm mt-1">
                Solo imágenes (.jpg, .png, .jpeg). Tamaño máximo 2MB.
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="Presentación" prop="presentation">
          <el-input
              type="textarea"
              v-model="form.presentation"
              :rows="4"
              maxlength="255"
              show-word-limit
          />
        </el-form-item>

        <el-form-item label="Video (URL)" prop="video">
          <el-input v-model="form.video" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="submitForm">Guardar</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

const sanctum = useSanctumClient()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const dialogVisible = ref(false)
const formRef = ref()

const form = ref({
  cellphone: '',
  email: '',
  password: '',
  photo: null,
  presentation: '',
  video: '',
})

const rules = {
  cellphone: [{ required: true, message: 'El celular es obligatorio', trigger: 'blur' }],
  email: [
    { required: true, message: 'El correo es obligatorio', trigger: 'blur' },
    { type: 'email', message: 'Formato de correo inválido', trigger: 'blur' },
  ],
  password: [
    {
      validator: (_, value, callback) => {
        if (value && value.length < 6) {
          callback(new Error('La contraseña debe tener al menos 6 caracteres'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  photo: [
    {
      validator: (_, value, callback) => {
        if (value && !value.type.startsWith('image/')) {
          callback(new Error('El archivo debe ser una imagen'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  presentation: [
    {
      validator: (_, value, callback) => {
        if (value && value.length > 255) {
          callback(new Error('La presentación no debe superar los 255 caracteres'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const handleFileChange = (file) => {
  form.value.photo = file.raw
}

const openDialog = () => {
  form.value = {
    cellphone: user.value.cellphone || '',
    email: user.value.email || '',
    password: '',
    photo: null,
    presentation: user.value.profile?.presentation || '',
    video: user.value.profile?.video || '',
  }
  dialogVisible.value = true
}

const submitForm = async () => {
  await formRef.value.validate(async (valid) => {
    if (!valid) return

    const formData = new FormData()
    formData.append('cellphone', form.value.cellphone)
    formData.append('email', form.value.email)
    if (form.value.password) formData.append('password', form.value.password)
    if (form.value.photo) formData.append('photo', form.value.photo)
    formData.append('presentation', form.value.presentation)
    formData.append('video', form.value.video)

    try {
      const response=await sanctum('/api/user', {
        method: 'PUT',
        body: formData,
      })
      await userStore.refresh()
      ElMessage.success('Información actualizada correctamente')
      dialogVisible.value = false

    } catch (err) {
      ElMessage.error('Hubo un error al actualizar los datos')
    }
  })
}
</script>
