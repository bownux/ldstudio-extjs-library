# Controller
Ext.define 'YMU.Controller.Footer'
	extend: 'Ext.app.Controller'

	refs: [
		ref: 'footerPanel'
		selector: 'footerpanelcontent'
	],
	
	views: ['YMU.View.DataContent.FooterPanel']
	stores: ['YMU.Store.FooterStore']

	init: ->
		# Listen to the events on views
		this.control({
			'footerpanelcontent': {
				afterrender: this.onFooterViewRendered
			}
		})
		# Listen for an application wide event
		this.application.on({
			footercontentchange: this.onContentChange
			scope: this
		})

	# When framework registers controller - view might not be ready
	onLaunch: ->
		footerStore = this.getYMUStoreFooterStoreStore()
		footerStore.load(
			scope: this
		)
		# Fire an application wide event
		#this.application.fireEvent('footercontentchange', this)
	
	onFooterViewRendered: ->
		this.getFooterPanel().updateItems(this.getYMUStoreFooterStoreStore().data)

	onContentChange: (store)->
		# TODO: Change Content Dynamically or Poll Server
		#console.log "onContentChange"
