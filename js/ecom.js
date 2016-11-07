'use strict';

var Ecom = Ecom || {};

Ecom.Store = (function($, Vue, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    count: 0,
    pendingRequests: [],
    basket: {
      orderLines: [],
      totalQuantity: 0
    },
    product: {},
    facets: {}
  };

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {
    increment: function(state) {
      state.count++;
    },
    decrement: function(state) {
      state.count--;
    },
    registerRequest: function(state, request) {
      state.pendingRequests.push(request);
    },
    unregisterRequest: function(state, request) {
      var i = state.pendingRequests.indexOf(request);
      if(i !== -1) state.pendingRequests.splice(i, 1);
    },
    setBasket: function(state, data) {
      state.basket = data;
    },
    setProduct: function(state, data) {
      state.product = data;
    },
    setFacets: function(state, data) {
      state.facets = data;
    }
  };

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {
    increment: function(state) {
      return state.commit('increment');
    },
    decrement: function(state) {
      return state.commit('decrement');
    },
    incrementIfOdd: function(state) {
      if ((state.count + 1) % 2 === 0) {
        state.commit('increment');
      }
    },
    incrementAsync: function(state) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          state.commit('increment');
          resolve();
        }, 1000);
      });
    },
    fetchBasket: function(state) {
      // var request = $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getbasket',
      var request = $.ajax('basket.json',
      {
        cache: false,
        dataType: 'json',
        method: 'GET'
      }).done(function (data) {
        state.commit('setBasket', data);
        state.commit('unregisterRequest', request);
      });
      state.commit('registerRequest', request);

      return request;
    },
    getProduct: function(state) {
      var request = $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getproduct',
      {
        cache: false,
        data: {
          id: 'BKMSFSS',
          variantId: 'BKMSFSS-15-White'
        },
        dataType: 'json',
        method: 'GET'
      }).done(function (data) {
        state.commit('setProduct', data);
        state.commit('unregisterRequest', request);
      });
      state.commit('registerRequest', request);
      return request;
    },
    getFacets: function(state) {
      var request = $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getfacets',
      {
        cache: false,
        data: {
          groupId: '70',
          url: 'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/demo-catalog/tops/formal/blue-kittens-mood-slim-fit-signature-shirt/c-24/c-70'
        },
        dataType: 'json',
        method: 'GET'
      }).done(function (data) {
        state.commit('setFacets', data);
        state.commit('unregisterRequest', request);
      });
      state.commit('registerRequest', request);
      return request;
    }
  };

  // getters are functions
  var getters = {
    evenOrOdd: function (state) {
      return state.count % 2 === 0 ? 'even' : 'odd';
    },
    getBasket: function(state) {
      return state.basket;
    },
    getFacets: function(state) {
      return state.facets;
    },
    hasPendingRequests: function(state) {
      return state.pendingRequests.length > 0 ? true : false;
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

  Vue.component('nz-mini-basket', {
    template: '#nz-mini-basket',
    // template: '<span>{{ getCount }}</span>',
    // vuex: {
    //   getters: {
    //     getCount: Ecom.Store.getCount // call getter above
    //   }
    // },
    data: function () {
      return {
        // getCount: Ecom.Store.getCount(),
        message: 'Hi there'
      }
    },
    computed: {
      basket: function () {
        return this.$store.state.basket
      }
    }
  });

  new Vue({
    el: '#app',
    store: Ecom.Store,
    computed: {
      count: function () {
        return this.$store.state.count
      },
      basket: function () {
        return this.$store.state.basket
      },
      product: function () {
        return this.$store.state.product
      },
      evenOrOdd: function () {
        return this.$store.getters.evenOrOdd
      },
      hasPendingRequests: function () {
        return this.$store.getters.hasPendingRequests
      }
    },
    methods: {
      increment: function () {
        this.$store.commit('increment');
      },
      decrement: function () {
        this.$store.commit('decrement');
      },
      fetchBasket: function () {
        this.$store.dispatch('fetchBasket');
      },
      getFacets: function () {
        this.$store.dispatch('getFacets');
      },
      getProduct: function () {
        console.log(this.$store);
        this.$store.dispatch('getProduct');
      }
    },
    created: function() {
      console.log(this);
      this.fetchBasket();
    }
  });

  console.log(Ecom.Store.state.count);
});
