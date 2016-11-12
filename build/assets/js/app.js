var Ecom = Ecom || {}, store = function(t) {
    "use strict";
    var e = {
        count: 0,
        tarantino: {},
        favorites: []
    }, o = {
        increment: function(t) {
            t.count++;
        },
        decrement: function(t) {
            t.count--;
        },
        setTarantino: function(t, e) {
            t.tarantino = e;
        },
        addFavorite: function(t, e) {
            t.favorites.push(e);
        },
        removeFavorite: function(t, e) {
            var o = t.favorites.indexOf(e);
            o !== -1 && t.favorites.splice(o, 1);
        }
    }, n = {
        increment: function(t) {
            return t.commit("increment");
        },
        decrement: function(t) {
            return t.commit("decrement");
        }
    }, r = {
        evenOrOdd: function(t) {
            return t.count % 2 === 0 ? "even" : "odd";
        },
        isFavorite: function(t, e) {
            return console.log("is favorite", e), !0;
        }
    };
    return new t.Store({
        state: e,
        getters: r,
        actions: n,
        mutations: o
    });
}(Vuex);

!function() {
    Vue.component("my-item", {
        template: "#my-item",
        props: [ "character" ],
        data: function() {
            return {
                active: !1
            };
        },
        computed: {
            isFavorite: function() {
                return this.$store.state.favorites.indexOf(this.character) !== -1;
            }
        },
        methods: {
            addToFavorites: function() {
                this.$store.commit("addFavorite", this.character);
            },
            removeFromFavorites: function() {
                this.$store.commit("removeFavorite", this.character);
            }
        }
    }), Vue.component("my-filter", {
        template: "#my-filter",
        computed: {
            tarantino: function() {
                return this.$store.state.tarantino;
            }
        },
        created: function() {
            this.$http.get("./data.json").then(function(t) {
                this.$store.commit("setTarantino", t.body);
            });
        },
        methods: {
            isFavorite: function(t) {
                return this.$store.state.favorites.indexOf(t) !== -1;
            },
            addToFavorites: function(t) {
                this.$store.commit("addFavorite", t);
            },
            removeFromFavorites: function(t) {
                this.$store.commit("removeFavorite", t);
            }
        }
    }), new Vue({
        el: "#app",
        store: store,
        computed: {
            count: function() {
                return this.$store.state.count;
            },
            evenOrOdd: function() {
                return this.$store.getters.evenOrOdd;
            },
            favorites: function() {
                return this.$store.state.favorites;
            }
        },
        methods: {
            increment: function() {
                this.$store.commit("increment");
            },
            decrement: function() {
                this.$store.commit("decrement");
            },
            removeFromFavorites: function(t) {
                this.$store.commit("removeFavorite", t);
            }
        }
    });
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVjb20iLCJzdG9yZSIsIlZ1ZXgiLCJzdGF0ZSIsImNvdW50IiwidGFyYW50aW5vIiwiZmF2b3JpdGVzIiwibXV0YXRpb25zIiwiaW5jcmVtZW50IiwiZGVjcmVtZW50Iiwic2V0VGFyYW50aW5vIiwiZGF0YSIsImFkZEZhdm9yaXRlIiwiY2hhcmFjdGVyIiwicHVzaCIsInJlbW92ZUZhdm9yaXRlIiwiaSIsImluZGV4T2YiLCJzcGxpY2UiLCJhY3Rpb25zIiwiY29udGV4dCIsImNvbW1pdCIsImdldHRlcnMiLCJldmVuT3JPZGQiLCJpc0Zhdm9yaXRlIiwiY29uc29sZSIsImxvZyIsIlN0b3JlIiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJhY3RpdmUiLCJ0aGlzIiwiJHN0b3JlIiwibWV0aG9kcyIsImFkZFRvRmF2b3JpdGVzIiwicmVtb3ZlRnJvbUZhdm9yaXRlcyIsInRlbXBsYXRlIiwiY3JlYXRlZCIsInRoZW4iLCJyZXNwb25zZSIsImJvZHkiLCJlbCIsImNvbXB1dGVkIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxPQUFPQSxZQUVQQyxRQUFTLFNBQVNDO0lBQ3BCO0lBSUEsSUFBSUM7UUFDRkMsT0FBTztRQUNQQztRQUNBQztPQVFFQztRQUNGQyxXQUFXLFNBQVNMO1lBQ2xCQSxFQUFNQzs7UUFFUkssV0FBVyxTQUFTTjtZQUNsQkEsRUFBTUM7O1FBRVJNLGNBQWMsU0FBU1AsR0FBT1E7WUFDNUJSLEVBQU1FLFlBQVlNOztRQUVwQkMsYUFBYSxTQUFTVCxHQUFPVTtZQUMzQlYsRUFBTUcsVUFBVVEsS0FBS0Q7O1FBRXZCRSxnQkFBZ0IsU0FBU1osR0FBT1U7WUFDOUIsSUFBSUcsSUFBSWIsRUFBTUcsVUFBVVcsUUFBUUo7WUFDN0JHLE9BQU0sS0FBSWIsRUFBTUcsVUFBVVksT0FBT0YsR0FBRzs7T0FNdkNHO1FBQ0ZYLFdBQVcsU0FBU1k7WUFDbEIsT0FBT0EsRUFBUUMsT0FBTzs7UUFFeEJaLFdBQVcsU0FBU1c7WUFDbEIsT0FBT0EsRUFBUUMsT0FBTzs7T0FLdEJDO1FBQ0ZDLFdBQVcsU0FBU3BCO1lBQ2xCLE9BQU9BLEVBQU1DLFFBQVEsTUFBTSxJQUFJLFNBQVM7O1FBRTFDb0IsWUFBWSxTQUFTckIsR0FBT1U7WUFFMUIsT0FEQVksUUFBUUMsSUFBSSxlQUFlYixLQUNwQjs7O0lBTVgsT0FBTyxJQUFJWCxFQUFLeUI7UUFDZHhCLE9BQU9BO1FBQ1BtQixTQUFTQTtRQUNUSCxTQUFTQTtRQUNUWixXQUFXQTs7RUFHWkw7O0NBcEVIO0lDQ0UwQixJQUFJQyxVQUFVO1FEQ1o1QixVQUFTO1FBQ1g2QixTQUFBO1FDQ0VuQixNQUFNO1lEQ1I7Z0JBQ0FvQixTQUFBOzs7UUFFRTNCO1lBQ0FDLFlBRlU7Z0JBR1ZDLE9BQVcwQixLQUFBQyxPQUFBOUIsTUFBQUcsVUFBQVcsUUFBQWUsS0FBQW5CLGdCQUFBOzs7UUFHYnFCO1lBQ0FDLGdCQUFBO2dCQUNBSCxLQUFBQyxPQUFBWixPQUFBLGVBQUFXLEtBQUFuQjs7WUFFQXVCLHFCQUFBO2dCQUNJN0IsS0FBQUEsT0FBWWMsT0FBQSxrQkFBQVcsS0FBQW5COzs7UUFLWlYsSUFBQUEsVUFBTUM7UUFDUGlDLFVBTmE7UUFPZDNCO1lBQ0VQLFdBQU1FO2dCQVJNLE9BQUEyQixLQUFBQyxPQUFBOUIsTUFBQUU7OztRQVliaUMsU0FaYTtZQWFkdkIsS0FBQUEsTUFBQUEsSUFBZ0IsZUFBQXdCLEtBQWdCMUIsU0FBVzJCO2dCQUN6Q1IsS0FBSWhCLE9BQVVWLE9BQUFBLGdCQUFrQk8sRUFBaEM0Qjs7O1FBZEpQO1lDbUJJVixZQUFZLFNBQVVYO2dCREExQixPQUFBbUIsS0FBQUMsT0FBQTlCLE1BQUFHLFVBQUFXLFFBQUFKLFFBQUE7O1lBRUlNLGdCQUFVLFNBQUFOO2dCQUNaTCxLQUFBQSxPQUFXYSxPQUFTRCxlQUFTUDs7WUFEakJ1QixxQkFBQSxTQUFBdkI7Z0JBSVpKLEtBQUFBLE9BQVdZLE9BQVNELGtCQUFTUDs7O1FBSy9CLElBQUFlO1FBQ0FjLElBQUlwQjtRQUNGQyxPQUFBQTtRQUNFb0I7WUFGVXZDLE9BQUE7Z0JBSVpvQixPQUFBQSxLQUFZUyxPQUFTOUIsTUFBT1U7O1lBRTFCVSxXQUFBO2dCQUNELE9BQUFTLEtBQUFDLE9BQUFYLFFBQUFDOztZQ0dDakIsV0FBVztnQkRBZixPQUFBMEIsS0FBQUMsT0FBQTlCLE1BQUFHOzs7UUFHRUg7WUFDQW1CLFdBQVNBO2dCQUNUSCxLQUFTQSxPQUhXRSxPQUFBOztZQUF0QlosV0FBQTtnQkEzREZ1QixLQUFBQyxPQUFBWixPQUFBOztZQ0RNUSxxQkFBcUIsU0FBQWhCO2dCQUN2QndCLEtBQUFBLE9BQVVoQixPQURhLGtCQUFBUiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRWNvbSA9IEVjb20gfHwge307XG5cbnZhciBzdG9yZSA9IChmdW5jdGlvbihWdWV4KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyByb290IHN0YXRlIG9iamVjdC5cbiAgLy8gZWFjaCBWdWV4IGluc3RhbmNlIGlzIGp1c3QgYSBzaW5nbGUgc3RhdGUgdHJlZS5cbiAgdmFyIHN0YXRlID0ge1xuICAgIGNvdW50OiAwLFxuICAgIHRhcmFudGlubzoge30sXG4gICAgZmF2b3JpdGVzOiBbXVxuICB9O1xuXG4gIC8vIG11dGF0aW9ucyBhcmUgb3BlcmF0aW9ucyB0aGF0IGFjdHVhbGx5IG11dGF0ZXMgdGhlIHN0YXRlLlxuICAvLyBlYWNoIG11dGF0aW9uIGhhbmRsZXIgZ2V0cyB0aGUgZW50aXJlIHN0YXRlIHRyZWUgYXMgdGhlXG4gIC8vIGZpcnN0IGFyZ3VtZW50LCBmb2xsb3dlZCBieSBhZGRpdGlvbmFsIHBheWxvYWQgYXJndW1lbnRzLlxuICAvLyBtdXRhdGlvbnMgbXVzdCBiZSBzeW5jaHJvbm91cyBhbmQgY2FuIGJlIHJlY29yZGVkIGJ5IHBsdWdpbnNcbiAgLy8gZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgdmFyIG11dGF0aW9ucyA9IHtcbiAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBzdGF0ZS5jb3VudCsrO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgc3RhdGUuY291bnQtLTtcbiAgICB9LFxuICAgIHNldFRhcmFudGlubzogZnVuY3Rpb24oc3RhdGUsIGRhdGEpIHtcbiAgICAgIHN0YXRlLnRhcmFudGlubyA9IGRhdGE7XG4gICAgfSxcbiAgICBhZGRGYXZvcml0ZTogZnVuY3Rpb24oc3RhdGUsIGNoYXJhY3Rlcikge1xuICAgICAgc3RhdGUuZmF2b3JpdGVzLnB1c2goY2hhcmFjdGVyKTtcbiAgICB9LFxuICAgIHJlbW92ZUZhdm9yaXRlOiBmdW5jdGlvbihzdGF0ZSwgY2hhcmFjdGVyKSB7XG4gICAgICB2YXIgaSA9IHN0YXRlLmZhdm9yaXRlcy5pbmRleE9mKGNoYXJhY3Rlcik7XG4gICAgICBpZihpICE9PSAtMSkgc3RhdGUuZmF2b3JpdGVzLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gYWN0aW9ucyBhcmUgZnVuY3Rpb25zIHRoYXQgY2F1c2VzIHNpZGUgZWZmZWN0cyBhbmQgY2FuIGludm9sdmVcbiAgLy8gYXN5bmNocm9ub3VzIG9wZXJhdGlvbnMuXG4gIHZhciBhY3Rpb25zID0ge1xuICAgIGluY3JlbWVudDogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQuY29tbWl0KCdpbmNyZW1lbnQnKTtcbiAgICB9LFxuICAgIGRlY3JlbWVudDogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgcmV0dXJuIGNvbnRleHQuY29tbWl0KCdkZWNyZW1lbnQnKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gZ2V0dGVycyBhcmUgZnVuY3Rpb25zXG4gIHZhciBnZXR0ZXJzID0ge1xuICAgIGV2ZW5Pck9kZDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5jb3VudCAlIDIgPT09IDAgPyAnZXZlbicgOiAnb2RkJztcbiAgICB9LFxuICAgIGlzRmF2b3JpdGU6IGZ1bmN0aW9uKHN0YXRlLCBjaGFyYWN0ZXIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdpcyBmYXZvcml0ZScsIGNoYXJhY3Rlcik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQSBWdWV4IGluc3RhbmNlIGlzIGNyZWF0ZWQgYnkgY29tYmluaW5nIHRoZSBzdGF0ZSwgbXV0YXRpb25zLCBhY3Rpb25zLFxuICAvLyBhbmQgZ2V0dGVycy5cbiAgcmV0dXJuIG5ldyBWdWV4LlN0b3JlKHtcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgZ2V0dGVyczogZ2V0dGVycyxcbiAgICBhY3Rpb25zOiBhY3Rpb25zLFxuICAgIG11dGF0aW9uczogbXV0YXRpb25zXG4gIH0pO1xuXG59KShWdWV4KTtcbiIsIihmdW5jdGlvbigpIHtcbiAgVnVlLmNvbXBvbmVudCgnbXktaXRlbScsIHtcbiAgICB0ZW1wbGF0ZTogJyNteS1pdGVtJyxcbiAgICBwcm9wczogWydjaGFyYWN0ZXInXSxcbiAgICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBpc0Zhdm9yaXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mYXZvcml0ZXMuaW5kZXhPZih0aGlzLmNoYXJhY3RlcikgIT09IC0xO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgYWRkVG9GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2FkZEZhdm9yaXRlJywgdGhpcy5jaGFyYWN0ZXIpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUZyb21GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3JlbW92ZUZhdm9yaXRlJywgdGhpcy5jaGFyYWN0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgVnVlLmNvbXBvbmVudCgnbXktZmlsdGVyJywge1xuICAgIHRlbXBsYXRlOiAnI215LWZpbHRlcicsXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIHRhcmFudGlubzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUudGFyYW50aW5vO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRodHRwLmdldCgnLi9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRUYXJhbnRpbm8nLCByZXNwb25zZS5ib2R5KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgaXNGYXZvcml0ZTogZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuZmF2b3JpdGVzLmluZGV4T2YoY2hhcmFjdGVyKSAhPT0gLTE7XG4gICAgICB9LFxuICAgICAgYWRkVG9GYXZvcml0ZXM6IGZ1bmN0aW9uKGNoYXJhY3Rlcikge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2FkZEZhdm9yaXRlJywgY2hhcmFjdGVyKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVGcm9tRmF2b3JpdGVzOiBmdW5jdGlvbihjaGFyYWN0ZXIpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdyZW1vdmVGYXZvcml0ZScsIGNoYXJhY3Rlcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIHN0b3JlOiBzdG9yZSxcbiAgICBjb21wdXRlZDoge1xuICAgICAgY291bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLmNvdW50O1xuICAgICAgfSxcbiAgICAgIGV2ZW5Pck9kZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVycy5ldmVuT3JPZGQ7XG4gICAgICB9LFxuICAgICAgZmF2b3JpdGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mYXZvcml0ZXM7XG4gICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdpbmNyZW1lbnQnKTtcbiAgICAgIH0sXG4gICAgICBkZWNyZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdkZWNyZW1lbnQnKTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVGcm9tRmF2b3JpdGVzOiBmdW5jdGlvbihjaGFyYWN0ZXIpIHtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdyZW1vdmVGYXZvcml0ZScsIGNoYXJhY3Rlcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pKCk7XG4iXX0=
