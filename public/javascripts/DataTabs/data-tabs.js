
  Ext.require(['Ext.tab.*', '*']);

  Ext.require('DataTabs.YoutubeStore');

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      DataTabs: 'javascripts/DataTabs'
    }
  });

  Ext.Loader.setPath('DataTabs', 'javascripts/DataTabs');

  Ext.onReady(function() {
    var aggregatedStore, store, tpl;
    tpl = new Ext.XTemplate('<p>', '<tpl for=".">', '<tpl for="media">', '<p>img{#}: {thumbnailSmall1}</p>', '<p><img src="{thumbnailSmall1}" style="padding-right:2px" /></p>', '</tpl>', '<tpl for="title">', '<p>title{#}: {[this.getValueFromRaw(values)]}</p>', '</tpl>', '<tpl for="content">', '<p>description{#}: {[this.getValueFromRaw(values)]}</p>', '</tpl>', '<br />', '</tpl>', '</p>', {
      config: {
        disableFormats: false
      },
      getValueFromRaw: function(value) {
        return value.$t;
      }
    });
    store = Ext.create('DataTabs.YoutubeStore');
    store.load();
    aggregatedStore = new Array();
    return store.on('load', function() {
      var newsUpdates, tabs2;
      store.data.each(function(item, index, totalItems) {
        console.log(item.data['encoding']);
        console.log(item.data['feed'].entry);
        return Ext.each(item.data['feed'].entry, function(rec) {
          return aggregatedStore.push(Ext.apply(rec, {
            media: {
              thumbnailSmall1: rec.media$group.media$thumbnail[1].url
            }
          }));
        });
      });
      newsUpdates = tpl.applyTemplate(aggregatedStore);
      return tabs2 = Ext.createWidget('tabpanel', {
        renderTo: 'data-tabs',
        activeTab: 0,
        width: 300,
        height: 250,
        plain: true,
        defaults: {
          autoScroll: true,
          bodyPadding: 10
        },
        items: [
          {
            title: 'NEWS & UPDATES',
            html: newsUpdates
          }, {
            title: 'TRAINING',
            html: tpl.applyTemplate(store.data.items[0].data)
          }
        ]
      });
    });
  });
