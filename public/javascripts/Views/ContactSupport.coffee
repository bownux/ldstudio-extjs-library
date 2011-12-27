# YMU Contact Form Container
Ext.define 'Views.ContactSupport',
    extend: 'Ext.window.Window',
    id: 'contact-support',
    title: 'Yamaha University Support'
    height: 200,
    width: 400,
    layout: 'fit',
    html: 'Hello'
      
window.YMU || window.YMU = new Object()
window.YMU.showContactSupportWindow = (evt,el,o) ->
  contactSupport = Ext.create 'Views.ContactSupport'
  contactSupport.show()
  
Ext.onReady ->
  Ext.get('contact-support').addListener 'click', window.YMU.showContactSupportWindow