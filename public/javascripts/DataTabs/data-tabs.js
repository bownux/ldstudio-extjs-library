
  Ext.require(['Ext.tab.*', '*']);

  Ext.require('DataTabs.YoutubeStore');

  Ext.require('DataTabs.YoutubeVideoTabs');

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      DataTabs: 'javascripts/DataTabs'
    }
  });

  Ext.Loader.setPath('DataTabs', 'javascripts/DataTabs');

  Ext.onReady(function() {
    var store;
    window.changePlayerVideo = function(value, title) {
      var msg;
      if (title == null) title = 'YMU';
      msg = 'Video Player not Present id: ' + value;
      return alert(msg);
    };
    store = Ext.create('DataTabs.YoutubeStore');
    store.load();
    return store.on('load', function() {
      var aggregatedStore, tabs2;
      aggregatedStore = new Array();
      store.data.each(function(item, index, totalItems) {
        return Ext.each(item.data['feed'].entry, function(rec) {
          return aggregatedStore.push(Ext.apply(rec, {
            media: {
              thumbnailSmall1: rec.media$group.media$thumbnail[1].url
            }
          }));
        });
      });
      return tabs2 = Ext.create('DataTabs.YoutubeVideoTabs', {
        layout: 'fit',
        height: 142,
        renderTo: 'data-tabs'
      });
    });
  });
