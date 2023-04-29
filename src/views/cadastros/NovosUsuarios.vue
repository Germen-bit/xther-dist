<template lang="">
  <div>
    <p class="h3 mt-4 mb-3 text-center">Novo Usuário</p>
    <div v-if="sucesso" class="alert alert-primary" role="alert">{{ message }}</div>

    <div class="accordion shadow" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">Novo Usuário</button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="nome" placeholder="Nome" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Sobrenome</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="sobrenome"
                  placeholder="Sobrenome"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-8">
                <label class="form-label">Email</label>
                <input
                  class="form-control"
                  type="email"
                  v-model="email"
                  placeholder="exemplo@gmail.com"
                />
              </div>
              <div class="col-md-4">
                <label class="form-label">Telefone</label>
                <input
                  class="form-control"
                  type="tel"
                  v-model="telefone"
                  placeholder="000 000 000"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Password</label>
                <input
                  class="form-control"
                  type="password"
                  v-model="password"
                  placeholder="**********"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Confirmar Password</label>
                <input
                  class="form-control"
                  type="password"
                  v-model="confirmarPassword"
                  placeholder="**********"
                />
              </div>
            </div>

            <button type="" class="btn btn-primary" @click="criarUsuario">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import resetData from '../../js/resetData'

export default {
  data() {
    return {
      nome: '',
      sobrenome: '',
      email: '',
      telefone: '',
      password: '',
      confirmarPassword: '',
      message: '',
      sucesso: false
    }
  },
  methods: {
    async criarUsuario() {
      try {
        const response = await axios.post('/usuarios/', {
          nome: this.nome,
          sobrenome: this.sobrenome,
          telefone: this.telefone,
          email: this.email,
          password: this.password,
          confirmarPassword: this.confirmarPassword
        })
        resetData(this)
        this.renderizarResultado('Usuario criado')
      } catch (error) {
        console.log(error.response.data)
      }
    },
    renderizarResultado(message) {
      this.message = message
      this.sucesso = true
      setTimeout(() => {this.sucesso = false}, 3500)
    }
  }
}
</script>
<style lang=""></style>
