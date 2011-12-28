# Controller
Ext.define 'YMU.Controller.ContactSupport'
	extend: 'Ext.app.Controller'

	refs: [
		ref: 'contactSupport'
		selector: 'contactsupportwindow'
	],
	
	views: ['YMU.View.Windows.ContactSupport']
	stores: ['YMU.Store.ContactSupportStore']

	init: ->
		# Listen for an application wide event
		this.application.on({
			contactsupportrequested: this.onContactSupportRequest
			scope: this
		})

	# When framework registers controller - view might not be ready
	onLaunch: ->
	
	#YMU.Lib.Application.fireEvent('contactsupportrequested',this)
	onContactSupportRequest: (evt)->
		console.log "onContactSupportRequest"
		console.log this.getContactSupport()
		this.getContactSupport().show()
