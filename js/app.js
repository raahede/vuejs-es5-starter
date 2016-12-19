(function() {
  var client = contentful.createClient({
    space: 'wpk17fsuxh8l',
    accessToken: '272b121abec98bcd8650d604bb626f2e1bb52ce70ba02906db3bab3319886f3f'
  });

  var Animations = {
    data: function() {
      return {
        transitionName: 'slide-left'
      };
    },
    methods: {
      beforeEnter: function (el) {
        if(this.transitionName === 'slide-left') {
          el.style.translateX = '100%';
        } else {
          el.style.translateX = '-100%';
        }
      },
      enter: function (el, done) {
        Velocity(el, { translateX: '0%' }, { duration: 300 }, { complete: done });
      },
      leave: function (el, done) {
        if(this.transitionName === 'slide-left') {
          Velocity(el, { translateX: '-100%' }, { duration: 300 }, { complete: done });
        } else {
          Velocity(el, { translateX: '100%' }, { duration: 300 }, { complete: done });
        }
      }
    },
    watch: {
      '$route': function(to, from) {
        var toDepth = to.meta.depth;
        var fromDepth = from.meta.depth;
        this.transitionName = to.meta.depth < from.meta.depth ? 'slide-right' : 'slide-left';
        console.log(to, from, this.transitionName);
      }
    }
  };

  var ContentTypes = {
    name: 'ContentTypes',
    template: '#my-content-types',
    mixins: [Animations],
    data: function() {
      return {
        contentTypes: null
      };
    },
    created: function() {
      var _self = this;
      client.getContentTypes().then(function (contentTypes) {
        _self.contentTypes = contentTypes;
      });
    }
  };

  var Entries = {
    name: 'Entries',
    template: '#my-entries',
    mixins: [Animations],
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
        client.getEntries({
          'content_type': _self.$route.params.contentType
        }).then(function (entries) {
          _self.entries = entries;
        });
      }
    },
    watch: {
      '$route' : 'getEntries'
    }
  };

  var Entry = {
    mixins: [Animations],
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
        client.getEntry(entryId).then(function (entry) {
          _self.entry = entry;

          _self.getEntryAssets(entry);
        });
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
        client.getAsset(entry.fields.photo.sys.id).then(function (photo) {
          _self.photo = photo;
        });
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
        client.getAsset(entry.fields.profilePhoto.sys.id).then(function (profilePhoto) {
          _self.profilePhoto = profilePhoto;
        });
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
        client.getAsset(entry.fields.coverImage.sys.id).then(function (coverImage) {
          _self.coverImage = coverImage;
        });
      }
    }
  });

  var router = new VueRouter({
    routes: [
      {
        path: '*',
        component: ContentTypes,
        name: 'contentTypes',
        meta: { depth: 1 }
        // children: [
        //   {
        //     path: '/:contentType',
        //     name: 'entries',
        //     component: Entries,
        //     meta: { depth: 2 },
        //     children: [
        //       {
        //         path: '/:contentType/image/:entryId',
        //         name: 'image',
        //         component: Image,
        //         meta: { depth: 3 }
        //       },
        //       {
        //         path: '/:contentType/author/:entryId',
        //         name: 'author',
        //         component: Author,
        //         meta: { depth: 3 }
        //       },
        //       {
        //         path: '/:contentType/gallery/:entryId',
        //         name: 'gallery',
        //         component: Gallery,
        //         meta: { depth: 3 }
        //       }
        //     ]
        //   }
        // ]
      },
      {
        path: '/:contentType',
        name: 'entries',
        component: Entries,
        meta: { depth: 2 }
      },
      {
        path: '/:contentType/image/:entryId',
        name: 'image',
        component: Image,
        meta: { depth: 3 }
      },
      {
        path: '/:contentType/author/:entryId',
        name: 'author',
        component: Author,
        meta: { depth: 3 }
      },
      {
        path: '/:contentType/gallery/:entryId',
        name: 'gallery',
        component: Gallery,
        meta: { depth: 3 }
      }
    ]
  });

  new Vue({
    el: '#app',
    mixins: [Animations],
    components: {
      'my-content-types': ContentTypes
    },
    router: router
  });
})();
