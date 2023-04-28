<template lang="">
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-8 gx-5">
        <div class="row">
          <div class="col-md-12 mb-3">
            <AdicionarTarefas />
          </div>

          <div class="row">
            <div class="col-md-6">
              <div style="width: 100%;"><canvas class="acquisitions1"></canvas></div>
            </div>
            <div class="col-md-6">
              <div style="width: 100%;"><canvas class="acquisitions2"></canvas></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <RenderizarTarefas />
      </div>
    </div>
  </div>
</template>
<script>
import { Chart } from 'chart.js'
import RenderizarTarefas from './tarefas/RenderizarTarefas.vue'
import AdicionarTarefas from './tarefas/AdicionarTarefas.vue'

export default {
  components: {
    RenderizarTarefas,
    AdicionarTarefas
  },
  methods: {
    createChart() {
      const dados = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 }
      ]

      new Chart(document.querySelector('.acquisitions1'), {
        type: 'bar',
        data: {
          labels: dados.map((row) => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: dados.map((row) => row.count)
            }
          ]
        }
      })
      new Chart(document.querySelector('.acquisitions2'), {
        type: 'bar',
        data: {
          labels: dados.map((row) => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: dados.map((row) => row.count)
            }
          ]
        }
      })
    }
  },
  mounted() {
    this.createChart()
  }
}
</script>
<style scoped>
.list-group .list-group-item {
  cursor: pointer;
}
</style>
