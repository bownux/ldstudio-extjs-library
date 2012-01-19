(function() {

  Ext.define('YMU.View.Forms.LoginPanel', {
    extend: 'Ext.form.Panel',
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
                name: 'username',
                anchor: '100%',
                border: 'none',
				listeners : {
					specialkey : {
						fn : this.handleEnter,
						scope : this
					}
				}
              }, {
                xtype: 'textfield',
                fieldLabel: 'Password',
                inputType: 'password',
                name: 'password',
                anchor: '100%',
				listeners : {
					specialkey : {
						fn : this.handleEnter,
						scope : this
					}
				}
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
      me.callParent(arguments);
    },
	handleEnter : function(field, e) {
		if (e.getKey() == e.ENTER) {
			e.stopEvent();
			this.getComponent("formFields").getComponent("loginButton").fireEvent("click");
		}
	}
  });

}).call(this);
