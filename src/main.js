import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: 'AIzaSyDgf7t1b116sMNtXgJ0lnlIssVlYZAZvu4',
  authDomain: 'vue-todo-1c732.firebaseapp.com',
  databaseURL: 'https://vue-todo-1c732.firebaseio.com',
  projectId: 'vue-todo-1c732',
  storageBucket: 'vue-todo-1c732.appspot.com',
  messagingSenderId: '599727970654',
  appId: '1:599727970654:web:cd2027969f09f4dd6dd7cf'
}

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
