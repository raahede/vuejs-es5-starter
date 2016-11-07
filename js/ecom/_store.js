var Ecom = Ecom || {};

// https://gist.github.com/toast38coza/80bf55cda6ea6a05b6aeb0f12d558b74

Ecom.Store = (function($, Vue, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    count: 0,
    loading: false,
    pendingRequests : [],
    basket: {
      orderLines : []
    }
  };

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {
    increment (state, count) {
      state.count + count
    },
    decrement (state, count) {
      state.count - count
    },
    registerRequest (state, request) {
      state.pendingRequests.push(request)
    },
    unregisterRequest (state, request) {
      var i = state.pendingRequests.indexOf(request)
      state.pendingRequests.splice(i, 1)
    },
    updatebasket (state, data) {
      state.basket = data
    }
  };

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {
    increment: function ($event) {
      $event.dispatch('increment', 1); // <- you can change this to increment in different steps this will be the `count` argument in the INCREMENT mutation above
    },
    decrement: function ($event) {
      $event.dispatch('decrement', 1); // <- you can change this to increment in different steps this will be the `count` argument in the INCREMENT mutation above
    },
    incrementAsync: function ($event) {
      var deferred = $.Deferred();
      $event.dispatch('registerRequest', deferred.promise);
      setTimeout(function(){
        $event.dispatch('increment', 1);
        $event.dispatch('unregisterRequest', deferred.promise);
        deferred.resolve();
      }, 2000);
      return deferred.promise;
    },
    fetchBasket: function ($event) {
      var request = $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getbasket',
      {
        cache: false,
        dataType: 'json',
        method: 'GET'
      }).done(function (data) {
        $event.dispatch('updatebasket', data)
        $event.dispatch('unregisterRequest', request);
        resolve()
      }).fail(function() {
        $event.dispatch('unregisterRequest', request);
      });
      return request;
    }
  }

  // getters are functions
  var getters = {
    getCount: function (state) {
      return state.count;
    },
    evenOrOdd: function (state) {
      return state.count % 2 === 0 ? 'even' : 'odd';
    },
    appLoading: function (state) {
      return state.pendingRequests.length > 0;
    },
    getBasket: function (state) {
      console.log('Get basket');
      return state.basket;
    }
  }

  // A Vuex instance is created by combining the state, mutations, actions,
  // and getters.
  var vuexStore = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
  });

  ////////////////
  // Public API //
  ////////////////

  return {
    Vuex: vuexStore,
    actions: actions,
    getters: getters,
    getCount: getters.getCount
  };

})(jQuery, Vue, Vuex);
