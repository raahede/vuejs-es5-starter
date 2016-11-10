var Ecom = Ecom || {};

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
        url: window.location.href //'http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/demo-catalog/tops/formal/c-24/c-70?CollarSize=15|16'
      });
    },
    methods: {
      checkboxChange: function() {
        this.$store.dispatch('updateFilterQuery');
        this.$store.dispatch('getProductList');
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
    props: ['initialStock', 'productName', 'productNumber', 'variantNumber'],
    // created: function () {
    //   this.$data.stock = 0;
    //   // this.$data.stock = $product.data('stock');
    // },
    data: function () {
      return {
        stock: this.initialStock,
        text: this.productName,
        product: this.productNumber,
        variant: this.variantNumber
      };
    },
    methods: {
      addToBasket: function() {
        this.$data.stock--;
        // dispatch with a payload
        this.$store.dispatch('addToBasket', {
          productId: this.productNumber,
          variantId: this.variantNumber,
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
