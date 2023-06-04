<template lang="">
  <el-row justify="space-evenly">
    <el-col :span="20" class="shadow p-3 mb-2">
      <el-tag v-if="culto" style="font-size: 16px; margin-bottom: 10px;">{{ culto }}</el-tag>
      <el-tag v-if="ano" type="success" style="font-size: 16px; margin-bottom: 10px;margin-right: 10px;">{{ ano }}</el-tag>
      <el-table :data="result" stripe style="width: 100%">
        <el-table-column prop="mes" label="Mês" width="250" />
        <el-table-column label="Média de Presenças" width="180">
          <el-table-column prop="alvo" label="Alvo" />
          <el-table-column prop="media" label="Media" />
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :span="3">
      <el-button @click="visible = true"> Filtar </el-button>
      <el-drawer v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">Selecionar filtros</h4>
          <el-button type="danger" @click="close"> Fechar </el-button>
        </template>

        <el-select v-model="ano" class="m-2" placeholder="Ano">
          <el-option v-for="item in options.ano" :key="item" :label="item" :value="item" @click="criarArrayDeMesECulto"/>
        </el-select>
        <el-select v-model="culto" class="m-2" placeholder="Culto" v-if="ano">
          <el-option
            v-for="item in options.culto"
            :key="item"
            :label="item"
            :value="item"
            @click="filtrarCultoPorNome(item)"
          />
        </el-select>
      </el-drawer>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      dadosDeLancamento: [],
      visible: false,
      options: {
        culto: [],
        ano: []
      },
      culto: '',
      ano: '',
      result: '',
      mesECulto: '',
      cultoPorMes: []
    }
  },
  methods: {
    async carregarLancamento() {
      try {
        this.dadosDeLancamento = []
        const response = await axios.get('/lancamentos/')
        this.fillOptionsAno(response.data)
        this.dadosDeLancamento = response.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    criarArrayDeMesECulto() {
      this.fillOptionsMes()

      this.mesECulto = this.dadosDeLancamento
        .filter(valor => dayjs(valor.data).year() === this.ano)
        .map((culto) => {
          return { mes: dayjs(culto.data).format('MMMM'), culto: culto.nomeCulto }
        })
        .filter((value, index, array) => {
          return (
            array.findIndex((item) => item.mes === value.mes && item.culto === value.culto) ===
            index
          )
        })

      this.filtrarPorNomeCulto()
    },
    filtrarPorNomeCulto() {
      this.mesECulto = this.mesECulto.map((filtro) => {
        return this.dadosDeLancamento
          .filter(
            (result) =>
              dayjs(result.data).format('MMMM') === filtro.mes && result.nomeCulto === filtro.culto
          )
      })

      this.cultosFiltradoPorMesECulto()
    },
    cultosFiltradoPorMesECulto() {
      this.cultoPorMes = []

      this.mesECulto.forEach((result) => {
        let culto = result.map((culto) => culto).reduce((acc, value) => value, 0)
        let media = (
          result.reduce((acc, value) => {
            return acc + value.presencas.adulto.real
          }, 0) / result.length
        ).toFixed(2)

        this.cultoPorMes.push({
          nomeCulto: culto.nomeCulto,
          mes: dayjs(culto.data).format('MMMM'),
          ano: dayjs(culto.data).year(),
          mesEmNumero: dayjs(culto.data).month(),
          media: Number(media),
          alvo: culto.presencas.adulto.alvo
        })
      })
    },
    filtrarCultoPorNome(culto) {
      this.result = this.cultoPorMes
        .filter((item) => item.nomeCulto === culto && item.ano === this.ano)
        .sort((a, b) => a.mesEmNumero - b.mesEmNumero)
    },
    fillOptionsAno(dados) {
      dados.forEach((item) => {
        const { data } = item
        this.options.ano.push(dayjs(data).year())
      })

      this.options.ano = this.uniqBy(this.options.ano)
      this.fillOptionsMes() 
    },
    fillOptionsMes() {
      this.options.culto = []
      this.dadosDeLancamento
        .filter(valor => dayjs(valor.data).year() === this.ano)
        .map(valor => {
          const { nomeCulto } = valor
          this.options.culto.push(nomeCulto)
        })
        this.options.culto = this.uniqBy(this.options.culto)
    },
    uniqBy(a) {
      return Array.from(new Set(a))
    }
  },
  mounted() {
    this.carregarLancamento()
  }
}
</script>
<style lang=""></style>
