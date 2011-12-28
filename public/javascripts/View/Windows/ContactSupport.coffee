# YMU Contact Form Container
Ext.define 'YMU.View.Windows.ContactSupport',
	extend: 'Ext.Window',
	alias: 'widget.contactsupportwindow',
	
	initComponent: ->
		me = this;
		Ext.applyIf(me, 
		    title: 'Yamaha University Support',
		    width: 640,
		    height: 480,
			modal: true,
			plain: true,
			headerPosition: 'top',
			layout: 'fit',
			items: {
				border: false
			}
		)
		me.callParent()
		