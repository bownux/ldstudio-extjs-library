(function() {

  Ext.require(['*']);

  Ext.define('YMU.Model.YoutubeModel', {
    extend: 'Ext.data.Model',
    fields: ['version', 'encoding', 'feed']
  });

}).call(this);
