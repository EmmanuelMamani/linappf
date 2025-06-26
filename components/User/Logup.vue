<template>
  <div>
    <el-button  type="primary" @click="open=true" class="!text-xs md:!text-sm"> Postular </el-button>
    <el-dialog v-model="open" title="Iniciar Sesión" class="!w-11/12 md:!w-1/3">
      <el-form label-width="auto" v-model="form">
        <el-form-item label="CI:">
          <el-input v-model="form.ci"  placeholder="Introducir CI" />
        </el-form-item>
        <el-form-item label="Fecha Nacimiento:">
          <el-date-picker v-model="form.birthdate" type="date" placeholder="Introducir fecha de nacimiento" format="DD-MM-YYYY" value-format="YYYY-MM-DD"/>
        </el-form-item>
        <el-form-item label="Email:">
          <el-input v-model="form.email"  placeholder="Introducir email" />
        </el-form-item>
        <el-form-item label="Celular (opcional):">
          <el-input v-model="form.cellphone"  placeholder="Introducir Celular" />
        </el-form-item>
        <el-form-item label="Telefono (opcional):">
        <el-input v-model="form.telephone"  placeholder="Introducir Telefono" />
      </el-form-item>
        <el-form-item label="Contraseña:">
          <el-input v-model="form.password" type="password" placeholder="Introducir contraseña" show-password/>
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
<script setup >
  const open =ref(false)
  const form = ref({ci: "", password: "",email:"",birthdate:null,cellphone:"",telephone:""})
  async function register(){
    console.log(form.value)
  }
</script>
