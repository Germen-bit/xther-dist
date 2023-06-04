<template lang="">
  <el-row justify="space-evenly">
    <el-col :span="20" class="shadow p-3 mb-2">
      <el-table :data="presencasPorTrimestre" stripe style="width: 100%; color: #000">
        <el-table-column prop="nomeCulto" label="Culto | Reunião" width="200" />
        <el-table-column prop="trimestre1" label="1º Trimestre" width="110" align="right" />
        <el-table-column prop="trimestre2" label="2º Trimestre" width="110" align="right" />
        <el-table-column prop="trimestre3" label="3º Trimestre" width="110" align="right" />
        <el-table-column prop="trimestre4" label="4º Trimestre" width="110" align="right" />
        <el-table-column prop="total" label="Total" width="100" align="right" />
      </el-table>
      <el-table :data="totalGlobal" class="dark-table" v-if="ano" :row-class-name="noHover">
        <el-table-column prop="label" width="200" />
        <el-table-column prop="totalTri1" width="110" align="right" />
        <el-table-column prop="totalTri2" width="110" align="right" />
        <el-table-column prop="totalTri3" width="110" align="right" />
        <el-table-column prop="totalTri4" width="110" align="right" />
        <el-table-column prop="total" align="right" width="100"/>
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
            @click="organizarPorNome"
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
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    data() {
    return {
      dadosDeLancamento: [],
      visible: false,
      ano: '',
      filtroAno: [],
      cultoPorNome: [],
      presencasPorTrimestre: [],
      totalGlobal: []
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
    organizarPorNome() {
      this.presencasPorTrimestre = []
      this.totalGlobal = []

      this.cultoPorNome = this.dadosDeLancamento
        .map((culto) => culto.nomeCulto)
        .filter((valor, index, array) => {
          return array.indexOf(valor) === index
        })
      this.organizarCultoPorNome()
    },
    organizarCultoPorNome() {
      this.cultoPorNome = this.cultoPorNome.map((culto) => {
        return this.dadosDeLancamento.filter((valor) => valor.nomeCulto === culto && dayjs(valor.data).year() === this.ano)
      })
      this.organizarpresencasPorTrimestre()
    },
    organizarpresencasPorTrimestre() {
      this.cultoPorNome.forEach((item) => {
        let trimestre1 = 0
        let trimestre2 = 0
        let trimestre3 = 0
        let trimestre4 = 0
        let culto = item
          .map((culto) => {
            if (dayjs(culto.data).quarter() === 1) {
              trimestre1 += culto.presencas.adulto.real
            } else if (dayjs(culto.data).quarter() === 2) {
              trimestre2 += culto.presencas.adulto.real
            } else if (dayjs(culto.data).quarter() === 3) {
              trimestre3 += culto.presencas.adulto.real
            } else if (dayjs(culto.data).quarter() === 4) {
              trimestre4 += culto.presencas.adulto.real
            }

            return culto
          })
          .reduce((acc, valor) => valor, 0)
        
        let total = trimestre1 + trimestre2 + trimestre3 + trimestre4
        this.presencasPorTrimestre.push({
          nomeCulto: culto.nomeCulto,
          trimestre1: trimestre1,
          trimestre2: trimestre2,
          trimestre3: trimestre3,
          trimestre4: trimestre4,
          total: total,
        })
      })

      this.presencasPorTrimestre = this.presencasPorTrimestre.filter(valor => valor.nomeCulto !== undefined)

      this.calcularTotalGlobal()
    },
    calcularTotalGlobal() {
      const res = {
        label: "Total Global",
        totalTri1: 0,
        totalTri2: 0,
        totalTri3: 0,
        totalTri4: 0,
        total: 0
      }
      this.presencasPorTrimestre.map(culto => {
        res.totalTri1 += culto.trimestre1
        res.totalTri2 += culto.trimestre2
        res.totalTri3 += culto.trimestre3
        res.totalTri4 += culto.trimestre4
        res.total += culto.total
      })

      res.totalTri1 = res.totalTri1
      res.totalTri2 = res.totalTri2
      res.totalTri3 = res.totalTri3
      res.totalTri4 = res.totalTri4
      res.total = res.total
      
      this.totalGlobal.push(res)
    }
  },
  beforeMount() {
    this.carregarLancamento()
  }
}
</script>
<style lang=""></style>
