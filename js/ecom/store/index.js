var Ecom = Ecom || {};

Ecom.Store = (function($, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    pendingRequests: [],
    failedRequests: [],
    apiEndpoints: {
      getbasket: '/ucommerceapi/nozebra/getbasket',
      getproduct: '/ucommerceapi/nozebra/getproduct',
      getproductlist: window.location.pathname,
      getfacets: '/ucommerceapi/nozebra/getfacets',
      addtobasket: '/ucommerceapi/nozebra/addtobasket',
    }
  };
  // Set dev mode
  if(window.location.href.indexOf('localhost:3000') !== -1) {
    state.apiEndpoints = {
      getbasket: 'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getbasket',
      getproduct: 'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getproduct',
      getproductlist: '/productlist.html',
      getfacets: 'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getfacets',
      addtobasket: 'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/addtobasket',
    };
  }

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {
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
    }
  };

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {

  };

  // getters are functions
  var getters = {
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
