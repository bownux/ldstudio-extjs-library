Ext.require ['Ext.tab.*','*']

window.videoListTpl = new Ext.XTemplate(
        '<div>',
        '<div class=\'video-item\'>',
        '<tpl for=".">', 
            '<tpl for="media">', 
                '<div class =\'video-img\'><a onclick="changePlayerVideo(\'{[this.getVideoID(values)]}\')", href="javascript:void(0);"><img src="{thumbnailSmall1}" style="padding-right:2px" /></a></div>',
            '</tpl>',
            '<tpl for="title">', 
                '<div class=\'video-title\'>{[this.getValueFromRaw(values)]}</div><div class="x-clear"></div>', 
            '</tpl>',
            '<tpl for="content">',
                '<div class=\'video-content\'>{[this.getValueFromRaw(values)]}</div>'
            '</tpl>',
            '<br />',
        '</tpl>',
        '</div>',
        '</div>',
        config:
            disableFormats: false
        getValueFromRaw: (value) ->
            return value.$t
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
    title: 'NEWS & UPDATES'
    html: '<p>NEWS TAB</p>'

Ext.define 'DataTabs.YoutubeVideoTabs'
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
                {
                    id: 'training'
                    title: 'TRAINING'
                    html: '<p>TRAINING TAB</p>'
                }
            ]
            applyNews: (content) ->
                newsTab.update(content)
