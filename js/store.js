var store = (function(Vue, Vuex) {
  'use strict';

  // root state object.
  // each Vuex instance is just a single state tree.
  var state = {
    api: {
      space: 'wpk17fsuxh8l',
      access_token: '272b121abec98bcd8650d604bb626f2e1bb52ce70ba02906db3bab3319886f3f',
      content_types: 'https://cdn.contentful.com/spaces/wpk17fsuxh8l/content_types',
      entries: 'https://cdn.contentful.com/spaces/wpk17fsuxh8l/entries/',
      assets: 'https://cdn.contentful.com/spaces/wpk17fsuxh8l/assets/'
    }
  };

  // mutations are operations that actually mutates the state.
  // each mutation handler gets the entire state tree as the
  // first argument, followed by additional payload arguments.
  // mutations must be synchronous and can be recorded by plugins
  // for debugging purposes.
  var mutations = {};

  // actions are functions that causes side effects and can involve
  // asynchronous operations.
  var actions = {
    getContentTypes: function(context) {
      return Vue.http.get(
        context.state.api.content_types,
        {
          params: {
            access_token : context.state.api.access_token
          }
        }
      ).then(function(response) {
        // Parse response as JSON
        return response.json();
      });
    },
    getEntries: function(context, data) {
      return Vue.http.get(
        context.state.api.entries,
        {
          params: {
            access_token : context.state.api.access_token,
            content_type : data.content_type
          }
        }
      ).then(function(response) {
        // Parse response as JSON
        return response.json();
      });
    },
    getEntry: function(context, data) {
      return Vue.http.get(
        context.state.api.entries + data.entry_id,
        {
          params: {
            access_token : context.state.api.access_token
          }
        }
      ).then(function(response) {
        // Parse response as JSON
        return response.json();
      });
    },
    getAsset: function(context, data) {
      return Vue.http.get(
        context.state.api.assets + data.asset_id,
        {
          params: {
            access_token : context.state.api.access_token
          }
        }
      ).then(function(response) {
        // Parse response as JSON
        return response.json();
      });
    }
  };

  // getters are functions
  var getters = {};

  // A Vuex instance is created by combining the state, mutations, actions,
  // and getters.
  return new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
  });

})(Vue, Vuex);
