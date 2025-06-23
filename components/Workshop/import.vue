<template>
  <div>
    <el-button type="success" @click="open=true">Importar Lista</el-button>
    <el-dialog v-model="open" title="Importar lista de estudiantes" class="!w-11/12 md:!w-1/3">
      <el-form label-width="auto" v-model="form">

        <el-form-item label="Tipo de lista:">
          <el-select v-model="form.type" placeholder="Selecciona un tipo" size="large">
            <el-option v-for="(type,index) in types" :key="index+1" :label="type" :value="index+1"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Lista:">
          <el-upload
              v-model:file-list="form.list"
              :auto-upload="false"
              :limit="1"
              :before-upload="handleBeforeUpload"
          >
            <el-button type="primary">Seleccionar lista</el-button>
          </el-upload>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="">
          <el-button @click="open = false">Cancelar</el-button>
          <el-button type="primary" @click="open = false">Importar</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
  const open =ref(false)
  const form = ref({list:[],type:null})
  const types = ref(['Examen de grado','Taller de Informatica'])
  function handleBeforeUpload(file) {
    console.log('Archivo seleccionado:', file)
    return false
  }

</script>