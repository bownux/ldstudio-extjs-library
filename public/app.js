(function() {
  Ext.application({
    name: 'YMU',
    appFolder: 'app',
    launch: function() {
      return Ext.create('Ext.container.Viewport', {
        layout: fit,
        items: [
          {
            xtype: 'panel',
            title: 'Users',
            html: 'Stuff will go here.'
          }
        ]
      });
    }
  });
}).call(this);
