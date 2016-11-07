var Ecom = Ecom || {};

Ecom.Basket = (function($, Vue) {
  'use strict';

  var _basketVue;

  function fetchBasket() {
    var _this = this;
    // return $.ajax('basket.json',
    return $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/getbasket',
    {
      cache: false,
      dataType: 'json',
      method: 'GET'
    }).done(function (data) {
      if(typeof(_basketVue) === 'undefined' && data.orderLines !== null) {
        setupVue();
      }
      _basketVue.updateBasket(data);
      console.log('Basket Fetched', _this, _basketVue, data);
    });
  }

  function initialize() {
    fetchBasket();
  }

  function setupVue() {
    _basketVue = new Vue({
      el: '#basket',
      data: function() {
        console.log('Basket initial data');
        return {
          basketData: {}
        };
      },
      // computed: {
      //   hasProducts : function() {
      //     console.log('HAS PRODUCTS',this.basketData.orderlines.lenght);
      //     return this.basketData.orderlines.lenght;
      //   }
      // },
      created: function () {
        console.log('basket created',this);
        // this.fetchBasket();
      },
      methods: {
        updateBasket: function(data) {
          console.log('basket update', this);
          if(data.orderLines !== null) {
            console.log('basket setting basket', data, data.orderLines !== null);
            this.basketData = data;
          }
        }
      }
    });
  }

  ////////////////
  // Public API //
  ////////////////

  return {
    initialize: initialize,
    fetchBasket: fetchBasket
  };

})(jQuery, Vue);
