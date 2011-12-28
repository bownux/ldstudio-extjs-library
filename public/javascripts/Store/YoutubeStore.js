
  Ext.require('YMU.Model.YoutubeModel');

  Ext.define('YMU.Store.YoutubeStore', {
    extend: 'Ext.data.Store',
    requires: ['YMU.Model.YoutubeModel'],
    model: 'YMU.Model.YoutubeModel',
    autoLoad: false,
    proxy: {
      type: 'jsonp',
      url: 'https://gdata.youtube.com/feeds/api/users/YMUniversityUSA/uploads?alt=json-in-script'
    },
    success: function(result, request) {},
    listeners: {
      load: function(store, records) {
        return Ext.each(records, function(rec) {});
      }
    }
  });
