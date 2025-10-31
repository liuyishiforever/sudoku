import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import sudoku from '@/store/modules/sudoku'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    sudoku
  },
  getters
})

export default store
