(function() {

  Ext.define('YMU.View.Forms.LoginPanel', {
    extend: 'Ext.panel.Panel',
    id: 'login-panel',
    height: 320,
    width: 280,
    border: 'none',
    initComponent: function() {
      var me;
      me = this;
      Ext.applyIf(me, {
        items: [
          {
            xtype: 'label',
            text: 'Login'
          }, {
            id: 'formFields',
            xtype: 'fieldset',
            border: 'none',
            height: 320,
            width: 280,
            items: [
              {
                xtype: 'textfield',
                fieldLabel: 'Username',
                anchor: '100%',
                border: 'none'
              }, {
                xtype: 'textfield',
                fieldLabel: 'Password',
                anchor: '100%'
              }, {
                xtype: 'container',
                anchor: '100%',
                items: [
                  {
                    xtype: 'label',
                    margin: 10,
                    html: '<a href=\'#\'>not registered?</a>'
                  }, {
                    xtype: 'label',
                    margin: 5,
                    html: '<a href=\'#\'>forgot password?</a>'
                  }
                ]
              }, {
                id: 'loginButton',
                xtype: 'button',
                text: 'Login',
                margin: '20 0 0 210'
              }
            ]
          }
        ]
      });
      return me.callParent(arguments);
    }
  });

}).call(this);
