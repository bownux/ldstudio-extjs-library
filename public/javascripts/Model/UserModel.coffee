Ext.require ['*']

#UserModel 
Ext.define 'YMU.Model.UserModel',
    extend: 'Ext.data.Model'
    fields: [
        'username',
        'password',
    ]
