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
    },
    methods: {
      isFavorite: function (character) {
        console.log(character);
        // return this.$store.getters.isFavorite(character);
        // return this.$store.getters.evenOrOdd;
        return this.$store.state.favorites.indexOf(character) !== -1;
      },
      addToFavorites: function(character) {
        this.$store.commit('addFavorite', character);
      },
      removeFromFavorites: function(character) {
        this.$store.commit('removeFavorite', character);
      }
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
      },
      favorites: function () {
        return this.$store.state.favorites;
      }
    },
    methods: {
      increment: function () {
        this.$store.commit('increment');
      },
      decrement: function () {
        this.$store.commit('decrement');
      },
      removeFromFavorites: function(character) {
        this.$store.commit('removeFavorite', character);
      }
    }
  });
})();
