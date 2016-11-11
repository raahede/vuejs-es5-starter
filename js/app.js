(function() {
  Vue.component('my-filter', {
    template: '#my-filter',
    computed: {
      tarantino: function () {
        return this.$store.state.tarantino;
      }
    },
    created: function() {
      this.$http.get('data.json').then(function(response){
        this.$store.commit('setTarantino', response.body);
      });
    }
  });

  new Vue({
    el: '#app',
    store: store,
    computed: {
      count: function () {
        return this.$store.state.count;
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
      }
    }
  });
})();
