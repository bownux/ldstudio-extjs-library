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
    return contactSupport.show();
  };
  Ext.onReady(function() {
    return Ext.get('contact-support').addListener('click', window.YMU.showContactSupportWindow);
  });
}).call(this);
