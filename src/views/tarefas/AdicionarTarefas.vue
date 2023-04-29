<template lang="">
  <div>
    <div v-if="sucesso" class="alert alert-primary" role="alert">{{ message }}</div>

    <div class="accordion shadow" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button">Adicionar nova tarefa</button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div class="input-group mb-3 col-md-8">
              <div class="input-group mb-3">
                <span class="input-group-text">Titulo</span>
                <input
                  type="text"
                  class="form-control col-md-8"
                  placeholder="Escreva uma tarefa"
                  aria-label="titulo"
                  v-model="titulo"
                  style="width: 45%"
                />
                <span class="input-group-text">Data</span>
                <input type="date" class="form-control" v-model="fim" />
              </div>
            </div>
            <button type="" class="btn btn-primary" @click="adicionarTarefas($event)">
              Guardar
            </button>
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
  components: {},
  data() {
    return {
      titulo: '',
      fim: '',
      sucesso: false,
      message: ''
    }
  },
  methods: {
    async adicionarTarefas(event) {
      event.preventDefault()

      try {
        const response = await axios.post('/tarefas/', {
          titulo: this.titulo,
          fim: this.fim
        })
        resetData(this)
        this.renderizarResultado('Tarefa adicionada')
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
