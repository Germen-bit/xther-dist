<template lang="">
  <div class="container bg-white mt-5 p-5 shadow">
    <div class="row mb-3">
      <p class="h3 col-md-2">Salvações</p>
    </div>
    <div class="container-fluid">
      <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="Previsão e Novo Alvo"> <PrevisaoNovoAlvo /> </el-tab-pane>
        <el-tab-pane label="Media Trimestral"> <MediaTrimestral /> </el-tab-pane>
        <el-tab-pane label="Resumo de Presenças"> <ResumoPresenca /> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MediaTrimestral from './salvacao detalhada/MediaTrimestral.vue'
import PrevisaoNovoAlvo from './salvacao detalhada/PrevisaoNovoAlvo.vue'
import ResumoPresenca from './salvacao detalhada/ResumoPresenca.vue'

export default {
  components: {
    PrevisaoNovoAlvo,
    MediaTrimestral,
    ResumoPresenca
  }
}
</script>
<style lang=""></style>
