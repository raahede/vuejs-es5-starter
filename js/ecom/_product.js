$(function() {

  /**
   * Initialize modules here
   */

  $('.js-vue-product').each(function() {
    var $product = $(this);
    // console.log('PRODUCT', $product);

    new Vue({
      el: $product[0], // using jquery instance
      store: Ecom.Store.Vuex,
      data: {
        defaultData: {
          stock: 0
        },
        fetchedData: {}
      },
      computed: {
        productData: function () {
          console.log('Get data', this);
          return $.isEmptyObject(this.fetchedData) ? this.defaultData : this.fetchedData;
        },
        count: Ecom.Store.getters.getCount
      },
      created: function () {
        this.mapDataFromElement();
        console.log('Vue product is created: ', this);
      },
      methods: {
        getBasket: Ecom.Store.getters.getBasket,
        addToBasket: function (event) {
          event.preventDefault();
          var variantId = $(event.currentTarget).data('variantId');
          var _this = this;
          // _this.$data.fetchedData.stock--;
          _this.fetchedData = {
            stock: _this.productData.stock-1
          };
          console.log('AddToBasket', variantId, $product.data('id'));

          var _this = this;
          $.ajax('http://ecommercefoundation.sitecore.staging.nozebrahosting.dk/ucommerceapi/nozebra/addtobasket',
          {
            cache: false,
            data: JSON.stringify({
              'id': $product.data('id').toString(),
              'variantId': variantId.toString(),
              'quantity': 1
            }),
            dataType: 'json',
            contentType: 'application/json',
            method: 'POST'
          })
          .done(function (data) {
            _this.basketData = data;
            Ecom.Basket.fetchBasket();
            console.log('Basket Fetched', data, _this);
          });
        },
        mapDataFromElement: function() {
          this.$data.fetchedData.stock = $product.data('stock');
          console.log('Product data mapped', this.$data.fetchedData.stock);
        }
      }
    });
  });
});
