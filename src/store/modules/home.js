import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

class HomeState {
  constructor () {
    this.name = 'Home'
    this.allNewCategory = []
  }
  getFeaturedProducts () {
    return fetch('https://car-search.s3.ap-south-1.amazonaws.com/car-rental.json', {
      method: 'GET'
    })
  }
}

export default new Vuex.Store({
  state: new HomeState()
})
