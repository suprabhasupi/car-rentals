import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

class HomeState {
  constructor () {
    this.name = 'Home'
    this.allNewCategory = []
  }
  getFeaturedProducts () {
    return fetch('https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85', {
      method: 'GET'
    })
  }
}

export default new Vuex.Store({
  state: new HomeState()
})
