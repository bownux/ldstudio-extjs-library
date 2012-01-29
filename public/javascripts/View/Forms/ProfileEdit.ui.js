Ext.define('YMU.view.ui.ProfileEdit', {
    extend: 'Ext.panel.Panel',
	id:'profile-edit-panel',
    height: 847,
    margin: '',
    width: 640,
    padding: '0 0 0 20',
    title: 'Edit Account Profile',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            {
                xtype: 'container',
                id: 'part-1',
                padding: '0 0 0 25',
				margin: '10 0 10 0',
                items: [
                	{
                		xtype: 'textfield',
                		id: 'userName',
                		fieldLabel: 'User Name',
                		width: 350,
                        allowBlank: false,
                        blankText: 'Please enter a username.',
                        disabled: true
            		},
                    {
                        xtype: 'textfield',
                        id: 'password',
                        width: 350,
                        fieldLabel: 'Password',
                        allowBlank: true,
                        blankText: 'A password is required',
						listeners: {
						     'focus': function(){
								Ext.getCmp('confirm-password').enable();
						        //alert('you changed the text of this input field');
							 },
						     'change': function(){
								Ext.getCmp('confirm-password').markInvalid("To Change Passwords: Confirm both Fields.");
						        //alert('you changed the text of this input field');
							 }
						 },
                    },
                    {
                        xtype: 'textfield',
                        id: 'confirm-password',
                        width: 350,
                        fieldLabel: 'Confirm Password',
                        allowBlank: true,
                        blankText: 'Please re-enter your password.',
						disabled: true,
						listeners: {
						     'focus': function(){
								if ((Ext.getCmp('password').getValue()).length <= 0){
									this.unsetActiveError();
								}else{
									this.markInvalid("To Change Passwords: Confirm both Fields.");
								};
							 },
						     'blur': function(){
								if ((Ext.getCmp('password').getValue()).length <= 0){
									this.unsetActiveError();
								}else if (Ext.getCmp('password').getValue() == this.getValue()){
									this.unsetActiveError();
								}else{
									this.markInvalid("To Change Passwords: Confirm both Fields.");
								};
							 },
						     'change': function(){
							 }
						 },
                    },
					]
				},
            	{
            		xtype: 'container',
            		id:'dealer',
            		height: 80,
            		width: 560,
            		margin: '10 0 10 25',
                    layout: {
                    	align: 'stretch',
                    	type: 'vbox'
                    },
                    items: [
                    	{
                    		xtype: 'container',
                    		id: 'validate-container',
                    		height: 30,
                    		layout: {
                    			align: 'stretch',
                    			type: 'hbox'
                    		},
                    		items: [
                    			{
                    				xtype: 'textfield',
                    				id: 'dealerNumber',
                    				fieldLabel: 'Dealer Number',
                    				width: 245,
                            		allowBlank: false,
                            		blankText: 'A Dealer Number is required.',
									disabled: true
                				},
                				{
                   	 				xtype: 'button',
                    				id: 'notifyDealer',
                    				margin: '-1 0 0 8',
                    				text: 'Notify Dealer Change',
                    				listeners: {
                    					click: {
                    						fn: me.contactForm
                    					}
                    				} 
                				}
                    		]
                    	},
                	    {
                    		xtype: 'label',
                    		margin: '5px 0 0 0',
                    		html: '(For dealer change requests, please click on Notify Dealer Change <br /> and select the Dealer Change drop down.)'
                		}
                	]
                },
                {
                    xtype: 'container',
                    id: 'part-2',
                    padding: '0 0 0 25',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'first-name',
                            width: 350,
                            fieldLabel: 'First Name',
                            allowBlank: false,
                            blankText: 'Your first name is required.',
							disabled: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'last-name',
                            width: 350,
                            fieldLabel: 'Last Name',
                            allowBlank: false,
                            blankText: 'Your last name is required.',
							disabled: true
                        },
                        {
                            xtype: 'textfield',
                            id: 'email',
                            vtype: 'email',
                            width: 350,
                            fieldLabel: 'E-mail',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            id: 'job-title',
                            width: 350,
                            fieldLabel: 'Job Title'
                        },
                        {
                            xtype: 'combobox',
                            width: 350,
                            fieldLabel: 'Preferred Language'
                        },
                        {
                            xtype: 'combobox',
                            width: 350,
                            fieldLabel: 'Time Zone'
                        },
                        {
                            xtype: 'textfield',
                            id: 'address-1',
                            width: 350,
                            fieldLabel: 'Address 1',
                            allowBlank: false,
                            blankText: 'Your address is required.'
                        },
                        {
                            xtype: 'textfield',
                            id: 'address-2',
                            width: 350,
                            fieldLabel: 'Address 2'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 120,
                    id: 'part-3',
                    padding: '0 25px 0 25px',
                    margin: '25px 0 25px 0',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                align: 'left',
                                type: 'hbox'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'City',
                                    labelPad: 0,
                                    labelWidth: 30,
                                    flex: 1,
                                    padding: '0 0 0 0'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'State',
                                    margin: '0 0 0 5px',
                                    labelWidth: 40,
                                    flex: 1,
                                    padding: '0 0 0 0'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Country',
                                    margin: '0 0 0 5px',
                                    labelWidth: 45,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zip Code',
                                    margin: '0 0 0 5px',
                                    labelWidth: 60,
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '10px 0 0 0',
                            height: 25,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Phone',
                                    labelPad: 0,
                                    labelWidth: 70,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Mobile',
                                    margin: '0 0 0 5px',
                                    labelWidth: 70,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Fax',
                                    margin: '0 0 0 5px',
                                    labelWidth: 70,
                                    flex: 1
                                }
                            ]
                        },
                        {
                        	
                            xtype: 'combobox',
                            margin: '10px 0 0 0',
                            store: me.shirtSizes,
                            emptyText: 'Select Shirt Size..',
                            queryMode: 'local',
                            displayField: 'size',
                            valueField: 'abbr',
                            width: 240,
                            fieldLabel: 'Shirt Size',
                            flex: 1
                        }
                    ]
                },
                
                {
                    xtype: 'container',
                    id: 'form-buttons',
                    margin: '0px auto 0px auto',
                    width: 200,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Submit',
                            margin: '0 10px 0 0'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            margin: '0 0px 0 10px'
                        }
                    ]
                },
                
                {
                    xtype: 'container',
                    margin: '0px auto 0px auto',
                    id: 'contact-support-footer',
                    padding:'100px 0 0 0',
                    width: 400,
                    html : '<div>If you need any help, Contact: <b><a href="javascript:window.YMU.showContactSupportWindow();">Yamaha University Support</a></b></div>'
                }
            ]
        });

        me.callParent(arguments);
    },
    
    contactForm: function(){
		YMU.Lib.Application.fireEvent('contactsupportrequested',this);
    },
    
    shirtSizes: Ext.create('Ext.data.Store',{
    	fields: ['abbr','size'],
    	data: [
    		{"abbr":"S", "size":"Small"},
    		{"abbr":"M", "size":"Meddium"},
    		{"abbr":"L", "size":"Large"},
    		{"abbr":"XL", "size":"X-Large"},
    		{"abbr":"XXL", "size":"XX-Large"}
    	]
    })
});

Ext.onReady(function() {
    var form = Ext.create('YMU.view.ui.ProfileEdit', {
        renderTo: Ext.Element.get('sign-up')
    });
});