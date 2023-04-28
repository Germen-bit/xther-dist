import axios from 'axios'
import router from '../router/index'
import store from '../store'

const checkUsuario = async () => {
  try {
    const response = await axios.get('/usuarios/me')
    router.push({ path: '/'})
    store.commit('setUsuario', response.data)

  } catch (error) {
    router.push({ path: '/login'})
  }
}

export default checkUsuario;