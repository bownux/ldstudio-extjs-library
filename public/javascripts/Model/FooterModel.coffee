#DataModel 
Ext.define 'YMU.Model.FooterModel',
	extend: 'Ext.data.Model'
	fields: ['id', 'title', 'description']

	proxy:
		type: 'ajax'
		url: 'footer.json'
		reader:
			type: 'json'
			root: 'results'
	