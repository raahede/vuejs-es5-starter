'use strict';

var Ecom = Ecom || {};


$(function() {
  Ecom.Basket.initialize();

  Vue.component('product', {
    template: '<span>{{ getCount }}</span>',
    // vuex: {
    //   getters: {
    //     getCount: Ecom.Store.getCount // call getter above
    //   }
    // },
    data: function () {
      return {
        getCount: Ecom.Store.getCount(),
        message: 'Hi there'
      }
    }
  });

  new Vue({
    el: '#app', // using jquery instance
    store: Ecom.Store.Vuex
  });
});
