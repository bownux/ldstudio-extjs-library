Ext.define('MyApp.view.ui.MyPanel', {
    extend: 'Ext.panel.Panel',

    height: 847,
    margin: '',
    width: 687,
    title: 'Create Account',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    id: 'dealerNumber',
                    fieldLabel: 'Dealer Number'
                },
                {
                    xtype: 'label',
                    text: '(Please enter your six digit dealer code: e.g. 123456)'
                },
                {
                    xtype: 'button',
                    id: 'validateDealer',
                    margin: '-50 0 0 0',
                    text: 'Validate Dealer'
                },
                {
                    xtype: 'textfield',
                    id: 'userName',
                    fieldLabel: 'User Name'
                },
                {
                    xtype: 'panel',
                    margin: '-60 0 0 400 ',
                    width: 250,
                    title: 'Login',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'User Name'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Password'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'container',
                            height: 30,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    height: 12,
                                    text: 'Login',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    text: 'Forgot',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'part-2',
                    padding: '25 0 0 25',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'password',
                            width: 350,
                            fieldLabel: 'Password'
                        },
                        {
                            xtype: 'textfield',
                            id: 'confirm-password',
                            width: 350,
                            fieldLabel: 'Confirm Password'
                        },
                        {
                            xtype: 'textfield',
                            id: 'first-name',
                            width: 350,
                            fieldLabel: 'First Name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'last-name',
                            width: 350,
                            fieldLabel: 'Last Name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'email',
                            width: 350,
                            fieldLabel: 'E-mail'
                        },
                        {
                            xtype: 'textfield',
                            id: 'email-confirm',
                            width: 350,
                            fieldLabel: 'Confirm E-Mail'
                        },
                        {
                            xtype: 'textfield',
                            id: 'job-title',
                            width: 350,
                            fieldLabel: 'Job Title'
                        },
                        {
                            xtype: 'textfield',
                            width: 350,
                            fieldLabel: 'Preferred Language'
                        },
                        {
                            xtype: 'textfield',
                            id: 'address-1',
                            width: 350,
                            fieldLabel: 'Address 1'
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
                    height: 100,
                    id: 'part-3',
                    layout: {
                        align: 'stretch',
                        padding: '10 25 25 25',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 25,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'City',
                                    labelPad: 0,
                                    labelWidth: 70,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'State',
                                    labelWidth: 70,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Country',
                                    labelWidth: 70,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zip Code',
                                    labelWidth: 70,
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
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
                                    labelWidth: 70,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Fax',
                                    labelWidth: 70,
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            width: 200,
                            fieldLabel: 'Shirt Size',
                            flex: 1
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.onReady(function() {
    var form = Ext.create('MyApp.view.ui.MyPanel', {
        renderTo: Ext.Element.get('sign-up')
    });
    console.log(form);
});
