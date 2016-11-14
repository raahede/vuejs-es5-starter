var Ecom = Ecom || {}, store = function(t) {
    "use strict";
    var e = {
        count: 0,
        tarantino: [],
        favorites: []
    }, n = {
        increment: function(t) {
            t.count++;
        },
        decrement: function(t) {
            t.count--;
        },
        setTarantino: function(t, e) {
            t.tarantino = e;
        },
        sortTarantino: function(t, e) {
            function n(t, n) {
                return t[e] < n[e] ? -1 : t[e] > n[e] ? 1 : 0;
            }
            t.tarantino.sort(n);
        },
        addFavorite: function(t, e) {
            t.favorites.push(e);
        },
        removeFavorite: function(t, e) {
            var n = t.favorites.indexOf(e);
            n !== -1 && t.favorites.splice(n, 1);
        }
    }, o = {
        increment: function(t) {
            return t.commit("increment");
        },
        decrement: function(t) {
            return t.commit("decrement");
        }
    }, r = {
        evenOrOdd: function(t) {
            return t.count % 2 === 0 ? "even" : "odd";
        }
    };
    return new t.Store({
        state: e,
        getters: r,
        actions: o,
        mutations: n
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
                this.$store.commit("setTarantino", t.body), this.$store.commit("sortTarantino", "rank");
            });
        },
        methods: {
            sortBy: function(t) {
                this.$store.commit("sortTarantino", t);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVjb20iLCJzdG9yZSIsIlZ1ZXgiLCJzdGF0ZSIsImNvdW50IiwidGFyYW50aW5vIiwiZmF2b3JpdGVzIiwibXV0YXRpb25zIiwiaW5jcmVtZW50IiwiZGVjcmVtZW50Iiwic2V0VGFyYW50aW5vIiwiZGF0YSIsInNvcnRUYXJhbnRpbm8iLCJzb3J0QnkiLCJjb21wYXJlIiwiYSIsImIiLCJzb3J0IiwiYWRkRmF2b3JpdGUiLCJjaGFyYWN0ZXIiLCJwdXNoIiwicmVtb3ZlRmF2b3JpdGUiLCJpIiwiaW5kZXhPZiIsInNwbGljZSIsImFjdGlvbnMiLCJjb250ZXh0IiwiY29tbWl0IiwiZ2V0dGVycyIsImV2ZW5Pck9kZCIsIlN0b3JlIiwiVnVlIiwiY29tcG9uZW50IiwicHJvcHMiLCJhY3RpdmUiLCJ0aGlzIiwiJHN0b3JlIiwibWV0aG9kcyIsImFkZFRvRmF2b3JpdGVzIiwicmVtb3ZlRnJvbUZhdm9yaXRlcyIsInRlbXBsYXRlIiwiY3JlYXRlZCIsIiRodHRwIiwidGhlbiIsInJlc3BvbnNlIiwiYm9keSIsInByb3AiLCJlbCIsImNvbXB1dGVkIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxPQUFPQSxZQUVQQyxRQUFTLFNBQVNDO0lBQ3BCO0lBSUEsSUFBSUM7UUFDRkMsT0FBTztRQUNQQztRQUNBQztPQVFFQztRQUNGQyxXQUFXLFNBQVNMO1lBQ2xCQSxFQUFNQzs7UUFFUkssV0FBVyxTQUFTTjtZQUNsQkEsRUFBTUM7O1FBRVJNLGNBQWMsU0FBU1AsR0FBT1E7WUFDNUJSLEVBQU1FLFlBQVlNOztRQUVwQkMsZUFBZSxTQUFTVCxHQUFPVTtZQUM3QixTQUFTQyxFQUFRQyxHQUFFQztnQkFDakIsT0FBSUQsRUFBRUYsS0FBVUcsRUFBRUgsTUFDVCxJQUNMRSxFQUFFRixLQUFVRyxFQUFFSCxLQUNULElBQ0Y7O1lBRVRWLEVBQU1FLFVBQVVZLEtBQUtIOztRQUV2QkksYUFBYSxTQUFTZixHQUFPZ0I7WUFDM0JoQixFQUFNRyxVQUFVYyxLQUFLRDs7UUFFdkJFLGdCQUFnQixTQUFTbEIsR0FBT2dCO1lBQzlCLElBQUlHLElBQUluQixFQUFNRyxVQUFVaUIsUUFBUUo7WUFDN0JHLE9BQU0sS0FBSW5CLEVBQU1HLFVBQVVrQixPQUFPRixHQUFHOztPQU12Q0c7UUFDRmpCLFdBQVcsU0FBU2tCO1lBQ2xCLE9BQU9BLEVBQVFDLE9BQU87O1FBRXhCbEIsV0FBVyxTQUFTaUI7WUFDbEIsT0FBT0EsRUFBUUMsT0FBTzs7T0FLdEJDO1FBQ0ZDLFdBQVcsU0FBUzFCO1lBQ2xCLE9BQU9BLEVBQU1DLFFBQVEsTUFBTSxJQUFJLFNBQVM7OztJQU01QyxPQUFPLElBQUlGLEVBQUs0QjtRQUNkM0IsT0FBT0E7UUFDUHlCLFNBQVNBO1FBQ1RILFNBQVNBO1FBQ1RsQixXQUFXQTs7RUFHWkw7O0NBMUVIO0lDQ0U2QixJQUFJQyxVQUFVO1FEQ1ovQixVQUFTO1FBQ1hnQyxTQUFBO1FDQ0V0QixNQUFNO1lEQ1I7Z0JBQ0F1QixTQUFBOzs7UUFFRTlCO1lBQ0FDLFlBRlU7Z0JBR1ZDLE9BQVc2QixLQUFBQyxPQUFBakMsTUFBQUcsVUFBQWlCLFFBQUFZLEtBQUFoQixnQkFBQTs7O1FBR2JrQjtZQUNBQyxnQkFBQTtnQkFDQUgsS0FBQUMsT0FBQVQsT0FBQSxlQUFBUSxLQUFBaEI7O1lBRUFvQixxQkFBQTtnQkFDSWhDLEtBQUFBLE9BQVlvQixPQUFBLGtCQUFBUSxLQUFBaEI7OztRQUtaaEIsSUFBQUEsVUFBTUM7UUFDUG9DLFVBTmE7UUFPZDlCO1lBQ0VQLFdBQU1FO2dCQVJNLE9BQUE4QixLQUFBQyxPQUFBakMsTUFBQUU7OztRQVlWb0MsU0FBSTFCO1lBRUpvQixLQUFBTyxNQUFNN0IsSUFBRixlQUNGOEIsS0FBQSxTQUFBQztnQkFDRlQsS0FBQUMsT0FBQVQsT0FBQSxnQkFBQWlCLEVBQUFDLE9BQ0RWLEtBQUFDLE9BQUFULE9BQUEsaUJBQUE7OztRQUdIVDtZQUNFZixRQUFNRyxTQUFVYztnQkFyQkplLEtBQUFDLE9BQUFULE9BQUEsaUJBQUFtQjs7O1FBQUEsSUFBaEJmO1FDMkJFZ0IsSUFBSTtRREVOOUMsT0FBQUE7UUFDQStDO1lBQ0l2QixPQUFBQTtnQkFDRmpCLE9BQVcyQixLQUFBQyxPQUFTVixNQUFUdEI7O1lBREN5QixXQUFBO2dCQUlacEIsT0FBVzBCLEtBQUFDLE9BQVNWLFFBQVNHOztZQUU1QnZCLFdBQUE7Z0JBTkgsT0FBQTZCLEtBQUFDLE9BQUFqQyxNQUFBRzs7O1FBVUErQjtZQUNFUixXQUFXO2dCQUNUTSxLQUFPaEMsT0FBTUMsT0FBUTs7WUFGekJLLFdBQUE7Z0JDSU0wQixLQUFLQyxPQUFPVCxPQUFPOztZREd6QlkscUJBQUEsU0FBQXBCO2dCQUNBZ0IsS0FBV2pDLE9BQUs0QixPQUFNLGtCQUFBWCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRWNvbSA9IEVjb20gfHwge307XG5cbnZhciBzdG9yZSA9IChmdW5jdGlvbihWdWV4KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyByb290IHN0YXRlIG9iamVjdC5cbiAgLy8gZWFjaCBWdWV4IGluc3RhbmNlIGlzIGp1c3QgYSBzaW5nbGUgc3RhdGUgdHJlZS5cbiAgdmFyIHN0YXRlID0ge1xuICAgIGNvdW50OiAwLFxuICAgIHRhcmFudGlubzogW10sXG4gICAgZmF2b3JpdGVzOiBbXVxuICB9O1xuXG4gIC8vIG11dGF0aW9ucyBhcmUgb3BlcmF0aW9ucyB0aGF0IGFjdHVhbGx5IG11dGF0ZXMgdGhlIHN0YXRlLlxuICAvLyBlYWNoIG11dGF0aW9uIGhhbmRsZXIgZ2V0cyB0aGUgZW50aXJlIHN0YXRlIHRyZWUgYXMgdGhlXG4gIC8vIGZpcnN0IGFyZ3VtZW50LCBmb2xsb3dlZCBieSBhZGRpdGlvbmFsIHBheWxvYWQgYXJndW1lbnRzLlxuICAvLyBtdXRhdGlvbnMgbXVzdCBiZSBzeW5jaHJvbm91cyBhbmQgY2FuIGJlIHJlY29yZGVkIGJ5IHBsdWdpbnNcbiAgLy8gZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgdmFyIG11dGF0aW9ucyA9IHtcbiAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBzdGF0ZS5jb3VudCsrO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgc3RhdGUuY291bnQtLTtcbiAgICB9LFxuICAgIHNldFRhcmFudGlubzogZnVuY3Rpb24oc3RhdGUsIGRhdGEpIHtcbiAgICAgIHN0YXRlLnRhcmFudGlubyA9IGRhdGE7XG4gICAgfSxcbiAgICBzb3J0VGFyYW50aW5vOiBmdW5jdGlvbihzdGF0ZSwgc29ydEJ5KSB7XG4gICAgICBmdW5jdGlvbiBjb21wYXJlKGEsYikge1xuICAgICAgICBpZiAoYVtzb3J0QnldIDwgYltzb3J0QnldKVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGFbc29ydEJ5XSA+IGJbc29ydEJ5XSlcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBzdGF0ZS50YXJhbnRpbm8uc29ydChjb21wYXJlKTtcbiAgICB9LFxuICAgIGFkZEZhdm9yaXRlOiBmdW5jdGlvbihzdGF0ZSwgY2hhcmFjdGVyKSB7XG4gICAgICBzdGF0ZS5mYXZvcml0ZXMucHVzaChjaGFyYWN0ZXIpO1xuICAgIH0sXG4gICAgcmVtb3ZlRmF2b3JpdGU6IGZ1bmN0aW9uKHN0YXRlLCBjaGFyYWN0ZXIpIHtcbiAgICAgIHZhciBpID0gc3RhdGUuZmF2b3JpdGVzLmluZGV4T2YoY2hhcmFjdGVyKTtcbiAgICAgIGlmKGkgIT09IC0xKSBzdGF0ZS5mYXZvcml0ZXMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcblxuICAvLyBhY3Rpb25zIGFyZSBmdW5jdGlvbnMgdGhhdCBjYXVzZXMgc2lkZSBlZmZlY3RzIGFuZCBjYW4gaW52b2x2ZVxuICAvLyBhc3luY2hyb25vdXMgb3BlcmF0aW9ucy5cbiAgdmFyIGFjdGlvbnMgPSB7XG4gICAgaW5jcmVtZW50OiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ2luY3JlbWVudCcpO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ2RlY3JlbWVudCcpO1xuICAgIH1cbiAgfTtcblxuICAvLyBnZXR0ZXJzIGFyZSBmdW5jdGlvbnNcbiAgdmFyIGdldHRlcnMgPSB7XG4gICAgZXZlbk9yT2RkOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ICUgMiA9PT0gMCA/ICdldmVuJyA6ICdvZGQnO1xuICAgIH1cbiAgfTtcblxuICAvLyBBIFZ1ZXggaW5zdGFuY2UgaXMgY3JlYXRlZCBieSBjb21iaW5pbmcgdGhlIHN0YXRlLCBtdXRhdGlvbnMsIGFjdGlvbnMsXG4gIC8vIGFuZCBnZXR0ZXJzLlxuICByZXR1cm4gbmV3IFZ1ZXguU3RvcmUoe1xuICAgIHN0YXRlOiBzdGF0ZSxcbiAgICBnZXR0ZXJzOiBnZXR0ZXJzLFxuICAgIGFjdGlvbnM6IGFjdGlvbnMsXG4gICAgbXV0YXRpb25zOiBtdXRhdGlvbnNcbiAgfSk7XG5cbn0pKFZ1ZXgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBWdWUuY29tcG9uZW50KCdteS1pdGVtJywge1xuICAgIHRlbXBsYXRlOiAnI215LWl0ZW0nLFxuICAgIHByb3BzOiBbJ2NoYXJhY3RlciddLFxuICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBpc0Zhdm9yaXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mYXZvcml0ZXMuaW5kZXhPZih0aGlzLmNoYXJhY3RlcikgIT09IC0xO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgYWRkVG9GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2FkZEZhdm9yaXRlJywgdGhpcy5jaGFyYWN0ZXIpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUZyb21GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3JlbW92ZUZhdm9yaXRlJywgdGhpcy5jaGFyYWN0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgVnVlLmNvbXBvbmVudCgnbXktZmlsdGVyJywge1xuICAgIHRlbXBsYXRlOiAnI215LWZpbHRlcicsXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIHRhcmFudGlubzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUudGFyYW50aW5vO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRodHRwLmdldCgnLi9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzZXRUYXJhbnRpbm8nLCByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgdGhpcy4kc3RvcmUuY29tbWl0KCdzb3J0VGFyYW50aW5vJywgJ3JhbmsnKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgc29ydEJ5OiBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc29ydFRhcmFudGlubycsIHByb3ApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICBzdG9yZTogc3RvcmUsXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgIGNvdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5jb3VudDtcbiAgICAgIH0sXG4gICAgICBldmVuT3JPZGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnMuZXZlbk9yT2RkO1xuICAgICAgfSxcbiAgICAgIGZhdm9yaXRlczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuZmF2b3JpdGVzO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgaW5jcmVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnaW5jcmVtZW50Jyk7XG4gICAgICB9LFxuICAgICAgZGVjcmVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnZGVjcmVtZW50Jyk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRnJvbUZhdm9yaXRlczogZnVuY3Rpb24oY2hhcmFjdGVyKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgncmVtb3ZlRmF2b3JpdGUnLCBjaGFyYWN0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KSgpO1xuIl19
