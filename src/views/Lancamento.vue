<template>
  <div class="container-md mt-4 d-flex flex-column align-items-center">
    <div v-if="sucesso" class="alert alert-primary" role="alert">{{ message }}</div>

    <p class="h3 mb-3">Lançamento Da Atividade</p>
    <form action="">
      <div class="accordion shadow" style="width: 800px" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              Informações Gerais
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="row">
                <div class="col-md-8">
                  <label for="inputEmail4" class="form-label">Nome do Culto ou Reunião</label>
                  <br>
                  <el-select v-model="nomeCulto" placeholder="" class="m-2" style="width: 100%;" size="large">
                    <el-option v-for="culto in todosOsCultos" @click="carregarDados(culto)" :key="culto._id" :label="culto.nomeCulto"
                      :value="culto.nomeCulto" />
                  </el-select>
                </div>
                <div class="col-md-4">
                  <label for="inputPassword4" class="form-label">Pregador da Homilia</label>
                  <input v-model="pregador" type="text" disabled class="form-control" id="inputPassword4" />
                </div>
              </div>
              <div class="col-12">
                <label for="inputAddress2" class="form-label">Palavra</label>
                <input v-model="palavra" type="text" class="form-control" id="inputAddress2" placeholder="" />
              </div>
              <div class="row">
                <div class="col-md-4">
                  <label for="inputPassword4" class="form-label">Semana Nº</label>
                  <input v-model="semana" type="number" class="form-control" id="inputPassword4" disabled />
                </div>
                <div class="col-md-4">
                  <label for="inputAddress" class="form-label">Data do culto</label>
                  <input v-model="data" type="date" v-on:change="calcularSemana" class="form-control" id="inputAddress"
                    placeholder="" />
                </div>
              </div>
              <div class="input-group mt-3">
                <span class="input-group-text">Observação</span>
                <textarea v-model="observacao" class="form-control" aria-label="With textarea"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
              Pastores Assistentes
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="row">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Pregador da palavra de amor</label>
                  <select v-model="pregadorAmor" id="inputState" class="form-select">
                    <option v-for="pastor in todosPastores" :key="pastor" v-bind:value="pastor">
                      {{ pastor }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">Pregador da palavra de finanças</label>
                  <select v-model="pregadorFinancas" id="inputState" class="form-select">
                    <option v-for="pastor in todosPastores" :key="pastor" v-bind:value="pastor">
                      {{ pastor }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
              aria-expanded="false" aria-controls="collapseOne">
              Presenças
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="row">
                <div class="col-md-4 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Adultos</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Alvo</span>
                    <input v-model="adultoAlvo" disabled type="text" class="form-control" placeholder="alvo"
                      aria-label="Username" aria-describedby="basic-addon1" />
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text mr-1" id="basic-addon1">Real</span>
                    <input v-model="adultoReal" type="text" class="form-control" placeholder="real" aria-label="Username"
                      aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div class="col-md-4 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Crianças</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Alvo</span>
                    <input v-model="criancasAlvo" disabled type="text" class="form-control" placeholder="alvo"
                      aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text mr-1" id="basic-addon1">Real</span>
                    <input v-model="criancasReal" type="text" class="form-control" placeholder="real"
                      aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div class="col-md-4 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Novos convertidos</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Alvo</span>
                    <input v-model="convertidosAlvo" disabled type="text" class="form-control" placeholder="alvo"
                      aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text mr-1" id="basic-addon1">Real</span>
                    <input v-model="convertidosReal" type="text" class="form-control" placeholder="real"
                      aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Finanças
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="row">
                <div class="col-md-3 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Alvo das finanças</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Alvo</span>
                    <input disabled v-model="financasAlvo" v-on:change="converterMoeda(financasAlvo)" type="text"
                      class="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div class="col-md-3 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Dízimos</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Cash</span>
                    <input v-model="financasDizimosCash" v-on:input="calcularTotal()" type="text" class="form-control"
                      placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div class="col-md-3 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Ofertas</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Ofertas</span>
                    <input v-model="financasOfertas" v-on:input="calcularTotal()" type="text" class="form-control"
                      placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div class="col-md-3 p-2 rounded-1">
                  <label for="inputCity" class="form-label p-1">Total Real</label>
                  <div class="input-group mb-3">
                    <input disabled v-model="financasTotal" type="text" class="form-control" placeholder="0"
                      aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6" style="margin: 0">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">Transferência</span>
                    <input v-model="financasDizimosTransferencia" v-on:input="calcularTotal()" type="text"
                      class="form-control" placeholder="0" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="row mt-3 mb-3" style="width: 400px">
      <button @click="realizarLancamento($event)" class="btn col-md-5 btn-primary">Salvar</button>
      <span class="col-md-1"></span>
      <button type="reset" class="btn col-md-5 btn-outline-danger">Cancelar</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import converterData from '../js/converterData'
import resetData from '../js/resetData'

export default {
  data() {
    return {
      idCulto: '',
      todosOsCultos: '',
      nomeCulto: '',
      pregador: '',
      semana: '',
      data: '',
      palavra: '',
      adultoAlvo: '',
      adultoReal: '',
      criancasAlvo: '',
      criancasReal: '',
      convertidosAlvo: '',
      convertidosReal: '',
      financasAlvo: '',
      financasDizimosCash: '',
      financasDizimosTransferencia: '',
      financasOfertas: '',
      financasTotal: '',
      pregadorAmor: '',
      pregadorFinancas: '',
      observacao: '',
      sucesso: false,
      message: '',
      todosPastores: ''
    }
  },
  methods: {
    click() { console.log("click") },
    converterData: converterData,
    async realizarLancamento(event) {
      event.preventDefault()

      try {
        const response = await axios.post('/lancamentos/', {
          culto: this.idCulto,
          nomeCulto: this.nomeCulto,
          pregador: this.pregador,
          semana: this.semana,
          data: this.data,
          palavra: this.palavra,
          adultoAlvo: this.adultoAlvo,
          adultoReal: this.adultoReal,
          criancasAlvo: this.criancasAlvo,
          criancasReal: this.criancasReal,
          convertidosAlvo: this.convertidosAlvo,
          convertidosReal: this.convertidosReal,
          financasAlvo: this.financasAlvo,
          financasDizimosAlvo: this.financasDizimosAlvo,
          financasDizimosReal: this.financasDizimosReal,
          financasOfertas: this.financasOfertas,
          financasTotal: this.financasTotal,
          pregadorAmor: this.pregadorAmor,
          pregadorFinancas: this.pregadorFinancas,
          observacao: this.observacao,
          financasDizimosCash: this.financasDizimosCash,
          financasDizimosTransferencia: this.financasDizimosTransferencia
        })
        resetData(this)
        this.renderizarResultado('Actividade lançada com sucesso')
        this.buscarCultos()
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async buscarCultos() {
      try {
        const response = await axios.get('/cultos/')
        this.todosOsCultos = response.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    carregarDados(dados) {
      this.pregador = dados.nomeLider
      this.adultoAlvo = dados.alvos.adultos
      this.convertidosAlvo = dados.alvos.convertidos
      this.criancasAlvo = dados.alvos.criancas
      this.financasAlvo = dados.alvos.financas
      this.todosPastores = dados.integrantes
      this.idCulto = dados._id
    },
    calcularSemana() {
      const dataDoCulto = moment(this.data)
      this.semana = dataDoCulto.week()
    },
    calcularTotal() {
      this.financasTotal =
        Number((this.financasDizimosCash).replace(',', '')) +
        Number((this.financasDizimosTransferencia).replace(',', '')) +
        Number((this.financasOfertas).replace(',', ''))
    },
    renderizarResultado(message) {
      this.message = message
      this.sucesso = true
      setTimeout(() => {
        this.sucesso = false
      }, 3500)
    },
    formatter(value) {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  beforeMount() {
    this.buscarCultos()
  },
  watch: {
    financasDizimosTransferencia(newValue, oldValue) {
      newValue = newValue.toString().replace(",", "")
      newValue = this.formatter(newValue)
      this.financasDizimosTransferencia = newValue
    },
    financasDizimosCash(newValue, oldValue) {
      newValue = newValue.toString().replace(",", "")
      newValue = this.formatter(newValue)
      this.financasDizimosCash = newValue
    },
    financasOfertas(newValue, oldValue) {
      newValue = newValue.toString().replace(",", "")
      newValue = this.formatter(newValue)
      this.financasOfertas = newValue
    },
    financasTotal(newValue, oldValue) {
      newValue = newValue.toString().replace(",", "")
      newValue = this.formatter(newValue)
      this.financasTotal = newValue
    },
    financasAlvo(newValue, oldValue) {
      newValue = newValue.toString().replace(",", "")
      newValue = this.formatter(newValue)
      this.financasAlvo = newValue
    },
  }
}
</script>
<style lang=""></style>
