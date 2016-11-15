(function() {
  Vue.component('my-item', {
    template: '#my-item',
    props: ['character'],
    data: function() {
      return {
        active: false
      };
    },
    computed: {
      isFavorite: function () {
        return this.$store.state.favorites.indexOf(this.character) !== -1;
      }
    },
    methods: {
      addToFavorites: function() {
        this.$store.dispatch('addFavorite', this.character);
      },
      removeFromFavorites: function() {
        this.$store.dispatch('removeFavorite', this.character);
      }
    }
  });

  Vue.component('my-filter', {
    template: '#my-filter',
    computed: {
      tarantino: function () {
        return this.$store.state.tarantino;
      }
    },
    created: function() {
      var _self = this;
      this.$store.dispatch('getTarantino').then(function(context) {
        _self.$store.dispatch('sortTarantino', 'rank');
      });
    },
    methods: {
      sortBy: function(prop) {
        this.$store.dispatch('sortTarantino', prop);
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
        this.$store.dispatch('increment');
      },
      decrement: function () {
        this.$store.dispatch('decrement');
      },
      removeFromFavorites: function(character) {
        this.$store.dispatch('removeFavorite', character);
      }
    }
  });
})();
