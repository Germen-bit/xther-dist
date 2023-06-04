<template>
  <div class="container bg-white mt-5 p-5 shadow">
    <div class="row mb-3">
      <p class="h3 col-md-2">Finanças</p>
    </div>
    <div class="container-fluid">
      <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="Relatorio Semanal"> <Semanal /> </el-tab-pane>
        <el-tab-pane label="Relatorio Trimestral"> <Trimestral/> </el-tab-pane>
        <el-tab-pane label="Relatorio Anual"><Anual /></el-tab-pane>
        <el-tab-pane label="Relatorio de Previsão de Alvo"><PrevisaoNovoAlvo /></el-tab-pane>
        <el-tab-pane label="Grafico de Finanças"><ResumoFinancas /></el-tab-pane>
        <el-tab-pane label="Grafico de Finanças Anual"><ResumoFinancasAnual /></el-tab-pane>
        <el-tab-pane label="Grafico de Finanças Alvo/Real"><GraficoAlvoReal /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Trimestral from './financas detalhadas/Trimestral.vue'
import Semanal from './financas detalhadas/Semanal1.vue'
import Anual from './financas detalhadas/Anual.vue'
import PrevisaoNovoAlvo from './financas detalhadas/PrevisaoNovoAlvo.vue'
import ResumoFinancas from './financas detalhadas/ResumoFinancas.vue'
import ResumoFinancasAnual from './financas detalhadas/ResumoFinancasAnual.vue'
import GraficoAlvoReal from './financas detalhadas/GraficoAlvoReal.vue'

export default {
  components: {
    Trimestral,
    Semanal,
    Anual,
    PrevisaoNovoAlvo,
    ResumoFinancas,
    ResumoFinancasAnual,
    GraficoAlvoReal
  },
}
</script>
<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
}
</style>
