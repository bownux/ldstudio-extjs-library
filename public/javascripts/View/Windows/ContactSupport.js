(function() {
  var formPanel;

  formPanel = Ext.create('Ext.form.FormPanel', {
    itemId: 'formPanel',
    frame: true,
    layout: 'anchor',
    defaultType: 'textfield',
    defaults: {
      anchor: '-10',
      labelWidth: 65
    },
    items: [
      {
        fieldLabel: 'First Name',
        name: 'firstName'
      }, {
        fieldLabel: 'Last Name',
        name: 'lastName'
      }
    ],
    buttons: [
      {
        text: 'Submit',
        handler: function() {
          return Ext.Msg.alert('Hello');
        }
      }
    ]
  });

  Ext.define('YMU.View.Windows.ContactSupport', {
    extend: 'Ext.Window',
    alias: 'widget.contactsupportwindow',
    initComponent: function() {
      var me;
      me = this;
      Ext.applyIf(me, {
        title: 'Yamaha University Support',
        width: 640,
        height: 480
      }, {
        modal: true,
        plain: true,
        headerPosition: 'top',
        layout: 'fit',
        items: formPanel
      });
      return me.callParent();
    }
  });

}).call(this);
