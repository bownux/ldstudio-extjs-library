Ext.require ['Ext.layout.*','*']
Ext.require 'Players.YoutubePlayer'
Ext.require 'Containers.VContainer'
Ext.require 'Containers.HContainer'

Ext.Loader.setConfig({
        enabled : true
        paths: 
            Players: 'javascripts/Players'
            Containers: 'javascripts/Containers'
    })
Ext.Loader.setPath 'Players', 'javascripts/Players'
Ext.Loader.setPath 'Containers', 'javascripts/Containers'

Ext.onReady ->
    # Container Resizing Event
    Ext.EventManager.onWindowResize (
        (w, h) ->
            #Ext.getCmp("hContainer").setWidth(w-100)
    )

    # Data Store wait on Load
    store = Ext.create 'DataTabs.YoutubeStore'
    store.load()
    store.on('load', ->
        aggregatedStore = new Array()
        store.data.each(
            (item, index, totalItems) ->
                #console.log item.data['feed'].entry[1].media$group.media$thumbnail[1].url
                Ext.each(item.data['feed'].entry, (rec) ->
                    #console.log 'rec: ' + rec.media$group.media$thumbnail[1].url
                    aggregatedStore.push Ext.apply(rec,media:{thumbnailSmall1:rec.media$group.media$thumbnail[1].url})
                )
        )
        newsUpdates = videoListTpl.applyTemplate(aggregatedStore)
        tabsList = Ext.create 'DataTabs.YoutubeVideoTabs', {height:342}
        tabsList.applyNews(newsUpdates)
    
        # Player
        player = Ext.create 'Players.YoutubePlayer'

        #
        # Container Elements
        #
        
        # Video Container
        videoContainer = Ext.create 'Containers.HContainer',
        { 
              id: 'videoContainer',
              items: [
                  player,
                  tabsList
              ],
        }

        # Footer Container
        footerContainer = Ext.create 'Containers.HContainer',
        { 
              id: 'footerContainer'
              padding:'5 0 0 0'
              defaults:
                  bodyPadding: 10
                  style:
                    "text-align": 'center'
              layoutConfig:
                  pack: 'center'
                  align: 'middle'
              items: [
                  {html:'col 1', flex:2},
                  {html:'col 2', flex:2},
                  {html:'col 3', flex:2},
                  {html:'col 4', flex:2}
              ],
        }

        # Main Viewstrap Container
        containers = Ext.create 'Containers.VContainer',
        { 
              id: 'mainContainer',
              items: [
                  {html:'panel 1', flex:1, padding:'0 0 5 0'},
                  videoContainer,
                  footerContainer
              ],
              renderTo: 'view-container' 
        }
    )
