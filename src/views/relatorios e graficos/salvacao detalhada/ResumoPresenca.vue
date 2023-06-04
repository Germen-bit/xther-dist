<template lang="">
  <el-container class="shadow p-3 mb-2 container d-flex container-grafico">
    <el-form :inline="true">
      <el-form-item label="Selecionar culto">
        <el-select v-model="ano" placeholder="Ano" style="width: 100px; margin-right: 10px">
          <el-option
            v-for="ano in options.ano"
            :key="ano"
            :label="ano"
            :value="ano"
            @click="arrayDeCulto"
            >{{ ano }}</el-option
          >
        </el-select>
        <el-select v-model="culto" placeholder="Culto" v-if="ano">
          <el-option v-for="culto in cultoPorNome" :key="culto" :label="culto" :value="culto">{{
            culto
          }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pesquisar">Grafico</el-button>
      </el-form-item>
    </el-form>

    <div style="width: 90%" v-if="culto">
      <canvas id="grafico"></canvas>
    </div>
  </el-container>
</template>
<script>
import Chart from 'chart.js/auto'
import axios from 'axios'
import dayjs from 'dayjs'

let anualChart

export default {
  data() {
    return {
      dadosDeLancamento: [],
      options: {
        ano: []
      },
      culto: '',
      ano: '',
      result: '',
      cultoPorNome: ''
    }
  },
  methods: {
    async carregarLancamento() {
      try {
        this.dadosDeLancamento = []
        const response = await axios.get('/lancamentos/')
        this.dadosDeLancamento = response.data
        this.fillOptionsAno(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    },
    arrayDeCulto() {
      const culto = this.dadosDeLancamento
      this.cultoPorNome = culto
        .map((culto) => (dayjs(culto.data).year() === this.ano ? culto.nomeCulto : undefined))
        .filter((valor, index, array) => {
          return array.indexOf(valor) === index && valor !== undefined
        })
    },
    fillOptionsAno(dados) {
      dados.forEach((item) => {
        const { data } = item
        this.options.ano.push(dayjs(data).year())
      })

      this.options.ano = this.uniqBy(this.options.ano)
    },
    uniqBy(a) {
      return Array.from(new Set(a))
    },
    pesquisar() {
      const chartData = this.dadosDeLancamento
        .filter((valor) => valor.nomeCulto === this.culto && dayjs(valor.data).year() === this.ano)
        .sort((a, b) => a.semana - b.semana)

      if (anualChart != null) {
        anualChart.destroy()
      }

      this.createChart(chartData)
    },
    createChart(data) {
      const grafico = document.querySelector('#grafico')

      anualChart = new Chart(grafico, {
        type: 'line',
        data: {
          labels: data.map((culto) => `Semana ${culto.semana}`),
          datasets: [
            {
              label: `Pessoas Salvas`,
              data: data.map((culto) => culto.presencas.convertidos.real),
              borderWidth: 2,
              borderJoinStyle: 'round',
              borderColor: '#6657F6'
            },
            {
              label: 'Alvo de Salvações',
              data: data.map((culto) => culto.presencas.convertidos.alvo),
              borderWidth: 2,
              borderJoinStyle: 'bevel',
              borderColor: '#EB21A1'
            }
          ]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          },
          animation: false
        }
      })
    }
  },
  mounted() {
    this.carregarLancamento()
  }
}
</script>
<style scoped>
.container-grafico {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
