Ext.require 'YMU.Model.ContactSupportModel'

#DataStore
Ext.define 'YMU.Store.ContactSupportStore',
	extend: 'Ext.data.Store',
	requires: ['YMU.Model.ContactSupportModel']
	model: 'YMU.Model.ContactSupportModel'
