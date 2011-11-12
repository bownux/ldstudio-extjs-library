
  Ext.require(['*']);

  Ext.define('DataTabs.YoutubeModel', {
    extend: 'Ext.data.Model',
    fields: ['version', 'encoding', 'feed']
  });

  Ext.define('DataTabs.YoutubeStore', {
    extend: 'Ext.data.Store',
    requires: ['DataTabs.YoutubeModel'],
    model: 'DataTabs.YoutubeModel',
    autoLoad: false,
    proxy: {
      type: 'jsonp',
      url: 'https://gdata.youtube.com/feeds/api/users/YMUniversityUSA/uploads?alt=json-in-script'
    },
    success: function(result, request) {
      return console.log(result);
    },
    listeners: {
      load: function(store, records) {
        return Ext.each(records, function(rec) {
          return console.log(rec.get('version'));
        });
      }
    }
  });
