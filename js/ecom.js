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
