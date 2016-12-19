(function() {
  var ContentTypes = {
    name: 'ContentTypes',
    template: '#my-content-types',
    data: function() {
      return {
        contentTypes: null
      };
    },
    created: function() {
      var _self = this;
      this.$store.dispatch('getContentTypes').then(function(data) {
        _self.contentTypes = data;
      });
    }
  };

  var Entries = {
    name: 'Entries',
    template: '#my-entries',
    data: function() {
      return {
        entries: null
      };
    },
    computed: {
      contentTypeName: function() {
        var type;
        switch(this.$route.params.contentType) {
          case '1xYw5JsIecuGE68mmGMg20':
            type = 'image';
            break;
          case '38nK0gXXIccQ2IEosyAg6C':
            type = 'author';
            break;
          case '7leLzv8hW06amGmke86y8G':
            type = 'gallery';
            break;
        }
        return type;
      }
    },
    created: function() {
      this.getEntries();
    },
    methods: {
      getEntries: function() {
        var _self = this;
        this.$store.dispatch('getEntries', {
          content_type: _self.$route.params.contentType
        }).then(function(data) {
          _self.entries = data;
        });
      }
    },
    watch: {
      '$route' : 'getEntries'
    }
  };

  var Entry = {
    data: function() {
      return {
        entry: null,
        image: null
      };
    },
    created: function() {
      this.getEntry();
    },
    methods: {
      getEntry: function() {
        var _self = this;
        var entryId = (typeof(this.entryId) !== 'undefined') ? this.entryId : _self.$route.params.entryId;
        this.$store.dispatch('getEntry', {
          entry_id: entryId
        }).then(function(data) {
          _self.entry = data;
          _self.getEntryAssets(data);
        });
        // client.getEntry(entryId).then(function (entry) {
        //   _self.entry = entry;

        //   _self.getEntryAssets(entry);
        // });
      },
      getEntryAssets: function(entry) {}
    },
    watch: {
      '$route' : 'getEntry'
    }
  };

  var Image = Vue.extend({
    name: 'Image',
    template: '#my-image',
    props: ['entryId'],
    mixins: [Entry],
    data: function() {
      return {
        photo: null
      };
    },
    methods: {
      getEntryAssets: function(entry) {
        var _self = this;
        // Reset photo
        this.photo = null;

        this.$store.dispatch('getAsset', {
          asset_id: entry.fields.photo.sys.id
        }).then(function(data) {
          _self.photo = data;
        });
        // client.getAsset(entry.fields.photo.sys.id).then(function (photo) {
        //   _self.photo = photo;
        // });
      }
    }
  });

  var Author = Vue.extend({
    name: 'Author',
    template: '#my-author',
    mixins: [Entry],
    data: function() {
      return {
        profilePhoto: null
      };
    },
    methods: {
      getEntryAssets: function(entry) {
        var _self = this;
        // Reset profilePhoto
        this.profilePhoto = null;

        this.$store.dispatch('getAsset', {
          asset_id: entry.fields.profilePhoto.sys.id
        }).then(function(data) {
          _self.profilePhoto = data;
        });

        // client.getAsset(entry.fields.profilePhoto.sys.id).then(function (profilePhoto) {
        //   _self.profilePhoto = profilePhoto;
        // });
      }
    }
  });

  var Gallery = Vue.extend({
    name: 'Gallery',
    template: '#my-gallery',
    mixins: [Entry],
    components: {
      'my-image': Image
    },
    data: function() {
      return {
        coverImage: null
      };
    },
    methods: {
      getEntryAssets: function(entry) {
        var _self = this;
        // Reset coverImage
        this.coverImage = null;

        this.$store.dispatch('getAsset', {
          asset_id: entry.fields.coverImage.sys.id
        }).then(function(data) {
          _self.coverImage = data;
        });

        // client.getAsset(entry.fields.coverImage.sys.id).then(function (coverImage) {
        //   _self.coverImage = coverImage;
        // });
      }
    }
  });

  var router = new VueRouter({
    routes: [
      {
        path: '*',
        component: ContentTypes,
        name: 'contentTypes',
        children: [
          {
            path: '/:contentType',
            name: 'entries',
            component: Entries,
            children: [
              {
                path: '/:contentType/image/:entryId',
                name: 'image',
                component: Image
              },
              {
                path: '/:contentType/author/:entryId',
                name: 'author',
                component: Author
              },
              {
                path: '/:contentType/gallery/:entryId',
                name: 'gallery',
                component: Gallery
              }
            ]
          }
        ]
      }
    ]
  });

  new Vue({
    el: '#app',
    store: store,
    components: {
      'my-content-types': ContentTypes
    },
    router: router
  });
})();
