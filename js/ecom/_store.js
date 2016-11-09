var Ecom = Ecom || {};

Ecom.Store = (function($, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    count: 0,
    pendingRequests: [],
    failedRequests: [],
    basket: {
      orderLines: [],
      totalQuantity: 0
    },
    product: {},
    facets: {},
    currentFilterQuery: ''
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
    registerFailedRequest: function(state, request) {
      state.failedRequests.push(request);
    },
    unregisterFailedRequest: function(state, request) {
      var i = state.failedRequests.indexOf(request);
      if(i !== -1) state.failedRequests.splice(i, 1);
    },
    setBasket: function(state, data) {
      state.basket = data;
    },
    setProduct: function(state, data) {
      state.product = data;
    },
    setFacets: function(state, data) {
      state.facets = data;
    },
    setFilterQuery: function(state, query) {
      state.currentFilterQuery = query;
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
    getBasket: function(state) {
      var request = $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getbasket',
      // var request = $.ajax('basket.json',
      {
        cache: false,
        dataType: 'json',
        method: 'GET'
      }).done(function (data) {
        state.commit('setBasket', data);
        state.commit('unregisterRequest', request);
      }).fail(function () {
        state.commit('unregisterRequest', request);
        state.commit('registerFailedRequest', request);
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
      }).fail(function () {
        state.commit('unregisterRequest', request);
        state.commit('registerFailedRequest', request);
      });
      state.commit('registerRequest', request);
      return request;
    },
    getFacets: function(state, props) {
      var request = $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getfacets',
      {
        cache: false,
        data: {
          groupId: props.groupId,
          url: props.url
        },
        dataType: 'json',
        method: 'POST'
      }).done(function (data) {
        state.commit('setFacets', data);
        state.commit('unregisterRequest', request);
      }).fail(function () {
        console.log(request);
        state.commit('unregisterRequest', request);
        state.commit('registerFailedRequest', request);
      });
      state.commit('registerRequest', request);
      return request;
    },
    addToBasket: function(state, props) {
      console.log(props);
      $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/addtobasket',
      {
        cache: false,
        data: JSON.stringify({
          'id': props.productId,
          'variantId': props.variantId,
          'quantity': props.quantity
        }),
        dataType: 'json',
        contentType: 'application/json',
        method: 'POST'
      })
      .done(function (data) {
        console.log('Basket Fetched', data);
        state.dispatch('getBasket');
      });
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

})(jQuery, Vuex);
