var store = function(t, n) {
    "use strict";
    var e = {
        count: 0,
        tarantino: [],
        favorites: []
    }, r = {
        increment: function(t) {
            t.count++;
        },
        decrement: function(t) {
            t.count--;
        },
        setTarantino: function(t, n) {
            t.tarantino = n;
        },
        sortTarantino: function(t, n) {
            function e(t, e) {
                return t[n] < e[n] ? -1 : t[n] > e[n] ? 1 : 0;
            }
            t.tarantino.sort(e);
        },
        addFavorite: function(t, n) {
            t.favorites.push(n);
        },
        removeFavorite: function(t, n) {
            var e = t.favorites.indexOf(n);
            e !== -1 && t.favorites.splice(e, 1);
        }
    }, o = {
        increment: function(t) {
            return t.commit("increment");
        },
        decrement: function(t) {
            return t.commit("decrement");
        },
        sortTarantino: function(t, n) {
            return t.commit("sortTarantino", n);
        },
        addFavorite: function(t, n) {
            return t.commit("addFavorite", n);
        },
        removeFavorite: function(t, n) {
            return t.commit("removeFavorite", n);
        },
        getTarantino: function(n) {
            return t.http.get("./data.json").then(function(t) {
                n.commit("setTarantino", t.body);
            });
        }
    }, a = {
        randomTarantino: function(t) {
            return t.tarantino[Math.floor(Math.random() * t.tarantino.length)];
        }
    };
    return new n.Store({
        state: e,
        getters: a,
        actions: o,
        mutations: r
    });
}(Vue, Vuex);

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
                this.$store.dispatch("addFavorite", this.character);
            },
            removeFromFavorites: function() {
                this.$store.dispatch("removeFavorite", this.character);
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
            var t = this;
            this.$store.dispatch("getTarantino").then(function(n) {
                t.$store.dispatch("sortTarantino", "rank");
            });
        },
        methods: {
            sortBy: function(t) {
                this.$store.dispatch("sortTarantino", t);
            }
        }
    }), Vue.component("my-character", {
        template: "#my-character",
        computed: {
            character: function() {
                return this.$store.getters.randomTarantino;
            }
        }
    }), new Vue({
        el: "#app",
        store: store,
        computed: {
            favorites: function() {
                return this.$store.state.favorites;
            }
        },
        methods: {
            removeFromFavorites: function(t) {
                this.$store.dispatch("removeFavorite", t);
            }
        }
    });
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbInN0b3JlIiwiVnVlIiwiVnVleCIsInN0YXRlIiwiY291bnQiLCJ0YXJhbnRpbm8iLCJmYXZvcml0ZXMiLCJtdXRhdGlvbnMiLCJpbmNyZW1lbnQiLCJkZWNyZW1lbnQiLCJzZXRUYXJhbnRpbm8iLCJkYXRhIiwic29ydFRhcmFudGlubyIsInNvcnRCeSIsImNvbXBhcmUiLCJhIiwiYiIsInNvcnQiLCJhZGRGYXZvcml0ZSIsImNoYXJhY3RlciIsInB1c2giLCJyZW1vdmVGYXZvcml0ZSIsImkiLCJpbmRleE9mIiwic3BsaWNlIiwiYWN0aW9ucyIsImNvbnRleHQiLCJjb21taXQiLCJnZXRUYXJhbnRpbm8iLCJodHRwIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiYm9keSIsImdldHRlcnMiLCJyYW5kb21UYXJhbnRpbm8iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJTdG9yZSIsImNvbXBvbmVudCIsInRlbXBsYXRlIiwicHJvcHMiLCJpc0Zhdm9yaXRlIiwidGhpcyIsIiRzdG9yZSIsIm1ldGhvZHMiLCJhZGRUb0Zhdm9yaXRlcyIsImRpc3BhdGNoIiwiY29tcHV0ZWQiLCJjcmVhdGVkIiwiX3NlbGYiLCJwcm9wIiwiZWwiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFFBQVMsU0FBU0MsR0FBS0M7SUFDekI7SUFJQSxJQUFJQztRQUNGQyxPQUFPO1FBQ1BDO1FBQ0FDO09BUUVDO1FBQ0ZDLFdBQVcsU0FBU0w7WUFDbEJBLEVBQU1DOztRQUVSSyxXQUFXLFNBQVNOO1lBQ2xCQSxFQUFNQzs7UUFFUk0sY0FBYyxTQUFTUCxHQUFPUTtZQUM1QlIsRUFBTUUsWUFBWU07O1FBRXBCQyxlQUFlLFNBQVNULEdBQU9VO1lBQzdCLFNBQVNDLEVBQVFDLEdBQUVDO2dCQUNqQixPQUFJRCxFQUFFRixLQUFVRyxFQUFFSCxNQUNULElBQ0xFLEVBQUVGLEtBQVVHLEVBQUVILEtBQ1QsSUFDRjs7WUFFVFYsRUFBTUUsVUFBVVksS0FBS0g7O1FBRXZCSSxhQUFhLFNBQVNmLEdBQU9nQjtZQUMzQmhCLEVBQU1HLFVBQVVjLEtBQUtEOztRQUV2QkUsZ0JBQWdCLFNBQVNsQixHQUFPZ0I7WUFDOUIsSUFBSUcsSUFBSW5CLEVBQU1HLFVBQVVpQixRQUFRSjtZQUM3QkcsT0FBTSxLQUFJbkIsRUFBTUcsVUFBVWtCLE9BQU9GLEdBQUc7O09BTXZDRztRQUNGakIsV0FBVyxTQUFTa0I7WUFDbEIsT0FBT0EsRUFBUUMsT0FBTzs7UUFFeEJsQixXQUFXLFNBQVNpQjtZQUNsQixPQUFPQSxFQUFRQyxPQUFPOztRQUV4QmYsZUFBZSxTQUFTYyxHQUFTYjtZQUMvQixPQUFPYSxFQUFRQyxPQUFPLGlCQUFpQmQ7O1FBRXpDSyxhQUFhLFNBQVNRLEdBQVNQO1lBQzdCLE9BQU9PLEVBQVFDLE9BQU8sZUFBZVI7O1FBRXZDRSxnQkFBZ0IsU0FBU0ssR0FBU1A7WUFDaEMsT0FBT08sRUFBUUMsT0FBTyxrQkFBa0JSOztRQUUxQ1MsY0FBYyxTQUFTRjtZQUNyQixPQUFPekIsRUFBSTRCLEtBQUtDLElBQUksZUFBZUMsS0FBSyxTQUFTQztnQkFDL0NOLEVBQVFDLE9BQU8sZ0JBQWdCSyxFQUFTQzs7O09BTTFDQztRQUNGQyxpQkFBaUIsU0FBU2hDO1lBQ3hCLE9BQU9BLEVBQU1FLFVBQVUrQixLQUFLQyxNQUFNRCxLQUFLRSxXQUFXbkMsRUFBTUUsVUFBVWtDOzs7SUFNdEUsT0FBTyxJQUFJckMsRUFBS3NDO1FBQ2RyQyxPQUFPQTtRQUNQK0IsU0FBU0E7UUFDVFQsU0FBU0E7UUFDVGxCLFdBQVdBOztFQUdaTixLQUFLQzs7Q0F0RlI7SUFDRUQsSUFBQXdDLFVBQUE7UUNDRUMsVUFBVTtRRENaQyxTQUFBO1FBQ0FoQyxNQUFBO1lDQ0k7Z0JEQUFSLFNBQVE7OztRQUdWRztZQUhGc0MsWUFBQTtnQkNNTSxPQUFPQyxLQUFLQyxPQUFPM0MsTUFBTUcsVUFBVWlCLFFBQVFzQixLQUFLMUIsZ0JBQWU7OztRREVyRTRCO1lBQ0FDLGdCQUFBO2dCQUNBSCxLQUFBQyxPQUFBRyxTQUFBLGVBQUFKLEtBQUExQjs7WUFFRVgscUJBQW9CTDtnQkFDbEJBLEtBQU1DLE9BQU42QyxTQUFBLGtCQUFBSixLQUFBMUI7OztRQUtGVCxJQUFBQSxVQUFBQTtRQUNFUCxVQUFNRTtRQUNQNkM7WUFDRHRDLFdBQUFBO2dCQUNFLE9BQVNFLEtBQUFBLE9BQVRYLE1BQXNCRTs7O1FBS3BCOEMsU0FBQTtZQUNELElBQUFDLElBQUFQO1lBQ0QxQyxLQUFBQSxPQUFNRSxTQUFlUyxnQkFBckJpQixLQUFBLFNBQUFMO2dCQWxCWTBCLEVBQUFOLE9BQUFHLFNBQUEsaUJBQUE7OztRQXNCYkY7WUFDRDFCLFFBQUFBLFNBQWdCZ0M7Z0JBQ2RSLEtBQUl2QixPQUFVaEIsU0FBTixpQkFBd0JhOzs7UUFLcENsQixJQUFBd0MsVUFBQTtRQUNBQyxVQUFBO1FBQ0FRO1lBQ0UxQyxXQUFXO2dCQUNULE9BQU9rQixLQUFBQSxPQUFBUSxRQUFlQzs7O1FBS3hCdkIsSUFBQUE7UUFDRTBDLElBQUE7UUFDRHRELE9BVFdBO1FBVVprQjtZQUNFWixXQUFPb0I7Z0JBWEcsT0FBQW1CLEtBQUFDLE9BQUEzQyxNQUFBRzs7O1FBZVh5QztZQUNEbkIscUJBQWMsU0FBQVQ7Z0JBQ1owQixLQUFPNUMsT0FBSTRCLFNBQVMsa0JBQW9CViIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3RvcmUgPSAoZnVuY3Rpb24oVnVlLCBWdWV4KSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyByb290IHN0YXRlIG9iamVjdC5cbiAgLy8gZWFjaCBWdWV4IGluc3RhbmNlIGlzIGp1c3QgYSBzaW5nbGUgc3RhdGUgdHJlZS5cbiAgdmFyIHN0YXRlID0ge1xuICAgIGNvdW50OiAwLFxuICAgIHRhcmFudGlubzogW10sXG4gICAgZmF2b3JpdGVzOiBbXVxuICB9O1xuXG4gIC8vIG11dGF0aW9ucyBhcmUgb3BlcmF0aW9ucyB0aGF0IGFjdHVhbGx5IG11dGF0ZXMgdGhlIHN0YXRlLlxuICAvLyBlYWNoIG11dGF0aW9uIGhhbmRsZXIgZ2V0cyB0aGUgZW50aXJlIHN0YXRlIHRyZWUgYXMgdGhlXG4gIC8vIGZpcnN0IGFyZ3VtZW50LCBmb2xsb3dlZCBieSBhZGRpdGlvbmFsIHBheWxvYWQgYXJndW1lbnRzLlxuICAvLyBtdXRhdGlvbnMgbXVzdCBiZSBzeW5jaHJvbm91cyBhbmQgY2FuIGJlIHJlY29yZGVkIGJ5IHBsdWdpbnNcbiAgLy8gZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgdmFyIG11dGF0aW9ucyA9IHtcbiAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBzdGF0ZS5jb3VudCsrO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgc3RhdGUuY291bnQtLTtcbiAgICB9LFxuICAgIHNldFRhcmFudGlubzogZnVuY3Rpb24oc3RhdGUsIGRhdGEpIHtcbiAgICAgIHN0YXRlLnRhcmFudGlubyA9IGRhdGE7XG4gICAgfSxcbiAgICBzb3J0VGFyYW50aW5vOiBmdW5jdGlvbihzdGF0ZSwgc29ydEJ5KSB7XG4gICAgICBmdW5jdGlvbiBjb21wYXJlKGEsYikge1xuICAgICAgICBpZiAoYVtzb3J0QnldIDwgYltzb3J0QnldKVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGFbc29ydEJ5XSA+IGJbc29ydEJ5XSlcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBzdGF0ZS50YXJhbnRpbm8uc29ydChjb21wYXJlKTtcbiAgICB9LFxuICAgIGFkZEZhdm9yaXRlOiBmdW5jdGlvbihzdGF0ZSwgY2hhcmFjdGVyKSB7XG4gICAgICBzdGF0ZS5mYXZvcml0ZXMucHVzaChjaGFyYWN0ZXIpO1xuICAgIH0sXG4gICAgcmVtb3ZlRmF2b3JpdGU6IGZ1bmN0aW9uKHN0YXRlLCBjaGFyYWN0ZXIpIHtcbiAgICAgIHZhciBpID0gc3RhdGUuZmF2b3JpdGVzLmluZGV4T2YoY2hhcmFjdGVyKTtcbiAgICAgIGlmKGkgIT09IC0xKSBzdGF0ZS5mYXZvcml0ZXMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfTtcblxuICAvLyBhY3Rpb25zIGFyZSBmdW5jdGlvbnMgdGhhdCBjYXVzZXMgc2lkZSBlZmZlY3RzIGFuZCBjYW4gaW52b2x2ZVxuICAvLyBhc3luY2hyb25vdXMgb3BlcmF0aW9ucy5cbiAgdmFyIGFjdGlvbnMgPSB7XG4gICAgaW5jcmVtZW50OiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ2luY3JlbWVudCcpO1xuICAgIH0sXG4gICAgZGVjcmVtZW50OiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ2RlY3JlbWVudCcpO1xuICAgIH0sXG4gICAgc29ydFRhcmFudGlubzogZnVuY3Rpb24oY29udGV4dCwgc29ydEJ5KSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ3NvcnRUYXJhbnRpbm8nLCBzb3J0QnkpO1xuICAgIH0sXG4gICAgYWRkRmF2b3JpdGU6IGZ1bmN0aW9uKGNvbnRleHQsIGNoYXJhY3Rlcikge1xuICAgICAgcmV0dXJuIGNvbnRleHQuY29tbWl0KCdhZGRGYXZvcml0ZScsIGNoYXJhY3Rlcik7XG4gICAgfSxcbiAgICByZW1vdmVGYXZvcml0ZTogZnVuY3Rpb24oY29udGV4dCwgY2hhcmFjdGVyKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5jb21taXQoJ3JlbW92ZUZhdm9yaXRlJywgY2hhcmFjdGVyKTtcbiAgICB9LFxuICAgIGdldFRhcmFudGlubzogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgcmV0dXJuIFZ1ZS5odHRwLmdldCgnLi9kYXRhLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgY29udGV4dC5jb21taXQoJ3NldFRhcmFudGlubycsIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGdldHRlcnMgYXJlIGZ1bmN0aW9uc1xuICB2YXIgZ2V0dGVycyA9IHtcbiAgICByYW5kb21UYXJhbnRpbm86IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUudGFyYW50aW5vW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHN0YXRlLnRhcmFudGluby5sZW5ndGgpXTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQSBWdWV4IGluc3RhbmNlIGlzIGNyZWF0ZWQgYnkgY29tYmluaW5nIHRoZSBzdGF0ZSwgbXV0YXRpb25zLCBhY3Rpb25zLFxuICAvLyBhbmQgZ2V0dGVycy5cbiAgcmV0dXJuIG5ldyBWdWV4LlN0b3JlKHtcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgZ2V0dGVyczogZ2V0dGVycyxcbiAgICBhY3Rpb25zOiBhY3Rpb25zLFxuICAgIG11dGF0aW9uczogbXV0YXRpb25zXG4gIH0pO1xuXG59KShWdWUsIFZ1ZXgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBWdWUuY29tcG9uZW50KCdteS1pdGVtJywge1xuICAgIHRlbXBsYXRlOiAnI215LWl0ZW0nLFxuICAgIHByb3BzOiBbJ2NoYXJhY3RlciddLFxuICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBpc0Zhdm9yaXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5zdGF0ZS5mYXZvcml0ZXMuaW5kZXhPZih0aGlzLmNoYXJhY3RlcikgIT09IC0xO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgYWRkVG9GYXZvcml0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnYWRkRmF2b3JpdGUnLCB0aGlzLmNoYXJhY3Rlcik7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRnJvbUZhdm9yaXRlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdyZW1vdmVGYXZvcml0ZScsIHRoaXMuY2hhcmFjdGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIFZ1ZS5jb21wb25lbnQoJ215LWZpbHRlcicsIHtcbiAgICB0ZW1wbGF0ZTogJyNteS1maWx0ZXInLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICB0YXJhbnRpbm86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLnRhcmFudGlubztcbiAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdnZXRUYXJhbnRpbm8nKS50aGVuKGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgX3NlbGYuJHN0b3JlLmRpc3BhdGNoKCdzb3J0VGFyYW50aW5vJywgJ3JhbmsnKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgc29ydEJ5OiBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIHRoaXMuJHN0b3JlLmRpc3BhdGNoKCdzb3J0VGFyYW50aW5vJywgcHJvcCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBWdWUuY29tcG9uZW50KCdteS1jaGFyYWN0ZXInLCB7XG4gICAgdGVtcGxhdGU6ICcjbXktY2hhcmFjdGVyJyxcbiAgICBjb21wdXRlZDoge1xuICAgICAgY2hhcmFjdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzLnJhbmRvbVRhcmFudGlubztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIG5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgc3RvcmU6IHN0b3JlLFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICBmYXZvcml0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLmZhdm9yaXRlcztcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHJlbW92ZUZyb21GYXZvcml0ZXM6IGZ1bmN0aW9uKGNoYXJhY3Rlcikge1xuICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgncmVtb3ZlRmF2b3JpdGUnLCBjaGFyYWN0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KSgpO1xuIl19
