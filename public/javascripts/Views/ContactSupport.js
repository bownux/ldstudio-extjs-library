(function() {
  Ext.define('Views.ContactSupport', {
    extend: 'Ext.window.Window',
    id: 'contact-support',
    title: 'Yamaha University Support',
    height: 200,
    width: 400,
    layout: 'fit',
    html: 'Hello'
  });
  
  
  
  window.YMU || (window.YMU = new Object());
  window.YMU.showContactSupportWindow = function(evt, el, o) {
    var contactSupport;
    contactSupport = Ext.create('Views.ContactSupport');
    Ext.create('Ext.window.Window', {
    title: 'Yamaha University Support',
    height: 200,
    width: 400,
    modal:true,
    layout: 'fit',
    /* items: {  // Let's put an empty grid in just to illustrate fit layout
        xtype: 'grid',
        border: false,
        columns: [{header: 'World'}],                 // One header just for show. There's no data,
        store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
    }*/
   html: 'Support Information'
  }).show();

  };
  Ext.onReady(function() {
    return Ext.get('contact-support').addListener('click', window.YMU.showContactSupportWindow);
  });
}).call(this);
