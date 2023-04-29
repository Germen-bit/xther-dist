<template lang="">
  <div>
    <p class="h4">Tarefas</p>
    <div class="form-text mb-2" id="basic-addon4">
      Clique duas vezes em uma tarefa para modificar-la.
    </div>
    <ul class="list-group list-group-flush" v-for="tarefa in tarefas" :key="tarefa.id">
      <li class="list-group-item" style="cursor: pointer;" v-on:dblclick="editarTarefa($event)">
        {{ tarefa.titulo }}
        <div class="d-flex justify-content-between">
          <span class="" style="font-size: 14px"
            >faltam
            <span class="badge text-bg-info">{{ calcularDiasRestantes(tarefa.fim) }}</span>
            dias</span
          >
          <span class="">{{ converterData(tarefa.fim) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import converterData from '../../js/converterData'

export default {
  data() {
    return {
      tarefas: ''
    }
  },
  methods: {
    converterData: converterData,
    async editarTarefa(event) {
        console.log(event)
        // EventBus.$emit('tarefa-enviada', )
    },
    async buscarTarefas() {
      try {
        const response = await axios.get('/tarefas/')
        response.data.forEach(tarefa => {
            if (this.calcularDiasRestantes(tarefa.fim) <= 0) {
                axios.delete(`/tarefas/${tarefa._id}`)
            }
        });
        this.tarefas = response.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    calcularDiasRestantes(data) {
      let dataObj = new Date(data)
      let dataAtual = new Date()
      dataAtual.setHours(0, 0, 0, 0)
      let diferenca = dataObj.getTime() - dataAtual.getTime()
      return Math.ceil(diferenca / (1000 * 60 * 60 * 24)) - 1
    }
  },
  beforeMount() {
    this.buscarTarefas()
  }
}
</script>
<style lang=""></style>
