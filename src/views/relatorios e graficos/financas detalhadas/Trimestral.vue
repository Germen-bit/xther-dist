<template lang="">
  <el-row justify="space-evenly">
    <el-col :span="20" class="shadow p-3 mb-2 ">
      <el-table :data="cultoPorTrimestre" stripe style="width: 100%; color: #000">
        <el-table-column prop="nomeCulto" label="Culto | Reunião" width="200" />
        <el-table-column prop="trimestre1" label="1º Trimestre" width="130" align="right"/>
        <el-table-column prop="trimestre2" label="2º Trimestre" width="130" align="right"/>
        <el-table-column prop="trimestre3" label="3º Trimestre" width="130" align="right"/>
        <el-table-column prop="trimestre4" label="4º Trimestre" width="130" align="right"/>
        <el-table-column prop="total" label="Total" width="160" align="right"/>
      </el-table>
      <el-table :data="totalGlobal" class="dark-table" v-if="ano" :row-class-name="noHover">
        <el-table-column prop="label" width="200" />
        <el-table-column prop="totalTri1" width="130" align="right"/>
        <el-table-column prop="totalTri2" width="130" align="right"/>
        <el-table-column prop="totalTri3" width="130" align="right"/>
        <el-table-column prop="totalTri4" width="130" align="right"/>
        <el-table-column prop="total" align="right"/>
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
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/pt'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(quarterOfYear)
dayjs.extend(updateLocale)
dayjs.updateLocale('pt', {
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
})
dayjs.locale('pt')

export default {
  data() {
    return {
      dadosDeLancamento: [],
      visible: false,
      ano: '',
      filtroAno: [],
      cultoPorNome: [],
      cultoPorTrimestre: [],
      totalGlobal: [],
      noHover: 'no-hover'
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
      this.cultoPorTrimestre = []
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
      this.organizarCultoPorTrimestre()
    },
    organizarCultoPorTrimestre() {
      this.cultoPorNome.forEach((item) => {
        let trimestre1 = 0
        let trimestre2 = 0
        let trimestre3 = 0
        let trimestre4 = 0
        let culto = item
          .map((culto) => {
            if (dayjs(culto.data).quarter() === 1) {
              trimestre1 += Number(culto.financas.total.replace(',', ''))
            } else if (dayjs(culto.data).quarter() === 2) {
              trimestre2 += Number(culto.financas.total.replace(',', ''))
            } else if (dayjs(culto.data).quarter() === 3) {
              trimestre3 += Number(culto.financas.total.replace(',', ''))
            } else if (dayjs(culto.data).quarter() === 4) {
              trimestre4 += Number(culto.financas.total.replace(',', ''))
            }

            return culto
          })
          .reduce((acc, valor) => valor, 0)
        
        let total = trimestre1 + trimestre2 + trimestre3 + trimestre4
        this.cultoPorTrimestre.push({
          nomeCulto: culto.nomeCulto,
          trimestre1: this.formatter(trimestre1),
          trimestre2: this.formatter(trimestre2),
          trimestre3: this.formatter(trimestre3),
          trimestre4: this.formatter(trimestre4),
          total: this.formatter(total)
        })
      })

      this.cultoPorTrimestre = this.cultoPorTrimestre.filter(valor => valor.nomeCulto !== undefined)

      this.calcularTotalGlobal()
    },
    formatter(value) {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
      this.cultoPorTrimestre.map(culto => {
        res.totalTri1 += Number((culto.trimestre1).replace(',',''))
        res.totalTri2 += Number((culto.trimestre2).replace(',',''))
        res.totalTri3 += Number((culto.trimestre3).replace(',',''))
        res.totalTri4 += Number((culto.trimestre4).replace(',',''))
        res.total += Number((culto.total).replace(',',''))
      })

      res.totalTri1 = this.formatter(res.totalTri1)
      res.totalTri2 = this.formatter(res.totalTri2)
      res.totalTri3 = this.formatter(res.totalTri3)
      res.totalTri4 = this.formatter(res.totalTri4)
      res.total = this.formatter(res.total)
      
      this.totalGlobal.push(res)
    }
  },
  beforeMount() {
    this.carregarLancamento()
  }
}
</script>
<style>
.dark-table {
  width: 100%;
}

</style>
