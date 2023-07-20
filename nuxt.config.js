// import webpack from "webpack";

const webpack = require("webpack");

require('dotenv').config({
  path:__dirname+'/.env'
})


// export default {
module.exports = {

  server : {
    host:"127.0.0.1",
    port: 8001
  },
  target:'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Forsan GYM',
    titleTemplate: 'Forsan GYM'+ ' | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/main.css' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
    ],
    script: [

    ]
  },
  env:{
    MEDIA_API:process.env.VUE_APP_MEDIA_API,
    API_URL: process.env.API_URL

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~plugins/bootstrap', mode: 'client'},
    {src: '~plugins/prototypes'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/router',
    "vue-sweetalert2/nuxt",
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }),
    ],
    standalone: true
  },

  router: {
    middleware: ['auth']
    // extendRoutes(routes, resolve){
    //   routes.push(
    //     {path: '/', name: 'home', component: 'pages/index.vue'},
    //     {path: '/login', name: 'login', component: 'pages/auth/login.vue'},
    //     {path: '/players', name: 'allPlayers', component: 'pages/players/index.vue'},
    //     {path: '/players/:id', name: 'singlePlayer', component: 'pages/players/view.vue'},
    //     {path: '/plans', name: 'allPlans', component: 'pages/plans/index.vue'},
    //     {path: '/plans/new', name: 'newPlan', component: 'pages/plans/new.vue'},
    //     {path: '/activities', name : 'allActs', component: 'pages/activities/index.vue'},
    //     {path: '/activities/new', name: 'newAct', component: 'pages/activities/new.vue'},
    //     {path: '/activityPlayer/:id', name: 'viewActivityPlayer', component: 'pages/activities/viewActivityPlayer'},
    //     {path: '/auth/login', name: 'auth.login', component: 'pages/auth/login'},
    //     {path: '/superAdmin/', name: 'superAdmin', component: 'pages/superAdmin/index.vue'},
    //     {path: '/superAdmin/viewAll', name: 'viewAdmins', component: 'pages/superAdmin/viewAdmins.vue'},
    //   )
    // }
  },

  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: "/auth/login",
      user: "/"
    },
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          maxAge: 1800,
          required: true,
          global: true,
          type: 'Bearer'
        },
        user: {
          autoFetch: true,
          property: false
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'accessToken' },
          user: { url: '/auth/me', method: 'get',propertyName: false },
        }
        // autoLogout: false
      }
    }
  }

}
