var store = (function(Vue, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    tarantino: [],
    favorites: []
  };

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {
    setTarantino: function(state, data) {
      state.tarantino = data;
    },
    sortTarantino: function(state, sortBy) {
      function compare(a,b) {
        if (a[sortBy] < b[sortBy])
          return -1;
        if (a[sortBy] > b[sortBy])
          return 1;
        return 0;
      }
      state.tarantino.sort(compare);
    },
    addFavorite: function(state, character) {
      state.favorites.push(character);
    },
    removeFavorite: function(state, character) {
      var i = state.favorites.indexOf(character);
      if(i !== -1) state.favorites.splice(i, 1);
    }
  };

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {
    sortTarantino: function(context, sortBy) {
      return context.commit('sortTarantino', sortBy);
    },
    addFavorite: function(context, character) {
      return context.commit('addFavorite', character);
    },
    removeFavorite: function(context, character) {
      return context.commit('removeFavorite', character);
    },
    getTarantino: function(context) {
      return Vue.http.get('./data.json').then(function(response){
        context.commit('setTarantino', response.body);
      });
    }
  };

  // getters are functions
  var getters = {
    randomTarantino: function(state) {
      return state.tarantino[Math.floor(Math.random() * state.tarantino.length)];
    }
  };

  // A Vuex instance is created by combining the state, mutations, actions,
  // and getters.
  return new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
  });

})(Vue, Vuex);
