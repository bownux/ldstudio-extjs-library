(function() {

  Ext.require(['Ext.panel.*', '*']);

  Ext.require('Players.YoutubePlayer');

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      Players: 'javascripts/Players'
    }
  });

  Ext.Loader.setPath('Players', 'javascripts/Players');

  Ext.onReady(function() {
    var player;
    return player = Ext.create('Players.YoutubePlayer', {
      renderTo: 'player-panel'
    });
  });

}).call(this);
