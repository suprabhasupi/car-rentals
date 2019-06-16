import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

class HomeState {
  constructor () {
    this.name = 'Home'
  }
}

export default new Vuex.Store({
  state: new HomeState()
})
