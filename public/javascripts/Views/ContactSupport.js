(function() {
  Ext.define('Views.ContactSupport', {
    extend: 'Ext.window.Window',
    id: 'contact-support',
    width: 730,
    height: 600,
    title: 'Yamaha University Support',
    items: {
      xtype: 'container',
      id: 'contact-us',
      height: 60,
      width: 350,
      margin: '10 0 10 25',
      layout: {
        align: 'stretch',
        type: 'vbox'
      },
      items: []
    }
  });
}).call(this);
