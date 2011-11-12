Ext.require ['*']

#DataModel 
Ext.define 'DataTabs.YoutubeModel',
    extend: 'Ext.data.Model'
    fields: [
        'version',
        'encoding',
        'feed',
    ]
#DataStore
Ext.define 'DataTabs.YoutubeStore',
    extend: 'Ext.data.Store',
    requires: ['DataTabs.YoutubeModel']
    model: 'DataTabs.YoutubeModel'
    autoLoad: false
    proxy:
        type: 'jsonp'
        url: 'https://gdata.youtube.com/feeds/api/users/YMUniversityUSA/uploads?alt=json-in-script'
    success: (result,request) ->
        console.log result
    listeners:
        load: (store, records) ->
            Ext.each(records, (rec) ->
                console.log rec.get('version')
            )
            
