<template lang="">
  <div class="container-md d-flex flex-column align-items-center">
    <p class="h3 mt-4 mb-3">Novos Integrantes Administrativos</p>
    <div class="accordion shadow" style="width: 800px;" id="accordionExample">
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
          Informações pessoais
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="col-md-12">
            <label for="inputAddress" class="form-label">Nome Completo</label>
            <input v-model="name" type="text" class="form-control" id="name" />
          </div>
          <div class="col-md-12">
            <label for="inputEmail4" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="email@exemplo.com"
            />
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="telefone" class="form-label">Telefone 1</label>
              <input v-model="tel1" type="number" class="form-control" id="number-tel1" />
            </div>
            <div class="col-md-6">
              <label for="telefone" class="form-label">Telefone 2</label>
              <input v-model="tel2" type="number" class="form-control" id="number-tel1" />
            </div>
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
          Morada
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="col-md-12">
            <label for="inputAddress" class="form-label">Morada</label>
            <input
              v-model="morada"
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Rua Laurinda Gustavo"
            />
          </div>

          <div class="row">
            <div class="col-md-4">
              <label for="provincia" class="form-label">Pais</label>
              <input v-model="pais" type="text" class="form-control" id="provincia" />
            </div>
            <div class="col-md-4">
              <label for="provincia" class="form-label">Provincia</label>
              <input v-model="provincia" type="text" class="form-control" id="provincia" />
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">Municipio</label>
              <select v-model="municipio" id="inputState" class="form-select">
                <option selected>Escolher</option>
                <option>...</option>
              </select>
            </div>
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
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Função na igreja
        </button>
      </h2>
      <div
        id="collapseThree"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="col-md-12">
            <label for="inputState" class="form-label">Função</label>
            <select v-model="funcao" id="inputState" class="form-select">
              <option selected>Escolher</option>
              <option>Pastor</option>
              <option>Pastor Assistente</option>
              <option>Presbitero</option>
              <option>Assistente</option>
              <option>Diácono</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="row mt-3 mb-3" style="width: 400px;">
      <button @click="createPastor($event)" class=" btn col-md-5 btn-primary">
        Salvar
      </button>
      <span class="col-md-1"></span>
      <button type="submit" class=" btn col-md-5 btn-outline-danger">
        Cancelar
      </button>
    </div>   
  </div>
</template>



<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      tel1: '',
      tel2: '',
      email: '',
      morada: '',
      provincia: '',
      municipio: ''
    }
  },
  methods: {
    async createPastor(event) {
      event.preventDefault()

      try {
        const response = await axios.post('/pastores/', {
          name: this.name,
          tel1: this.tel1,
          tel2: this.tel2,
          email: this.email,
          morada: this.morada,
          provincia: this.provincia,
          municipio: this.municipio
        })
        console.log(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
}
</script>
<style scoped>

</style>
