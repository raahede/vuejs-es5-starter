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

  Vue.component('my-character', {
    template: '#my-character',
    computed: {
      character: function () {
        return this.$store.getters.randomTarantino;
      }
    }
  });

  var characterComponent = {
    template: '#my-character',
    computed: {
      character: function () {
        return this.$store.getters.randomTarantino;
      }
    }
  };

  var favoritesComponent = {
    template: '#my-favorites',
    computed: {
      favorites: function () {
        return this.$store.state.favorites;
      }
    },
    methods: {
      removeFromFavorites: function(character) {
        this.$store.dispatch('removeFavorite', character);
      }
    }
  };

  var router = new VueRouter({
    routes: [
      { path: '/character', component: characterComponent },
      { path: '*', component: favoritesComponent }
    ]
  })

  new Vue({
    el: '#app',
    store: store,
    router: router
  });
})();
