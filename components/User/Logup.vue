<template>
  <div>
    <el-button  type="primary" @click="open=true" class="!text-xs md:!text-sm"> Postular </el-button>
    <el-dialog v-model="open" title="Iniciar Sesión" class="!w-11/12 md:!w-1/3">
      <el-form label-width="auto" v-model="form">
        <el-form-item label="Usuario:">
          <el-input v-model="form.username"  placeholder="Introducir usuario" show-password/>
        </el-form-item>
        <el-form-item label="Contraseña:">
          <el-input v-model="form.password" type="password" placeholder="Introducir contraseña" show-password/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="">
          <el-button @click="open = false">Cancelar</el-button>
          <el-button type="primary" @click="open = false">Postular</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup >
  const open =ref(false)
  const form = ref({username: "", password: ""})
</script>
