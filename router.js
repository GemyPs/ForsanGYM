import { parseHTML } from 'jquery';
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// this is just a function to help me not writing the full path of each page
const page = (path) => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  {path: '/', name: 'home', component: page('index.vue')},
  {path: '/login', name: 'login', component: page('login.vue')},
  {path: '/players', name: 'allPlayers', component: page('players/index.vue')},
  {path: '/players/:id', name: 'singlePlayer', component: page('players/view.vue')},
  {path: '/plans', name: 'allPlans', component: page('plans/index.vue')},
  {path: '/plans/new', name: 'newPlan', component: page('plans/new.vue')},
  {path: '/activities', name : 'allActs', component: page ('activities/index.vue')},
  {path: '/activities/new', name: 'newAct', component: page('activities/new.vue')},
  {path: '/activityPlayer/:id', name: 'viewActivityPlayer', component: page('activities/viewActivityPlayer')},
  {path: '/auth/login', name: 'auth.login', component: page('auth/login')},
  {path: '/superAdmin/', name: 'superAdmin', component: page('superAdmin/index.vue')},
  {path: '/superAdmin/viewAll', name: 'viewAdmins', component: page('superAdmin/viewAdmins.vue')},
  {path: '/signedinPlayers', name: 'SignedIn', component: page('Signedin.vue')},
];


export function createRouter() {
  return new Router({
    routes,
    mode: 'history'
  })
}
