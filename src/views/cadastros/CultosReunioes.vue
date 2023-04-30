<template lang="">
  <div class="container-md d-flex flex-column align-items-center mt-3">
    <div v-if="sucesso" class="alert alert-primary" role="alert">{{ message }}</div>
    <p class="h3 mt-1 mb-3">Novo Culto ou Reunião</p>
    <div class="accordion shadow" style="width: 800px" id="accordionExample">
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
              <label for="" class="form-label">Integrantes do culto</label>
              <div v-for="(input, index) in inputs" :key="index">
                <div class="d-flex align-items-center mt-2">
                  <select v-model="integrantes" id="inputState" class="form-select">
                    <option
                      v-for="pastor in todosPastores"
                      :key="pastor._id"
                      v-bind:value="pastor.name"
                      v-on:click="addPastor(index ,pastor.name)"
                    >
                    {{ pastor.name }}
                    </option>
                  </select>
                    <button class="btn btn-danger ml-2" @click="removeInput(index)">-</button>
                </div>
              </div>

              <div class="mt-3 d-flex align-items-center justify-content-center">
                <button class="btn btn-outline-secondary" @click="addInput" style="width: 100px;">+</button>
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

    <div class="row mt-3 mb-3" style="width: 400px">
      <button @click="guardarCulto($event)" class="btn col-md-5 btn-primary">Salvar</button>
      <span class="col-md-1"></span>
      <button type="submit" class="btn col-md-5 btn-outline-danger">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import resetData from '../../js/resetData'

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
      integrantes: [{ value: '' }],
      todosPastores: '',
    }
  },
  methods: {
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
        this.renderizarResultado('Culto criado')
      } catch (error) {
        console.log(error.response.data)
      }
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
      } catch (error) {
        
      }
    },
    addPastor(index,nome) {
      this.integrantes[index] = nome
    },
    removePastor(index) {
      this.integrantes.splice(index, 1)
    },
  },
  beforeMount() {
    this.carregarPastores()
  }
}
</script>
<style lang=""></style>
