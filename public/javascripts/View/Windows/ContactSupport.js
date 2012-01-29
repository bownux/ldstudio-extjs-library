(function() {
  var formPanel;

  formPanel = Ext.define('YMU.View.Windows.ContactSupportForm', {
    extend: 'Ext.form.FormPanel',
    itemId: 'formPanel',
    frame: true,
    height:345,
    layout: 'anchor',
    defaultType: 'textfield',
    defaults: {
      anchor: '-10',
      labelWidth: 65
    },
    initComponent: function() {
        var me = this;        
        Ext.applyIf(me, {
            items: [
      {
        xtype:'panel',
        id:'contact-info',
        width:350,
        html:"<div><h1>Contact Us</h1><br/><h2>Questions, Comments, Concerns?<h2>\
        <br/>Call our YMU Support Team 7:00AM - 4:30PM PST(M-F)<br><b>Toll Free: \
        (800) 854-4876 - Option 2</b><br/><br/></div>"
      },
      {
          xtype: 'combo',
          fieldLabel: 'Contact Us About',
          name: 'type',
          store: me.types,
          emptyText: 'Customer Service Questions',
          queryMode: 'local',
          displayField: 'txt',
          valueField: 'type'
      },
      {
        fieldLabel: 'Username',
        name: 'userName'
      }, {
        fieldLabel: 'Email',
        name: 'email'
      }, {
        fieldLabel: 'Subject',
        name: 'subject'
      }, {
        xtype: 'textarea',
        fieldLabel: 'Comment',
        name: 'comment'
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

        me.callParent(arguments);
    },
    types: Ext.create('Ext.data.Store',{
    	fields: ['type','txt'],
    	data: [
    		{"type":"01", "txt":"Reset password"},
    		{"type":"02", "txt":"New user"},
    		{"type":"03", "txt":"Completion information"},
    		{"type":"04", "txt":"Registration"},
    		{"type":"05", "txt":"Moved to different dealer"}
    	]
    })
  });

  Ext.define('YMU.View.Windows.ContactSupport', {
    extend: 'Ext.Window',
    alias: 'widget.contactsupportwindow',
    initComponent: function() {
      var me;
      me = this;
      Ext.applyIf(me, {
        title: 'Yamaha University Support',
        width:640 
      }, {
        modal: true,
        plain: true,
        headerPosition: 'top',
        layout: 'fit',
        closeAction: 'hide',
        items: []
      });
      return me.callParent();
    }
  });

}).call(this);
