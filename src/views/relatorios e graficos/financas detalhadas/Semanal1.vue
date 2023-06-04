<template lang="">
  <el-row justify="space-evenly">
    <el-col :span="20" class="shadow p-3 mb-2">
      <div v-if="result">
        <el-tag style="font-size: 16px;">Semana: {{ result[cultoPointer].semana }}</el-tag>
        <el-descriptions :title="result[cultoPointer].nomeCulto" border style="margin-bottom: 10px">
          <el-descriptions-item label="Pregador(a)">{{
            result[cultoPointer].pregador
          }}</el-descriptions-item>
          <el-descriptions-item label="Pregador(a) do Amor">{{
            result[cultoPointer].pregadorAssistente.pregadorAmor
          }}</el-descriptions-item>
          <el-descriptions-item label="Pregador(a) das Finanças">
            {{ result[cultoPointer].pregadorAssistente.pregadorFinancas }}</el-descriptions-item
          >

          <el-descriptions-item label="Data">
            <el-tag size="small">{{ handleData(result[cultoPointer].data) }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Palavra">{{
            result[cultoPointer].palavra
          }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="Presenças" border style="margin-bottom: 10px">
          <el-descriptions-item label="Adulto Alvo" min-width="100px" align="center">{{
            result[cultoPointer].presencas.adulto.alvo
          }}</el-descriptions-item>
          <el-descriptions-item label="Crianças Alvo" min-width="100px" align="center">{{
            result[cultoPointer].presencas.criancas.alvo
          }}</el-descriptions-item>
          <el-descriptions-item label="Convertidos Alvo" min-width="100px" align="center">
            {{ result[cultoPointer].presencas.convertidos.alvo }}</el-descriptions-item
          >

          <el-descriptions-item label="Adulto Real" min-width="100px" align="center">
            <el-tag size="small" type="success">{{
              result[cultoPointer].presencas.adulto.real
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Crianças Real" min-width="100px" align="center">
            <el-tag size="small" type="success">{{
              result[cultoPointer].presencas.criancas.real
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Convertidos Real" min-width="100px" align="center">
            <el-tag size="small" type="success">{{
              result[cultoPointer].presencas.convertidos.real
            }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="Finanças" border style="margin-bottom: 10px">
          <el-descriptions-item label="Dizimo Cash" min-width="100px" align="center"
            ><el-tag size="small" type="success">{{
              formatter(result[cultoPointer].financas.dizimos.cash)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Ofertas" min-width="100px" align="center">
            <el-tag size="small" type="success">{{
              formatter(result[cultoPointer].financas.ofertas)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Alvo Financeiro" min-width="100px" align="center">
            <el-tag size="small">{{
              formatter(result[cultoPointer].financas.alvoFinancas)
            }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Dizimo Transferencia" min-width="100px" align="center">
            <el-tag size="small" type="success">{{
              formatter(result[cultoPointer].financas.dizimos.transferencia)
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="" min-width="100px" align="center"> </el-descriptions-item>
          <el-descriptions-item label="Total" min-width="100px" align="center">
            <el-tag size="small" type="success">{{
              formatter(result[cultoPointer].financas.total)
            }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-col>

    <el-col :span="3">
      <el-button @click="visible = true" style="width: 70%">Filtar</el-button>
      <div class="buttons">
        <el-icon :size="25"
          ><ArrowLeftBold style="cursor: pointer" @click="previousCulto"
        /></el-icon>
        <el-icon :size="25"><ArrowRightBold style="cursor: pointer" @click="nextCulto" /></el-icon>
      </div>
      <el-drawer v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">Selecionar filtros</h4>
          <el-button type="danger" @click="close"> Close </el-button>
        </template>
        <el-select v-model="ano" class="m-2" placeholder="Ano">
          <el-option
            v-for="item in options.ano"
            :key="item"
            :label="item"
            :value="item"
            @click="fillOptionsMes"
          />
        </el-select>
        <el-select v-model="mes" class="m-2" placeholder="Mes" v-if="ano">
          <el-option
            v-for="item in options.mes"
            :key="item"
            :label="item"
            :value="item"
            @click="filterCultoPorMes"
          />
        </el-select>
        <el-select v-model="semana" class="m-2" placeholder="Semana" v-if="mes">
          <el-option
            v-for="item in options.semana"
            :label="item"
            :value="item"
            :key="item"
            @click="filterCultoPorSemana(item)"
          />
        </el-select>
        <br>
        <el-badge :value="result.length" class="item">
          <el-tag>Resultados</el-tag>
        </el-badge>
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
        mes: [],
        ano: [],
        semana: []
      },
      semana: '',
      mes: '',
      ano: '',
      result: '',
      cultoPointer: 0
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
    fillOptionsMes() {
      this.options.mes = []
      this.dadosDeLancamento.forEach((item) => {
        const { data } = item
        this.options.mes.push(
          dayjs(data).year() === this.ano ? dayjs(data).format('MMMM') : undefined
        )
      })
      this.options.mes = this.uniqBy(this.options.mes)
    },
    fillOptionsSemana() {
      this.options.semana = []
      this.dadosDeLancamento.forEach((item) => {
        const { data, semana } = item
        this.options.semana.push(
          dayjs(data).year() === this.ano && dayjs(data).format('MMMM') === this.mes
            ? semana
            : undefined
        )
      })
      this.options.semana = this.uniqBy(this.options.semana).sort()
    },
    uniqBy(a) {
      a = a.filter((value) => value !== undefined)
      return Array.from(new Set(a))
    },
    filterCultoPorMes() {
      this.fillOptionsSemana()

      const result = this.dadosDeLancamento
        .map((lancamento) => {
          if (
            dayjs(lancamento.data).year() === this.ano &&
            dayjs(lancamento.data).format('MMMM') === this.mes
          ) {
            return lancamento
          }
        })
        .filter((index) => index !== undefined)
      this.result = result
    },
    filterCultoPorSemana(semanaSelect) {
      this.filterCultoPorMes()

      const result = this.result
        .map((lancamento) => {
          const { semana } = lancamento
          if (semana === semanaSelect) {
            return lancamento
          }
        })
        .filter((index) => index !== undefined)
      this.result = result
    },
    handleData(data) {
      return dayjs(data).format('DD/MM/YYYY')
    },
    formatter(value) {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    nextCulto() {
      this.cultoPointer !== this.result.length - 1 || this.cultoPointer === 0
        ? (this.cultoPointer += 1)
        : console.log('Não tem mais culto para frente')
    },
    previousCulto() {
      this.cultoPointer !== 0
        ? (this.cultoPointer -= 1)
        : console.log('Não tem mais culto para trás')
    }
  },
  mounted() {
    this.carregarLancamento()
  }
}
</script>
<style scoped>
.buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}

.item {
  margin-top: 10px;
  margin-left: 9px;
  font-size: 16px;
  }
</style>
