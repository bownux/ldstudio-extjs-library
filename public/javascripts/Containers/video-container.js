(function() {
  Ext.require(['Ext.layout.*', '*']);
  Ext.require('Players.YoutubePlayer');
  Ext.require('Containers.HContainer');
  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      Players: 'javascripts/Players',
      Containers: 'javascripts/Containers'
    }
  });
  Ext.Loader.setPath('Players', 'javascripts/Players');
  Ext.Loader.setPath('Containers', 'javascripts/Containers');
  Ext.onReady(function() {
    var store;
    Ext.EventManager.onWindowResize((function(w, h) {}));
    store = Ext.create('DataTabs.YoutubeStore');
    store.load();
    return store.on('load', function() {
      var aggregatedStore, containers, newsUpdates, player, tabsList;
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
      newsUpdates = videoListTpl.applyTemplate(aggregatedStore);
      tabsList = Ext.create('DataTabs.YoutubeVideoTabs', {
        height: 342
      });
      tabsList.applyNews(newsUpdates);
      player = Ext.create('Players.YoutubePlayer');
      return containers = Ext.create('Containers.HContainer', {
        height: 342,
        items: [player, tabsList],
        renderTo: 'video-container'
      });
    });
  });
}).call(this);
