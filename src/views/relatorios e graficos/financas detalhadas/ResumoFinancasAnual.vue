<template lang="">
  <el-container class="shadow p-3 mb-2 container d-flex container-grafico">
    <el-form :inline="true">
      <el-form-item label="Selecionar Ano">
        <el-select v-model="ano" placeholder="Ano" style="width: 100px; margin-right: 10px">
          <el-option
            v-for="ano in options.ano"
            :key="ano"
            :label="ano"
            :value="ano"
            @click="todosOsMeses"
            >{{ ano }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="pesquisar">Grafico</el-button>
      </el-form-item>
    </el-form>

    <div style="width: 90%" v-if="ano">
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
      ano: '',
      result: '',
      meses: '',
      total: []
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
    fillOptionsAno(dados) {
      dados.forEach((item) => {
        const { data } = item
        this.options.ano.push(dayjs(data).year())
      })

      this.options.ano = this.uniqBy(this.options.ano)
    },
    todosOsMeses() {
      this.meses = this.dadosDeLancamento
      .filter(valor => {
        return dayjs(valor.data).year() === this.ano
      })
      .map((culto) => dayjs(culto.data).format('MMMM'))
      .filter((valor, index, array) => {
        return array.indexOf(valor) === index
      })
    },
    cultosOrganizadosPorMes() {
      this.result = this.meses
      .map((mes) => {
        return this.dadosDeLancamento.filter((valor) => {
          if (mes === dayjs(valor.data).format('MMMM')) {
            return { culto: valor }
          }
        })
      })

      this.somarTotalPorMes()
    },
    somarTotalPorMes() {
      for (let arrayCulto of this.result) {
        let contador = 0
        let mes
        let numeroDoMes
        for (let culto of arrayCulto) {
          contador = contador + Number((culto.financas.total).replace(',',''))
          mes = dayjs(culto.data).format('MMMM')
          numeroDoMes = dayjs(culto.data).month()
        }
        this.total.push({ total: contador, mes, numeroDoMes })
      }
      this.total.sort((a, b) => a.numeroDoMes - b.numeroDoMes)
    },
    uniqBy(a) {
      return Array.from(new Set(a))
    },
    pesquisar() {
      this.result = ''
      this.total = []
      this.cultosOrganizadosPorMes()

      if (anualChart != null) {
        anualChart.destroy()
      }

      this.createChart(this.total)
    },
    createChart(data) {
      const grafico = document.querySelector('#grafico')
      anualChart = new Chart(grafico, {
        type: 'line',
        data: {
          labels: data.map((dados) => dados.mes),
          datasets: [
            {
              label: `Total Por Mes`,
              data: data.map((culto) => culto.total),
              borderWidth: 2,
              borderJoinStyle: 'round',
              borderColor: '#6657F6'
            },
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
