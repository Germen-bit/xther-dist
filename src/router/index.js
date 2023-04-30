import { createRouter, createWebHistory } from 'vue-router'
// Basics
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/Home.vue'
 // cadastros
import NovosIntegrantes from '../views/cadastros/NovosIntegrantes.vue'
import CultoReunioesView from '../views/cadastros/CultosReunioes.vue'
import NovosUsuarios from '../views/cadastros/NovosUsuarios.vue'
// lançamentos
import LancamentoView from '../views/Lancamento.vue'
// relatorios e graficos
import RelatorioFinancas from '../views/relatorios e graficos/relatorioFinancas.vue'


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
      path: '/novo-integrante',
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
      path: '/novo-usuario',
      name: 'novo usuario',
      component: NovosUsuarios
    },
    {
      path: '/financas',
      name: 'relatorios de financas',
      component: RelatorioFinancas
    }
  ]
})

export default router
