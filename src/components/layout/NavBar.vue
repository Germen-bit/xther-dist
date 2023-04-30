<template lang="">
  <nav
    class="navbar navbar-expand-sm bg-white fixed-top mb-5 shadow"
    style="background-color: #e3f2fd"
  >
    <div class="container">
      <router-link to="/">
        <a class="navbar-brand" href="#">
          <img src="../../assets/xther-logo-512.png" alt="Xther" width="36" height="32" />
        </a>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <router-link style="text-decoration: none" to="/">
            <li class="nav-item">
              <a class="nav-link text-dark">Home</a>
            </li>
          </router-link>
          <li class="nav-item">
            <div>
              <a
                class="btn btn-white dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Adicionar
              </a>

              <ul class="dropdown-menu">
                <router-link style="text-decoration: none" to="/novo-integrante">
                  <li><a class="dropdown-item">Integrante Administrativo</a></li>
                </router-link>
                <router-link style="text-decoration: none" to="/cultos-reunioes">
                  <li><a class="dropdown-item">Culto ou Reunião</a></li>
                </router-link>
                <router-link style="text-decoration: none" to="/novo-usuario">
                  <li><a class="dropdown-item">Usuario</a></li>
                </router-link>
              </ul>
            </div>
          </li>
          <router-link style="text-decoration: none" to="/lancamento">
            <li class="nav-item">
              <a class="nav-link text-dark">Lançamento</a>
            </li>
          </router-link>
          <li class="nav-item">
            <div>
              <a
                class="btn btn-white dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Relatórios
              </a>

              <ul class="dropdown-menu">
                <router-link style="text-decoration: none" to="/financas">
                  <li><a class="dropdown-item">Finanças</a></li>
                </router-link>
                <router-link style="text-decoration: none" to="">
                  <li><a class="dropdown-item">Presenças</a></li>
                </router-link>
                <router-link style="text-decoration: none" to="">
                  <li><a class="dropdown-item">Salvações</a></li>
                </router-link>
                <router-link style="text-decoration: none" to="">
                  <li><a class="dropdown-item">Crianças</a></li>
                </router-link>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="dropdown" style="margin-right: 30px">
        <a
          href="#"
          class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <strong class="text-dark" style="margin-right: 10px">{{ getUsuario.nome }}</strong>
          <img src="" alt="" width="32" height="32" class="rounded-circle me-2" />
          <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a class="dropdown-item" href="#">Definição</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#" @click="logout">Sair</a></li>
          </ul>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import checkUsuario from '../../js/checkUsuario'
const router = useRouter()

export default {
  computed: mapGetters(['getUsuario']),
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ path: '/login' })
      location.reload()
    }
  }
}
</script>

<style scoped>
.main-content {
  height: 100vh;
  position: absolute;
}
#nav-link {
  text-decoration: none;
  color: #fff;
}
</style>
