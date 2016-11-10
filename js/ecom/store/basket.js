if(typeof(Ecom.Store) === 'undefined') return;

(function($, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    basket: {
      orderLines: [],
      totalQuantity: 0
    }
  };

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {
    setBasket: function(state, data) {
      state.basket = data;
    }
  };

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {
    getBasket: function(context) {
      var request = $.ajax(context.rootState.apiEndpoint.getbasket,
      // var request = $.ajax('basket.json',
      {
        cache: false,
        dataType: 'json',
        method: 'GET'
      }).done(function (data) {
        context.commit('setBasket', data);
        context.commit('unregisterRequest', request);
      }).fail(function () {
        context.commit('unregisterRequest', request);
        context.commit('registerFailedRequest', request);
      });
      context.commit('registerRequest', request);

      return request;
    }
    addToBasket: function(context, props) {
      console.log(props);
      $.ajax(context.rootState.apiEndpoint.addtobasket,
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
        context.dispatch('getBasket');
      });
    }
  };

  Ecom.Store.registerModule('basket', {
    state: state,
    actions: actions,
    mutations: mutations
  });

})(jQuery, Vuex);
