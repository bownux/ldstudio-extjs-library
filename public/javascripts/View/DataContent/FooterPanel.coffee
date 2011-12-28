# Generic YMU Footer Data Panel
Ext.define 'YMU.View.DataContent.FooterPanel',
	extend: 'Ext.panel.Panel',
	alias: 'widget.footerpanelcontent',

	initComponent: ->
		me = this;
		Ext.applyIf(me, 
			this.dockedItems = [
				id: 'footerContainer'
				padding:'5'
				right:'5'
				defaults:
					flex: 2
					height: 215
					bodyPadding: 10
					style:
						"text-align": 'left'
						"left": '0px'
				layoutConfig:
					align: 'middle'
				layout: 
					type: 'hbox',
					pack: 'start',
				items: []
			]
		)
		me.callParent()
		
	updateItems: (store)->
		this.removeAll(false)
		store.each (record)=>
			# Hack since seems to be attaching to extended component
			border = if store.indexOf(record) isnt (store.length - 1) then 2 else 0 
			this.getDockedComponent('footerContainer').add(
					{
						xtype: 'panel',
						id: 'col'+record.data.id,
						style:
							"border-right": 'solid ' + border + 'px #03529D'
						width: 200,
						height: 215,
						itemId: 'footerdescription'+record.data.id,
						tpl: "<div class='ymu-footer-col col{id}'>
								<div class='ymu-footer-col-title'>{title}</div>
								<div class='ymu-footer-col-desc'>{description}</div>
							  </div>"
					}
			)
			this.down('#footerdescription'+record.data.id).update(record.data)
		this.doLayout()
