# YMU Contact Form Container
formPanel = Ext.define 'YMU.View.Windows.ContactSupport.Form',
	extend: 'Ext.form.FormPanel',
	itemId: 'formPanel'
	frame: true
	layout: 'anchor'
	defaultType: 'textfield'
	defaults:
		anchor: '-10'
		labelWidth: 65
	items:[
		{
			fieldLabel: 'First Name'
			name: 'firstName'
		},
		{
			fieldLabel: 'Last Name'
			name: 'lastName'
		}
	]
	
	buttons:[
		text: 'Submit'
		handler: ->
			Ext.Msg.alert 'Hello'
		]
	
		

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
			items: []
		)
		me.callParent()
		