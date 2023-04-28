import axios from 'axios'

const state = {
  usuario: []
}

const getters = {
  getUsuario: (state) => state.usuario
}

const actions = {}

const mutations = {
  setUsuario: (state, usuario) => {
    state.usuario = usuario
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
