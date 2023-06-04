<template lang="">
  <el-row justify="space-evenly">
    <el-col :span="20" class="shadow p-3 mb-2 ">
      <el-tag v-if="ano" type="success" style="font-size: 16px">{{ ano }}</el-tag>
      <el-table :data="resultadoAnual" stripe style="width: 100%; color: #000">
        <el-table-column prop="culto" label="Culto | Reunião" width="200" />
        <el-table-column prop="janeiro" label="Janeiro" width="130" align="right" />
        <el-table-column prop="fevereiro" label="Fevereiro" width="130" align="right" />
        <el-table-column prop="marco" label="Março" width="130" align="right" />
        <el-table-column prop="abril" label="Abril" width="130" align="right" />
        <el-table-column prop="maio" label="Maio" width="130" align="right" />
        <el-table-column prop="junho" label="Junho" width="130" align="right" />
        <el-table-column prop="julho" label="Julho" width="130" align="right" />
        <el-table-column prop="agosto" label="Agosto" width="130" align="right" />
        <el-table-column prop="setembro" label="Setembro" width="130" align="right" />
        <el-table-column prop="outubro" label="Outubro" width="130" align="right" />
        <el-table-column prop="novembro" label="Novembro" width="130" align="right" />
        <el-table-column prop="dezembro" label="Dezembro" width="130" align="right" />
        <el-table-column prop="total" label="Total" width="130" align="right" />
      </el-table>
    </el-col>
    <el-col :span="3">
      <el-button @click="visible = true">Filtrar</el-button>
      <el-drawer v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">Selecionar filtros</h4>
          <el-button type="danger" @click="close"> Close </el-button>
        </template>
        <el-select v-model="ano" class="m-2" placeholder="Ano">
          <el-option
            v-for="item in filtroAno"
            @click="getNomeCulto"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-drawer>
    </el-col>
  </el-row>
</template>
<script>
import dayjs from 'dayjs'
import axios from 'axios'

export default {
  data() {
    return {
      visible: false,
      dadosDeLancamento: '',
      filtroAno: [],
      resultadoAnual: [],
      cultoPorNome: '',
      ano: ''
    }
  },
  methods: {
    async carregarLancamento() {
      try {
        this.dadosDeLancamento = []
        const response = await axios.get('/lancamentos/')
        this.dadosDeLancamento = response.data

        this.handleFiltro(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    },
    handleFiltro(data) {
      data.forEach((item) => {
        const { data } = item
        this.filtroAno.push(dayjs(data).year())
      })

      this.filtroAno = Array.from(new Set(this.filtroAno))
    },
    getMonth(data) {
      return dayjs(data).month()
    },
    transformToNumber(number) {
      return Number(number.replace(',', ''))
    },
    getNomeCulto() {
      this.dadosDeLancamento
        .map((culto) => culto.nomeCulto)
        .filter((valor, index, array) => {
          return array.indexOf(valor) === index
        })

      this.resultadoAnual = []
      this.getCultoNome()
      this.calcularResumoAnual()
    },
    getCultoNome() {
      const nomeDosCultos = new Set()
      this.dadosDeLancamento.map((culto) => {
        const { nomeCulto } = culto
        if (dayjs(culto.data).year() === this.ano) {
          nomeDosCultos.add(nomeCulto)
        }
      })
      this.cultoPorNome = nomeDosCultos
    },
    calcularResumoAnual() {
      this.cultoPorNome.forEach((element) => {
        const Modelo = {
          culto: '',
          janeiro: 0,
          fevereiro: 0,
          marco: 0,
          abril: 0,
          maio: 0,
          junho: 0,
          julho: 0,
          agosto: 0,
          setembro: 0,
          outubro: 0,
          novembro: 0,
          dezembro: 0,
          total: 0
        }

        const meses = {
          0: 'janeiro',
          1: 'fevereiro',
          2: 'marco',
          3: 'abril',
          4: 'maio',
          5: 'junho',
          6: 'julho',
          7: 'agosto',
          8: 'setembro',
          9: 'outubro',
          10: 'novembro',
          11: 'dezembro'
        }
        this.dadosDeLancamento.map((culto) => {
          Modelo.culto = element
          const mesAtual = this.getMonth(culto.data)

          if (
            element === culto.nomeCulto &&
            meses.hasOwnProperty(mesAtual) &&
            dayjs(culto.data).year() === this.ano
          ) {
            const mes = meses[mesAtual]
            Modelo[mes] += this.transformToNumber(culto.financas.total)
          }
        })
        const {
          janeiro,
          fevereiro,
          marco,
          abril,
          maio,
          junho,
          julho,
          agosto,
          setembro,
          outubro,
          novembro,
          dezembro
        } = Modelo
        Modelo.total =
          janeiro +
          fevereiro +
          marco +
          abril +
          maio +
          junho +
          julho +
          agosto +
          setembro +
          outubro +
          novembro +
          dezembro
        this.resultadoAnual.push(Modelo)
      })
    }
  },
  beforeMount() {
    this.carregarLancamento()
  }
}
</script>
<style lang=""></style>
