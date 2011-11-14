Ext.require ['Ext.tab.*','*']
Ext.require 'DataTabs.YoutubeStore'

Ext.Loader.setConfig({
        enabled : true
        paths: 
            DataTabs: 'javascripts/DataTabs'
    })
Ext.Loader.setPath 'DataTabs', 'javascripts/DataTabs'

Ext.onReady ->
    # Dummy Video Changer
    window.changePlayerVideo = (value,title = 'YMU') ->
        console.log 'changing video: ' + value
        msg='Video Player not Present id: ' + value
        alert(msg)

        
    # DataStore Load and TabPanel Init
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
        tabs2 = Ext.create 'DataTabs.YoutubeVideoTabs',
            { renderTo: 'data-tabs' }
        tabs2.applyNews(newsUpdates)
    )

