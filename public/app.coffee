Ext.require ['Ext.layout.*','*'] # TODO: Require Useful Only
# M V C Paths Configuration
Ext.Loader.setConfig({
        enabled : true
        paths: 
            YMU: 'javascripts'
            View: 'javascripts/View'
            Model: 'javascripts/Model'
            Controller: 'javascripts/Controller'
			Store: 'javascripts/Store'
    })
Ext.Loader.setPath 'YMU', 'javascripts'
Ext.Loader.setPath 'View', 'javascripts/View'
Ext.Loader.setPath 'Model', 'javascripts/Model'
Ext.Loader.setPath 'Controller', 'javascripts/Controller'
Ext.Loader.setPath 'Store', 'javascripts/Store'
Ext.Loader.setPath 'Players', 'javascripts/View/Players'
Ext.Loader.setPath 'Containers', 'javascripts/View/Containers'
Ext.Loader.setPath 'Forms', 'javascripts/View/Forms'
Ext.Loader.setPath 'Sliders', 'javascripts/View/Sliders'
Ext.Loader.setPath 'DataTabs', 'javascripts/View/DataTabs'
Ext.Loader.setPath 'Windows', 'javascripts/View/Windows'
# Pre-load Required Components before Application Loads
Ext.require 'YMU.Model.YoutubeModel'
Ext.require 'YMU.Model.UserModel'
#Ext.require 'YMU.Model.FooterModel'
Ext.require 'YMU.Store.YoutubeStore'
#Ext.require 'YMU.Store.FooterStore'
Ext.require 'YMU.View.Containers.VContainer'
Ext.require 'YMU.View.Containers.HContainer'
Ext.require 'YMU.View.DataTabs.DashboardTabs'
Ext.require 'YMU.View.DataTabs.YoutubeVideoTabs'
Ext.require 'YMU.View.DataContent.FooterPanel'
Ext.require 'YMU.View.Forms.LoginPanel'
Ext.require 'YMU.View.Players.YoutubePlayer'
#Ext.require 'YMU.View.Sliders.SliderPanel'
Ext.require 'YMU.View.Windows.ContactSupport'
#Ext.require 'YMU.Controller.Footer'

# YMU Application Accessor Lib
# TODO: Might want to Move this to it's own file.
# TODO: Extend to provide other services or global methods.
Ext.define 'YMU.Lib',  
    singleton: true, 
    Application: null, 
class App
	constructor: ()->
		@app
		this.fireEvent = (evt,opts) ->
			@app.fireEvent(evt,opts)
		this.setApp = (a) ->
			@app = a

# YMU Application Root
Ext.application 
	name: 'YMU',
	appFolder: 'javascripts',
	autoCreateViewport: false,
	views: ['YMU.View.Windows.ContactSupport','YMU.View.DataContent.FooterPanel'],
	models: ['YMU.Model.ContactSupportModel','YMU.Model.FooterModel'],
	stores: ['YMU.Store.ContactSupportStore','YMU.Store.FooterStore'],
	controllers: ['YMU.Controller.ContactSupport','YMU.Controller.Footer'],
	
	launch: ->
		console.log 'YMU Application Launched'
		# Set Ext Application to YMU Lib and Extend
		YMU.Lib.Application = new App()
		YMU.Lib.Application.setApp(this)
		### - Do we really want a Viewport here? Maybe we want to create
		- and render the element here instead? http://goo.gl/sTbfq, currently
		- creating items based on MVC Architecture from Sencha ExtJS 4.
		Ext.create 'Ext.container.Viewport',
			layout: 'fit' ,
			items: [
				xtype: 'panel',
				title: 'Users',
				html: 'Stuff will go here.'
			]
		###
        # Data Store wait on Load
		store = Ext.create 'YMU.Store.YoutubeStore'
		store.load()
		store.on('load', ->
			aggregatedStore = new Array()
			store.data.each(
				(item, index, totalItems) ->
					#console.log item.data['feed'].entry[1].media$group.media$thumbnail[1].url
					Ext.each(item.data['feed'].entry, (rec) ->
						#console.log 'rec: ' + rec.media$group.media$thumbnail[1].url
						aggregatedStore.push Ext.apply(rec,media:{thumbnailSmall1:rec.media$group.media$thumbnail[1].url})
					)
				)
			newsUpdates = videoListTpl.applyTemplate(aggregatedStore)
			tabsList = Ext.create 'YMU.View.DataTabs.YoutubeVideoTabs', {height:392}
			tabsList.applyNews(newsUpdates)
			# Player
			player = Ext.create 'YMU.View.Players.YoutubePlayer', {flex:0}

			#
			# Container Elements
			#
			# TODO: Move containers to separate files.

			# ~ Dashboard Container
			dashboardContainer = Ext.create 'YMU.View.DataTabs.DashboardTabs',
			{
				padding:'5 5 5 5'
			}
        
			# ~ Video Container
			videoContainer = Ext.create 'YMU.View.Containers.HContainer',
			{ 
				id: 'videoContainer',
				padding:'5 5 5 5',
				items: [
					player,
					tabsList
					],
			}

			# ~ Footer Container
			footerContainer = Ext.create 'YMU.View.DataContent.FooterPanel'

			# ~ Modal Containers
			contactSupportContainer = Ext.create 'YMU.View.Windows.ContactSupport'
			#contactSupportContainer.show()

			# Main Viewstrap Container
			containers = Ext.create 'YMU.View.Containers.VContainer',
			{ 
				id: 'mainContainer',
				#defaults:
				#	padding:'5 5 5 5'
				items: [
					dashboardContainer,
					videoContainer,
					footerContainer
				],
				renderTo: 'view-container' 
			}

			mysliderPanel =  dashboardContainer.getComponent("publicContainer").getComponent "slider-panel"
		)
        