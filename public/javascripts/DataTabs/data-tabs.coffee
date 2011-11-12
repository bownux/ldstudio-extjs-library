Ext.require ['Ext.tab.*','*']
Ext.require 'DataTabs.YoutubeStore'

Ext.Loader.setConfig({
        enabled : true
        paths: 
            DataTabs: 'javascripts/DataTabs'
    })
Ext.Loader.setPath 'DataTabs', 'javascripts/DataTabs'

Ext.onReady ->
    #title = Ext.regModel 'Title', fields: [{name:'title', mapping:'title.$t'}]

    tpl = new Ext.XTemplate(
        '<p>',
        '<tpl for=".">', 
            '<tpl for="media">', 
                '<p>img{#}: {thumbnailSmall1}</p>', 
                '<p><img src="{thumbnailSmall1}" style="padding-right:2px" /></p>',
            '</tpl>',
            '<tpl for="title">', 
                '<p>title{#}: {[this.getValueFromRaw(values)]}</p>', 
            '</tpl>',
            '<tpl for="content">',
                '<p>description{#}: {[this.getValueFromRaw(values)]}</p>'
            '</tpl>',
            '<br />',
        '</tpl>',
        '</p>',
        config:
            disableFormats: false
        getValueFromRaw: (value) ->
            return value.$t
    )
    
    store = Ext.create 'DataTabs.YoutubeStore'
    store.load()

    aggregatedStore = new Array()

    store.on('load', ->
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

        #console.log Ext.apply(store.data.items[0].data['feed'].entry[0],media:{test:'name'})
        newsUpdates = tpl.applyTemplate(aggregatedStore)
        #console.log newsUpdates
        
        tabs2 = Ext.createWidget 'tabpanel'
            renderTo: 'data-tabs'
            activeTab: 0
            width: 300
            height: 250
            plain: true
            defaults:
                autoScroll: true
                bodyPadding: 10
            items: [
                {
                title: 'NEWS & UPDATES'
                html: newsUpdates
                }
                {
                title: 'TRAINING'
                html: tpl.applyTemplate(store.data.items[0].data)
                #listeners:
                #    activate: (tab) ->
                #        tab.loader.load()
                }
            ]
        #console.log store.data.items[0].data
        #console.log tpl
    )

