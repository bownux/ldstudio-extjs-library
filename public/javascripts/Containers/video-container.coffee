Ext.require ['Ext.layout.*','*']
Ext.require 'Players.YoutubePlayer'
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
                console.log item.data['encoding']
                #console.log item.data['feed']
                console.log item.data['feed'].entry
                #console.log item.data['feed'].entry[1].media$group.media$thumbnail[1].url
                Ext.each(item.data['feed'].entry, (rec) ->
                    #console.log 'rec: ' + rec.media$group.media$thumbnail[1].url
                    aggregatedStore.push Ext.apply(rec,media:{thumbnailSmall1:rec.media$group.media$thumbnail[1].url})
                )
        )
        newsUpdates = videoListTpl.applyTemplate(aggregatedStore)
        tabsList = Ext.create 'DataTabs.YoutubeVideoTabs'
        tabsList.applyNews(newsUpdates)
    
        # Player
        player = Ext.create 'Players.YoutubePlayer'

        # Container
        containers = Ext.create 'Containers.HContainer',
            { 
                items: [
                    player,
                    tabsList
                ],
                renderTo: 'video-container' 
            }
    )
