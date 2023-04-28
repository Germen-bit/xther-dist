import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import NovosIntegrantes from '../views/cadastros/NovosIntegrantes.vue'
import CultoReunioesView from '../views/cadastros/CultosReunioes.vue'
import LancamentoView from '../views/Lancamento.vue'
import RelatoriosView from '../views/Relatorios.vue'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"home",
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/novos-integrantes',
      name: 'novos-integrantes',
      component: NovosIntegrantes
    },
    {
      path: '/cultos-reunioes', 
      name: 'cultos-reunioes',
      component: CultoReunioesView
    },
    {
      path: '/lancamento', 
      name: 'lancamento',
      component: LancamentoView
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: RelatoriosView
    }
  ]
})

export default router
