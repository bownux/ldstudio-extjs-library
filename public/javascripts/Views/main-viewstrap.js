
  Ext.require(['Ext.layout.*', '*']);

  Ext.require('Players.YoutubePlayer');

  Ext.require('Containers.VContainer');

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
      var aggregatedStore, containers, footerContainer, newsUpdates, player, tabsList, videoContainer;
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
      videoContainer = Ext.create('Containers.HContainer', {
        id: 'videoContainer',
        items: [player, tabsList]
      });
      footerContainer = Ext.create('Containers.HContainer', {
        id: 'footerContainer',
        padding: '5 0 0 0',
        defaults: {
          bodyPadding: 10,
          style: {
            "text-align": 'center'
          }
        },
        layoutConfig: {
          pack: 'center',
          align: 'middle'
        },
        items: [
          {
            html: 'col 1',
            flex: 2
          }, {
            html: 'col 2',
            flex: 2
          }, {
            html: 'col 3',
            flex: 2
          }, {
            html: 'col 4',
            flex: 2
          }
        ]
      });
      return containers = Ext.create('Containers.VContainer', {
        id: 'mainContainer',
        items: [
          {
            html: 'panel 1',
            flex: 1,
            padding: '0 0 5 0'
          }, videoContainer, footerContainer
        ],
        renderTo: 'view-container'
      });
    });
  });
