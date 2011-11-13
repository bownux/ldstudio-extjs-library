
  Ext.require(['Ext.panel.*', '*']);

  Ext.require('Players.YoutubePlayer');

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      Players: 'javascripts/Players'
    }
  });

  Ext.Loader.setPath('Players', 'javascripts/Players');

  window.changePlayerVideo = function(value, title) {
    if (title == null) title = 'YMU';
    console.log('changing video: ' + value);
    console.log(Ext.getCmp('YoutubePlayer'));
    return Ext.getCmp('YoutubePlayer').changeVideo(value, title);
  };

  Ext.onReady(function() {
    var player;
    return player = Ext.create('Players.YoutubePlayer', {
      renderTo: 'player-panel'
    });
  });
