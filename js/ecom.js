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


$(function() {

  Vue.component('nz-mini-basket', {
    template: '#nz-mini-basket',
    computed: {
      basket: function () {
        return this.$store.state.basket;
      }
    },
    created: function() {
      this.$store.dispatch('getBasket');
    }
  });

  Vue.component('nz-filter', {
    template: '#nz-filter',
    props: ['groupId'],
    computed: {
      facets: function () {
        return this.$store.state.facets;
      }
    },
    created: function() {
      this.$store.dispatch('getFacets',
      {
        groupId: this.groupId,
        url: 'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/demo-catalog/tops/formal/c-24/c-70?CollarSize=15|16'//window.location.href
      });
    },
    data: function () {
      return {
        checkedFacets: []
      };
    },
  });

  Vue.component('nz-filter-dropdown', {
    template: '#nz-filter-dropdown',
    props: ['facet', 'checkedFacets'],
    // computed: {
    //   facets: function () {
    //     return this.$store.state.facets;
    //   }
    // },
    created: function() {
      // var key = this.facet.displayName.toString();
      // var value = this.checkedValues;
      // this.checkedFacets[ key ] = value;
      this.checkedValues = $.grep(this.facet.options, function( n, i ) {
        return ( n.selected );
      });

      this.updateCheckedFacets();
      // var obj = { this.facet.displayName: this.checkedValues });
      // this.checkedFacets[this.facet.displayName] = this.checkedValues;
    },
    data: function () {
      return {
        checkedValues: []
      };
    },
    methods: {
      checkboxChange: function(option) {
        console.log(option.selected);
        if(option.selected) {
          this.checkedValues.push(option);
        } else {
          var i = this.checkedValues.indexOf(option);
          if(i !== -1) this.checkedValues.splice(i, 1);
        }
        this.updateCheckedFacets();
        this.createUrl();
      },
      updateCheckedFacets: function() {
        var key = this.facet.displayName;
        var value = this.checkedValues;
        this.checkedFacets[key] = value;
        var _this = this;

        Object.keys(this.checkedFacets).forEach(function(key, index) {
          console.log(key, index);
        });
      },
      createUrl: function() {
        var _this;
        var url = '';
        // Object.keys(_this.checkedFacets).forEach(function(key, index) {
        //   var prefix = index === 0 ? '?' : '&';
        //   url += prefix;
        //   for (var i = 0; i < _this.checkedFacets[key]; i++) {
        //     url += _this.checkedFacets[key][i] + '|';
        //   }
        // });
        console.log('url');
      }
    }
  });

  Vue.component('nz-errors', {
    template: '#nz-errors',
    computed: {
      failedRequests: function () {
        return this.$store.state.failedRequests;
      }
    },
    methods: {
      remove: function (request) {
        this.$store.commit('unregisterFailedRequest', request);
      }
    }
  });

  Vue.component('nz-loader', {
    template: '#nz-loader',
    computed: {
      hasPendingRequests: function () {
        return this.$store.getters.hasPendingRequests;
      }
    }
  });

  Vue.component('nz-product', {
    template: '#nz-product',
    // data: function () {
    //   return {
    //     stock: 0
    //   };
    // },
    props: ['initialStock', 'productName'],
    // created: function () {
    //   this.$data.stock = 0;
    //   // this.$data.stock = $product.data('stock');
    // },
    computed: {
      isDisabled: function() {
        return false;
      }
    },
    data: function () {
      return {
        stock: this.initialStock,
        text: this.productName
      };
    },
    methods: {
      addToBasket: function(productId, variantId) {
        // this.$data.stock--;
        // dispatch with a payload
        this.$store.dispatch('addToBasket', {
          productId: productId,
          variantId: variantId,
          quantity: 1
        });
      }
    }
  });

  new Vue({
    el: '#app',
    store: Ecom.Store,
    computed: {
      count: function () {
        return this.$store.state.count;
      },
      product: function () {
        return this.$store.state.product;
      },
      evenOrOdd: function () {
        return this.$store.getters.evenOrOdd;
      }
    },
    methods: {
      increment: function () {
        this.$store.commit('increment');
      },
      decrement: function () {
        this.$store.commit('decrement');
      },
      getBasket: function () {
        this.$store.dispatch('getBasket');
      },
      getFacets: function () {
        this.$store.dispatch('getFacets');
      },
      getProduct: function () {
        console.log(this.$store);
        this.$store.dispatch('getProduct');
      },
      addToBasket: function (productId, variantId) {
        console.log(this.$store);
        this.$store.dispatch('addToBasket', {
          productId: productId,
          variantId: variantId,
          quantity: 1
        });
      }
    },
    created: function() {
      console.log(this);
      // this.getBasket();
    }
  });

  // $('.js-vue-product').each(function() {
  //   var $product = $(this);

  //   new Vue({
  //     el: $product[0], // using jquery instance
  //     store: Ecom.Store,
  //     data: {
  //       stock: 0
  //     },
  //     created: function () {
  //       this.$data.stock = $product.data('stock');
  //     },
  //     methods: {
  //       addToBasket: function(productId, variantId) {
  //         this.$data.stock--;
  //         // dispatch with a payload
  //         this.$store.dispatch('addToBasket', {
  //           productId: productId,
  //           variantId: variantId,
  //           quantity: 1
  //         })
  //       }
  //     }
  //   });
  // });
});
