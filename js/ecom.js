'use strict';

var Ecom = Ecom || {};

Ecom.State = (function($, Vue, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    count: 0
  };

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {
    increment: function increment(state) {
      state.count++;
    },
    decrement: function decrement(state) {
      state.count--;
    }
  };

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {
    increment: function increment(_ref) {
      var commit = _ref.commit;
      return commit('increment');
    },
    decrement: function decrement(_ref2) {
      var commit = _ref2.commit;
      return commit('decrement');
    },
    incrementIfOdd: function incrementIfOdd(_ref3) {
      var commit = _ref3.commit,
          state = _ref3.state;

      if ((state.count + 1) % 2 === 0) {
        commit('increment');
      }
    },
    incrementAsync: function incrementAsync(_ref4) {
      var commit = _ref4.commit;

      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          commit('increment');
          resolve();
        }, 1000);
      });
    }
  };

  // getters are functions
  var getters = {
    evenOrOdd: function evenOrOdd(state) {
      return state.count % 2 === 0 ? 'even' : 'odd';
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

})(jQuery, Vue, Vuex);


$(function() {
  // Ecom.Basket.initialize();

  // Vue.component('product', {
  //   template: '<span>{{ getCount }}</span>',
  //   // vuex: {
  //   //   getters: {
  //   //     getCount: Ecom.Store.getCount // call getter above
  //   //   }
  //   // },
  //   data: function () {
  //     return {
  //       // getCount: Ecom.Store.getCount(),
  //       message: 'Hi there'
  //     }
  //   }
  // });

  new Vue({
    el: '#app', // using jquery instance
    // computed: $.extend( {}, Ecom.State.mapGetters ); _extends({}, (0, _vuex.mapGetters)({
    //   products: 'cartProducts',
    //   checkoutStatus: 'checkoutStatus'
    // }),
    store: Ecom.State
  });

  console.log(Ecom.State.getters.evenOrOdd);
});
