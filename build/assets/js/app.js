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
            console.log("sort by", e), t.tarantino.sort(n);
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
        data: function() {
            return {
                sortBy: "name"
            };
        },
        computed: {
            evenNumbers: function() {
                return this.$store.state.tarantino.filter(function(t) {
                    return t % 2 === 0;
                });
            },
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVjb20iLCJzdG9yZSIsIlZ1ZXgiLCJzdGF0ZSIsImNvdW50IiwidGFyYW50aW5vIiwiZmF2b3JpdGVzIiwibXV0YXRpb25zIiwiaW5jcmVtZW50IiwiZGVjcmVtZW50Iiwic2V0VGFyYW50aW5vIiwiZGF0YSIsInNvcnRUYXJhbnRpbm8iLCJzb3J0QnkiLCJjb21wYXJlIiwiYSIsImIiLCJjb25zb2xlIiwibG9nIiwic29ydCIsImFkZEZhdm9yaXRlIiwiY2hhcmFjdGVyIiwicHVzaCIsInJlbW92ZUZhdm9yaXRlIiwiaSIsImluZGV4T2YiLCJzcGxpY2UiLCJhY3Rpb25zIiwiY29udGV4dCIsImNvbW1pdCIsImdldHRlcnMiLCJldmVuT3JPZGQiLCJTdG9yZSIsIlZ1ZSIsImNvbXBvbmVudCIsInByb3BzIiwiYWN0aXZlIiwidGhpcyIsIiRzdG9yZSIsIm1ldGhvZHMiLCJhZGRUb0Zhdm9yaXRlcyIsInJlbW92ZUZyb21GYXZvcml0ZXMiLCJ0ZW1wbGF0ZSIsImNvbXB1dGVkIiwiZXZlbk51bWJlcnMiLCJmaWx0ZXIiLCJudW1iZXIiLCJyZXNwb25zZSIsImJvZHkiLCJwcm9wIiwiZWwiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLE9BQU9BLFlBRVBDLFFBQVMsU0FBU0M7SUFDcEI7SUFJQSxJQUFJQztRQUNGQyxPQUFPO1FBQ1BDO1FBQ0FDO09BUUVDO1FBQ0ZDLFdBQVcsU0FBU0w7WUFDbEJBLEVBQU1DOztRQUVSSyxXQUFXLFNBQVNOO1lBQ2xCQSxFQUFNQzs7UUFFUk0sY0FBYyxTQUFTUCxHQUFPUTtZQUM1QlIsRUFBTUUsWUFBWU07O1FBRXBCQyxlQUFlLFNBQVNULEdBQU9VO1lBRTdCLFNBQVNDLEVBQVFDLEdBQUVDO2dCQUNqQixPQUFJRCxFQUFFRixLQUFVRyxFQUFFSCxNQUNULElBQ0xFLEVBQUVGLEtBQVVHLEVBQUVILEtBQ1QsSUFDRjs7WUFOVEksUUFBUUMsSUFBSSxXQUFXTCxJQVF2QlYsRUFBTUUsVUFBVWMsS0FBS0w7O1FBRXZCTSxhQUFhLFNBQVNqQixHQUFPa0I7WUFDM0JsQixFQUFNRyxVQUFVZ0IsS0FBS0Q7O1FBRXZCRSxnQkFBZ0IsU0FBU3BCLEdBQU9rQjtZQUM5QixJQUFJRyxJQUFJckIsRUFBTUcsVUFBVW1CLFFBQVFKO1lBQzdCRyxPQUFNLEtBQUlyQixFQUFNRyxVQUFVb0IsT0FBT0YsR0FBRzs7T0FNdkNHO1FBQ0ZuQixXQUFXLFNBQVNvQjtZQUNsQixPQUFPQSxFQUFRQyxPQUFPOztRQUV4QnBCLFdBQVcsU0FBU21CO1lBQ2xCLE9BQU9BLEVBQVFDLE9BQU87O09BS3RCQztRQUNGQyxXQUFXLFNBQVM1QjtZQUNsQixPQUFPQSxFQUFNQyxRQUFRLE1BQU0sSUFBSSxTQUFTOzs7SUFNNUMsT0FBTyxJQUFJRixFQUFLOEI7UUFDZDdCLE9BQU9BO1FBQ1AyQixTQUFTQTtRQUNUSCxTQUFTQTtRQUNUcEIsV0FBV0E7O0VBR1pMOztDQTNFSDtJQ0NFK0IsSUFBSUMsVUFBVTtRRENaakMsVUFBUztRQUNYa0MsU0FBQTtRQ0NFeEIsTUFBTTtZRENSO2dCQUNBeUIsU0FBQTs7O1FBRUVoQztZQUNBQyxZQUZVO2dCQUdWQyxPQUFXK0IsS0FBQUMsT0FBQW5DLE1BQUFHLFVBQUFtQixRQUFBWSxLQUFBaEIsZ0JBQUE7OztRQUdia0I7WUFDQUMsZ0JBQUE7Z0JBQ0FILEtBQUFDLE9BQUFULE9BQUEsZUFBQVEsS0FBQWhCOztZQUVBb0IscUJBQUE7Z0JBQ0lsQyxLQUFBQSxPQUFZc0IsT0FBQSxrQkFBQVEsS0FBQWhCOzs7UUFLWmxCLElBQUFBLFVBQU1DO1FBQ1BzQyxVQU5hO1FBT2RoQyxNQUFBQTtZQUNFUDtnQkFSWVUsUUFBQTs7O1FBWVo4QjtZQUNFQyxhQUFNL0I7Z0JBRU4sT0FBTUEsS0FBRnlCLE9BQWN6QixNQUFsQlIsVUFDRXdDLE9BQUEsU0FBQUM7b0JBQ0YsT0FBQUEsSUFBQSxNQUFBOzs7WUFqQlV6QyxXQUFBO2dCQXFCZGUsT0FBQUEsS0FBYWtCLE9BQVNuQyxNQUFURTs7O1FBR2JrQixTQUFBQTtZQUNFYyxLQUFJYixNQUFJckIsSUFBTUcsZUFBVW1CLEtBQVFKLFNBQWhDMEI7Z0JBQ0FWLEtBQUdiLE9BQVVyQixPQUFNRyxnQkFBaUJrQixFQUF2QndCLE9BQ2RYLEtBQUFDLE9BQUFULE9BQUEsaUJBQUE7OztRQUdIVTtZQUNBMUIsUUFBQSxTQUFBb0M7Z0JBQ0l0QixLQUFBQSxPQUFVRSxPQUFBLGlCQUFBb0I7OztRQUtWLElBQUFoQjtRQUNEaUIsSUFBQTtRQU5IakQsT0FBQUE7UUNPRTBDO1lERUZ2QyxPQUFBO2dCQUNJMEIsT0FBQUEsS0FBVVEsT0FBQW5DLE1BQUFDOztZQUVWMkIsV0FBTzVCO2dCQUNSLE9BQUFrQyxLQUFBQyxPQUFBUixRQUFBQzs7WUNDQ3pCLFdBQVc7Z0JERWYsT0FBQStCLEtBQUFDLE9BQUFuQyxNQUFBRzs7O1FBR0VIO1lBQ0EyQixXQUFTQTtnQkFDVEgsS0FBU0EsT0FIV0UsT0FBQTs7WUFBdEJwQixXQUFBO2dCQWxFRjRCLEtBQUFDLE9BQUFULE9BQUE7O1lDRE1LLHFCQUFxQixTQUFBYjtnQkFDdkJxQixLQUFBQSxPQUFVYixPQURhLGtCQUFBUiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRWNvbSA9IEVjb20gfHwge307XG5cbnZhciBzdG9yZSA9IChmdW5jdGlvbihWdWV4KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyByb290IHN0YXRlIG9iamVjdC5cbiAgLy8gZWFjaCBWdWV4IGluc3RhbmNlIGlzIGp1c3QgYSBzaW5nbGUgc3RhdGUgdHJlZS5cbiAgdmFyIHN0YXRlID0ge1xuICAgIGNvdW50OiAwLFxuICAgIHRhcmFudGlubzogW10sXG4gICAgZmF2b3JpdGVzOiBbXVxuICB9O1xuXG4gIC8vIG11dGF0aW9ucyBhcmUgb3BlcmF0aW9ucyB0aGF0IGFjdHVhbGx5IG11dGF0ZXMgdGhlIHN0YXRlLlxuICAvLyBlYWNoIG11dGF0aW9uIGhhbmRsZXIgZ2V0cyB0aGUgZW50aXJlIHN0YXRlIHRyZWUgYXMgdGhlXG4gIC8vIGZpcnN0IGFyZ3VtZW50LCBmb2xsb3dlZCBieSBhZGRpdGlvbmFsIHBheWxvYWQgYXJndW1lbnRzLlxuICAvLyBtdXRhdGlvbnMgbXVzdCBiZSBzeW5jaHJvbm91cyBhbmQgY2FuIGJlIHJlY29yZGVkIGJ5IHBsdWdpbnNcbiAgLy8gZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgdmFyIG11dGF0aW9ucyA9IHtcbiAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBzdGF0ZS5jb3VudCsrO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgc3RhdGUuY291bnQtLTtcbiAgICB9LFxuICAgIHNldFRhcmFudGlubzogZnVuY3Rpb24oc3RhdGUsIGRhdGEpIHtcbiAgICAgIHN0YXRlLnRhcmFudGlubyA9IGRhdGE7XG4gICAgfSxcbiAgICBzb3J0VGFyYW50aW5vOiBmdW5jdGlvbihzdGF0ZSwgc29ydEJ5KSB7XG4gICAgICBjb25zb2xlLmxvZygnc29ydCBieScsIHNvcnRCeSk7XG4gICAgICBmdW5jdGlvbiBjb21wYXJlKGEsYikge1xuICAgICAgICBpZiAoYVtzb3J0QnldIDwgYltzb3J0QnldKVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGFbc29ydEJ5XSA+IGJbc29ydEJ5XSlcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBzdGF0ZS50YXJhbnRpbm8uc29ydChjb21wYXJlKTtcbiAgICB9LFxuICAgIGFkZEZhdm9yaXRlOiBmdW5jdGlvbihzdGF0ZSwgY2hhcmFjdGVyKSB7XG4gICAgICBzdGF0ZS5mYXZvcml0ZXMucHVzaChjaGFyYWN0ZXIpO1xuICAgIH0sXG4gICAgcmVtb3ZlRmF2b3JpdGU6IGZ1bmN0aW9uKHN0YXRlLCBjaGFyYWN0ZXIpIHtcbiAgICAgIHZhciBpID0gc3RhdGUuZmF2b3JpdGVzLmluZGV4T2YoY2hhcmFjdGVyKTtcbiAgICAgIGlmKGkgIT09IC0xKSBzdGF0ZS5mYXZvcml0ZXMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcblxuICAvLyBhY3Rpb25zIGFyZSBmdW5jdGlvbnMgdGhhdCBjYXVzZXMgc2lkZSBlZmZlY3RzIGFuZCBjYW4gaW52b2x2ZVxuICAvLyBhc3luY2hyb25vdXMgb3BlcmF0aW9ucy5cbiAgdmFyIGFjdGlvbnMgPSB7XG4gICAgaW5jcmVtZW50OiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ2luY3JlbWVudCcpO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ2RlY3JlbWVudCcpO1xuICAgIH1cbiAgfTtcblxuICAvLyBnZXR0ZXJzIGFyZSBmdW5jdGlvbnNcbiAgdmFyIGdldHRlcnMgPSB7XG4gICAgZXZlbk9yT2RkOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ICUgMiA9PT0gMCA/ICdldmVuJyA6ICdvZGQnO1xuICAgIH1cbiAgfTtcblxuICAvLyBBIFZ1ZXggaW5zdGFuY2UgaXMgY3JlYXRlZCBieSBjb21iaW5pbmcgdGhlIHN0YXRlLCBtdXRhdGlvbnMsIGFjdGlvbnMsXG4gIC8vIGFuZCBnZXR0ZXJzLlxuICByZXR1cm4gbmV3IFZ1ZXguU3RvcmUoe1xuICAgIHN0YXRlOiBzdGF0ZSxcbiAgICBnZXR0ZXJzOiBnZXR0ZXJzLFxuICAgIGFjdGlvbnM6IGFjdGlvbnMsXG4gICAgbXV0YXRpb25zOiBtdXRhdGlvbnNcbiAgfSk7XG5cbn0pKFZ1ZXgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBWdWUuY29tcG9uZW50KCdteS1pdGVtJywge1xuICAgIHRlbXBsYXRlOiAnI215LWl0ZW0nLFxuICAgIHByb3BzOiBbJ2NoYXJhY3RlciddLFxuICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBpc0Zhdm9yaXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mYXZvcml0ZXMuaW5kZXhPZih0aGlzLmNoYXJhY3RlcikgIT09IC0xO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgYWRkVG9GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2FkZEZhdm9yaXRlJywgdGhpcy5jaGFyYWN0ZXIpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUZyb21GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3JlbW92ZUZhdm9yaXRlJywgdGhpcy5jaGFyYWN0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgVnVlLmNvbXBvbmVudCgnbXktZmlsdGVyJywge1xuICAgIHRlbXBsYXRlOiAnI215LWZpbHRlcicsXG4gICAgZGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3J0Qnk6ICduYW1lJ1xuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBldmVuTnVtYmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUudGFyYW50aW5vLmZpbHRlcihmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgcmV0dXJuIG51bWJlciAlIDIgPT09IDBcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0YXJhbnRpbm86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLnRhcmFudGlubztcbiAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kaHR0cC5nZXQoJy4vZGF0YS5qc29uJykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc2V0VGFyYW50aW5vJywgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnc29ydFRhcmFudGlubycsICdyYW5rJyk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHNvcnRCeTogZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3NvcnRUYXJhbnRpbm8nLCBwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIG5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgc3RvcmU6IHN0b3JlLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBjb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3RvcmUuc3RhdGUuY291bnQ7XG4gICAgICB9LFxuICAgICAgZXZlbk9yT2RkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLmV2ZW5Pck9kZDtcbiAgICAgIH0sXG4gICAgICBmYXZvcml0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLmZhdm9yaXRlcztcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIGluY3JlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2luY3JlbWVudCcpO1xuICAgICAgfSxcbiAgICAgIGRlY3JlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2RlY3JlbWVudCcpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUZyb21GYXZvcml0ZXM6IGZ1bmN0aW9uKGNoYXJhY3Rlcikge1xuICAgICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ3JlbW92ZUZhdm9yaXRlJywgY2hhcmFjdGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSkoKTtcbiJdfQ==
