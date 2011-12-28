
  Ext.define('YMU.Controller.ContactSupport', {
    extend: 'Ext.app.Controller',
    refs: [
      {
        ref: 'contactSupport',
        selector: 'contactsupportwindow'
      }
    ],
    views: ['YMU.View.Windows.ContactSupport'],
    stores: ['YMU.Store.ContactSupportStore'],
    init: function() {
      return this.application.on({
        contactsupportrequested: this.onContactSupportRequest,
        scope: this
      });
    },
    onLaunch: function() {},
    onContactSupportRequest: function(evt) {
      console.log("onContactSupportRequest");
      console.log(this.getContactSupport());
      return this.getContactSupport().show();
    }
  });
