Ext.require ['Ext.tab.*', 'Ext.XTemplate.*','*']

window.videoListTpl = new Ext.XTemplate(
        '<div>',
        '<div class=\'video-item\'>',
        '<tpl for=".">', 
            '<tpl for="media">', 
                '<div class =\'video-img\'><a onclick="changePlayerVideo(\'{[this.getVideoID(values)]}\',\'{[escape(this.getValueFromRaw(parent.title))]}\',\'{[escape(this.getValueFromRaw(parent.content))]}\')", href="javascript:void(0);"><img src="{thumbnailSmall1}" style="padding-right:2px" /></a></div>',
            '</tpl>',
            '<tpl for="title">', 
                '<div class=\'video-title\'>{[this.getValueFromRaw(values)]}</div><div class="x-clear"></div>', 
            '</tpl>',
            '<tpl for="content">',
                '<!-- <div class=\'video-content\'>{[this.getValueFromRaw(values)]}</div> -->'
            '</tpl>',
            '<br />',
        '</tpl>',
        '</div>',
        '</div>',
        config:
            disableFormats: false
        getValueFromRaw: (value) ->
            #console.log value
            return unescape(value.$t)
        getVideoID: (value) ->
            str=value.thumbnailSmall1
            reID=/\S+\/vi\/(\S+)\//
            res=str.match(reID)
            if res
                #console.log res[1]
                return res[1]
            else
                return 'D3ybnmNX91I'
    )

newsTab = Ext.create 'Ext.Panel'
    id: 'news'
    title: 'Videos'
    autoScroll: false
    defaults:
        border: 0
    items: [
        {
            xtype: 'panel'
            autoScroll: true
            height: 230
            html: '<p>Videos</p>'
        },
        {
            xtype: 'panel'
            height: 120
            html: '<p>Description</p>'
            padding: '5 0 0 0'
        }
    ]
    applyDescription: (content) ->
        this.items.items[1].update(content) #hacky

Ext.define 'YMU.View.DataTabs.YoutubeVideoTabs'
            extend: 'Ext.TabPanel'
            activeTab: 0
            autoWidth: true
            autoHeight: true
            plain: true
            myNews: ''
            layout: 'fit'
            defaults:
                autoScroll: true
                bodyPadding: 10
            items: [
                newsTab,
            ]
            applyNews: (content) ->
                newsTab.items.items[0].update(content) #hacky
                
