<template lang="">
  <!-- <div>
      <table class="table table-striped">
        <thead>
            <tr>
            <th scope="col">Nome</th>
            <th scope="col">Contacto</th>
            <th scope="col">Igreja Proveniente</th>
            </tr>
        </thead>
        <tbody class="guest-table">
            <tr>
            <th scope="row"><input type="text" class="form-control"></th>
            <td ><input type="number" class="form-control"></td>
            <td><input type="text" class="form-control"></td>
            <td><button @click="removeGuest($event)" type="button" class="d-grid gap-2 col-xs-1 mx-auto btn btn-outline-danger">X</button></td>
            </tr>
        </tbody>
    </table>
    <div class="col-12">
        <button type="button" id="guest-table" @click="moreGuests" class="d-grid gap-2 col-2 mx-auto btn btn-outline-primary">Mais</button>
    </div>

          
        </div>
      </form>
    </div>
  </div> -->

  <div class="container-md d-flex flex-column align-items-center">
    <p class="h3 mt-4 mb-3">Novo Culto ou Reunião</p>
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
                <input v-model="nomeLider" type="text" class="form-control" id="nome-lider" />
              </div>
              <div class="col-md-4">
                <label for="inputAddress" class="form-label">Data</label>
                <input v-model="data" type="date" class="form-control" id="data" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label for="telefone" class="form-label">Co-Lider 1</label>
                <input v-model="coLider1" type="text" class="form-control" id="co-lider1" />
              </div>
              <div class="col-md-6">
                <label for="telefone" class="form-label">Co-Lider 2</label>
                <input v-model="coLider2" type="text" class="form-control" id="co-lider2" />
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
                <label for="inputAddress" class="form-label">Presenças</label>
                <input
                  v-model="presencas"
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

export default {
  data() {
    return {
      nomeLider: '',
      data: '',
      coLider1: '',
      coLider2: '',
      nomeCulto: '',
      presencas: '',
      convertidos: '',
      criancas: '',
      financas: ''
    }
  },
  methods: {
    moreGuests() {
      const table = `<tr>
            <th scope="row"><input type="text" class="form-control"></th>
            <td ><input type="number" class="form-control"></td>
            <td><input type="text" class="form-control"></td>
            <td><button type="button" class="d-grid gap-2 col-xs-1 mx-auto btn btn-outline-danger">X</button></td>
            </tr>`

      const guestTable = document.querySelector('.guest-table')
      guestTable.insertAdjacentHTML('beforeend', table)
    },
    async guardarCulto(event) {
      event.preventDefault()

      try {
        const response = await axios.post('/cultos/', {
          nomeLider: this.nomeLider,
          data: this.data,
          coLider1: this.coLider1,
          coLider2: this.coLider2,
          nomeCulto: this.nomeCulto,
          presencas: this.presencas,
          convertidos: this.convertidos,
          criancas: this.criancas,
          financas: this.financas
        })
        console.log(response.data)
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
}
</script>
<style lang=""></style>
