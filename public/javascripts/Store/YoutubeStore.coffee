Ext.require 'YMU.Model.YoutubeModel'

#DataStore
Ext.define 'YMU.Store.YoutubeStore',
    extend: 'Ext.data.Store',
    requires: ['YMU.Model.YoutubeModel']
    model: 'YMU.Model.YoutubeModel'
    autoLoad: false
    proxy:
        type: 'jsonp'
        url: 'https://gdata.youtube.com/feeds/api/users/YMUniversityUSA/uploads?alt=json-in-script'
    success: (result,request) ->
        #console.log result
    listeners:
        load: (store, records) ->
            Ext.each(records, (rec) ->
               #console.log rec.get('version')
            )
            
