<template lang="">
  <div class="container-md d-flex flex-column align-items-center mt-4 mb-3">
    <el-row :gutter="10" style="padding: 0; width: 100%">
      <el-col :span="16">
        <div v-if="sucesso" class="alert alert-primary" role="alert">{{ message }}</div>
        <p class="h3">Novo Culto ou Reunião</p>
        <div class="accordion shadow" style="width: inherit" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Informações sobre a liderança
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="row">
                  <div class="col-md-8">
                    <label for="inputAddress" class="form-label">Lider da reunião</label>
                    <select v-model="nomeLider" id="inputState" class="form-select">
                      <option
                        v-for="pastor in todosPastores"
                        :key="pastor._id"
                        v-bind:value="pastor.name"
                      >
                        {{ pastor.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label for="inputAddress" class="form-label">Data</label>
                    <input v-model="data" type="date" class="form-control" id="data" />
                  </div>
                </div>

                <div class="row">
                  <div  v-for="(input, index) in inputs" :key="index">
                    <div class="d-flex align-items-center mt-2 pastor-select">
                      <label for="" class="form-label" style="white-space: nowrap;">Integrante {{index + 1}}</label>
                      <el-select v-model="integrantes[index]" class="m-2" placeholder="Selecionar" style="width: 100%;">
                        <el-option
                          v-for="pastor in todosPastores"
                          :key="pastor._id"
                          :label="pastor.name"
                          :value="pastor.name"
                        />
                      </el-select>
                      <button class="btn btn-danger ml-2" @click="removeInput(index)">-</button>
                    </div>
                  </div>

                  <div class="mt-3 d-flex align-items-center justify-content-center">
                    <button
                      class="btn btn-outline-secondary"
                      @click="addInput"
                      style="width: 100px"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div class="col-md-12">
                  <label for="inputEmail4" class="form-label">Nome do culto ou reunião</label>
                  <input
                    v-model="nomeCulto"
                    type="text"
                    class="form-control"
                    id="nome-reuniao"
                    placeholder="Reunião das senhoras"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Alvos do culto ou reunião
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="row">
                  <div class="col-md-6">
                    <label for="inputAddress" class="form-label">Adultos</label>
                    <input
                      v-model="adultos"
                      type="number"
                      min="1"
                      class="form-control"
                      id="presencas"
                      placeholder="0"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="provincia" class="form-label">Convertidos</label>
                    <input
                      v-model="convertidos"
                      type="number"
                      min="1"
                      class="form-control"
                      id="convertidos"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label for="inputAddress" class="form-label">Crianças</label>
                    <input
                      v-model="criancas"
                      type="number"
                      min="1"
                      class="form-control"
                      id="criancas"
                      placeholder="0"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="provincia" class="form-label">Finanças (Akz)</label>
                    <input
                      v-model="financas"
                      type="number"
                      min="1"
                      class="form-control"
                      id="financas"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <p class="h3">Cultos</p>
        <el-table class="shadow rounded" :data="dadosDaTabelaCulto" style="width: 100%">
          <el-table-column prop="culto" label="Culto" />
          <el-table-column label="Editar" width="100" prop="_id">
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.row._id)"
                >Editar</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="row mt-3 mb-3 d-flex justify-content-between" style="width: 400px">
      <el-icon size="48" color="blue" style="cursor:pointer;" @click="reload()"><Refresh /></el-icon>
      <button @click="guardarCulto($event)" class="btn col-md-5 btn-primary">Salvar</button>
      <button @click="guardarEdit($event)" class="btn col-md-5 btn-outline-secondary">Alterar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import resetData from '../../js/resetData'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export default {
  data() {
    return {
      nomeLider: '',
      data: '',
      nomeCulto: '',
      adultos: '',
      convertidos: '',
      criancas: '',
      financas: '',
      sucesso: false,
      message: '',
      inputs: [{ value: '' }],
      integrantes: [],
      todosPastores: '',
      dadosDaTabelaCulto: [],
      cultos: '',
      culto_id: ''
    }
  },
  methods: {
    reload() { 
      resetData(this)
      this.carregarPastores()
      this.carregarDadosDaTabela()
     },
    async guardarCulto(event) {
      event.preventDefault()

      try {
        const response = await axios.post('/cultos/', {
          nomeLider: this.nomeLider,
          data: this.data,
          integrantes: this.integrantes,
          nomeCulto: this.nomeCulto,
          adultos: this.adultos,
          convertidos: this.convertidos,
          criancas: this.criancas,
          financas: this.financas
        })
        resetData(this)
        this.carregarPastores()
        this.renderizarResultado('Culto criado')
      } catch (error) {}
    },
    renderizarResultado(message) {
      this.message = message
      this.sucesso = true
      setTimeout(() => {
        this.sucesso = false
      }, 3500)
    },
    addInput() {
      this.inputs.push({ value: '' })
    },
    removeInput(index) {
      this.inputs.splice(index, 1)
      this.removePastor(index)
    },
    async carregarPastores() {
      try {
        const response = await axios.get('/pastores/')
        this.todosPastores = response.data
      } catch (error) {}
    },
    removePastor(index) {
      this.integrantes.splice(index, 1)
    },
    async carregarDadosDaTabela(dados) {
      try {
        const response = await axios.get('/cultos/')
        this.cultos = response.data

        response.data.map((culto) => {
          const { _id, nomeCulto } = culto
          this.dadosDaTabelaCulto.push({ _id, culto: nomeCulto })
        })
      } catch (err) {}
    },
    async handleEdit(id) {
      const culto = this.cultos.filter((culto) => culto._id === id)
      this.inputs = []

      this.culto_id = culto[0]._id
      await culto[0].integrantes.map(() => {
        this.inputs.push({ value: '' })
      })
      this.nomeLider = culto[0].nomeLider
      this.data = dayjs(culto[0].data).format("YYYY-MM-DD")
      this.nomeCulto = culto[0].nomeCulto
      this.adultos = culto[0].alvos.adultos
      this.convertidos = culto[0].alvos.convertidos
      this.criancas = culto[0].alvos.criancas
      this.financas = culto[0].alvos.financas
      this.integrantes = culto[0].integrantes
    },
    async guardarEdit(event) {
      event.preventDefault()

      try {
        const response = await axios.put(`/cultos/${this.culto_id}`, {
          nomeLider: this.nomeLider,
          data: this.data,
          integrantes: this.integrantes,
          nomeCulto: this.nomeCulto,
          adultos: this.adultos,
          convertidos: this.convertidos,
          criancas: this.criancas,
          financas: this.financas
        })
        resetData(this)
        this.carregarPastores()
        this.carregarDadosDaTabela()
        this.renderizarResultado('Culto editado com sucesso')
      } catch (error) {}
    }
  },
  beforeMount() {
    this.carregarPastores()
    this.carregarDadosDaTabela()
  }
}
</script>
<style scoped></style>
