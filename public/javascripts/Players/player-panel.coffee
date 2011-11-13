Ext.require ['Ext.panel.*','*']
Ext.require 'Players.YoutubePlayer'

Ext.Loader.setConfig({
        enabled : true
        paths: 
            Players: 'javascripts/Players'
    })
Ext.Loader.setPath 'Players', 'javascripts/Players'

window.changePlayerVideo = (value,title = 'YMU') ->
    console.log 'changing video: ' + value
    console.log Ext.getCmp('YoutubePlayer')
    Ext.getCmp('YoutubePlayer').changeVideo value, title

Ext.onReady ->
    player = Ext.create 'Players.YoutubePlayer',
        { renderTo: 'player-panel' }
