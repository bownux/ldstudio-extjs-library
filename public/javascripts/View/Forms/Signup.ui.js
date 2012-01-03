Ext.define('YMU.view.ui.Signup', {
    extend: 'Ext.panel.Panel',
	id:'create-account-panel',
    height: 847,
    margin: '',
    width: 640,
    padding: '0 0 0 20',
    title: 'Create Account',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
            	{
            		xtype: 'container',
            		id:'signup-notice',
            		height: 80,
            		width: 540,
            		margin: '10 50 10 50',
                    layout: {
                    	align: 'stretch',
                    	type: 'vbox'
                    },
                    html:'To register in the YMU Learning Management System you will need to complete the form below. Please enter your dealer number and click &ldquo;Validate dealer&quot;. This will place you in the correct product group. Then complete the rest of the form and click &ldquo;create account&quot;. You will receive a  message stating that your account was successfully created and pending approval. Within 24-48hrs you will receive a confirmation email with log on instructions.'
            	},
            	{
            		xtype: 'container',
            		id:'dealer',
            		height: 60,
            		width: 350,
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
                            		blankText: 'A Dealer Number is required to sign up.'
                				},
                				{
                   	 				xtype: 'button',
                    				id: 'validateDealer',
                    				margin: '-1 0 0 8',
                    				text: 'Validate Dealer',
                    				listeners: {
                    					click: {
                    						fn: me.enableForm
                    					}
                    				} 
                				}
                    		]
                    	},
                	    {
                    		xtype: 'label',
                    		margin: '5px 0 0 0',
                    		text: '(Please enter your six digit dealer code: e.g. 123456)'
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
                    		id: 'userName',
                    		fieldLabel: 'User Name',
                    		width: 350,
                            allowBlank: false,
                            blankText: 'Please enter a username.',
                            disabled: false
                		},
                        {
                            xtype: 'textfield',
                            id: 'password',
                            width: 350,
                            fieldLabel: 'Password',
                            allowBlank: false,
                            blankText: 'A password is required'
                        },
                        {
                            xtype: 'textfield',
                            id: 'confirm-password',
                            width: 350,
                            fieldLabel: 'Confirm Password',
                            allowBlank: false,
                            blankText: 'Please re-enter your password.'
                            
                        },
                        {
                            xtype: 'textfield',
                            id: 'first-name',
                            width: 350,
                            fieldLabel: 'First Name',
                            allowBlank: false,
                            blankText: 'Your first name is required.'
                        },
                        {
                            xtype: 'textfield',
                            id: 'last-name',
                            width: 350,
                            fieldLabel: 'Last Name',
                            allowBlank: false,
                            blankText: 'Your last name is required.'
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
                            xtype: 'textfield',
                            id: 'email-confirm',
                            vtype: 'email',
                            width: 350,
                            fieldLabel: 'Confirm E-Mail',
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
                            text: 'Create Account',
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
    
    enableForm: function(){
    	alert("Simulate Dealer Validation");
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
    var form = Ext.create('YMU.view.ui.Signup', {
        renderTo: Ext.Element.get('sign-up')
    });
});