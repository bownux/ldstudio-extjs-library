(function() {
  var App;

  Ext.require(['Ext.layout.*', '*']);

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      YMU: 'javascripts',
      View: 'javascripts/View',
      Model: 'javascripts/Model',
      Controller: 'javascripts/Controller'
    },
    Store: 'javascripts/Store'
  });

  Ext.Loader.setPath('YMU', 'javascripts');

  Ext.Loader.setPath('View', 'javascripts/View');

  Ext.Loader.setPath('Model', 'javascripts/Model');

  Ext.Loader.setPath('Controller', 'javascripts/Controller');

  Ext.Loader.setPath('Store', 'javascripts/Store');

  Ext.Loader.setPath('Players', 'javascripts/View/Players');

  Ext.Loader.setPath('Containers', 'javascripts/View/Containers');

  Ext.Loader.setPath('Forms', 'javascripts/View/Forms');

  Ext.Loader.setPath('Sliders', 'javascripts/View/Sliders');

  Ext.Loader.setPath('DataTabs', 'javascripts/View/DataTabs');

  Ext.Loader.setPath('Windows', 'javascripts/View/Windows');

  Ext.require('YMU.Model.YoutubeModel');

  Ext.require('YMU.Model.UserModel');

  Ext.require('YMU.Store.YoutubeStore');

  Ext.require('YMU.View.Containers.VContainer');

  Ext.require('YMU.View.Containers.HContainer');

  Ext.require('YMU.View.DataTabs.YoutubeVideoTabs');

  Ext.require('YMU.View.DataContent.FooterPanel');

  Ext.require('YMU.View.Forms.LoginPanel');

  Ext.require('YMU.View.Players.YoutubePlayer');

  Ext.require('YMU.View.Windows.ContactSupport');

  Ext.require('YMU.View.DataTabs.DashboardTabs');

  Ext.define('YMU.Lib', {
    singleton: true,
    Application: null
  });

  App = (function() {

    function App() {
      this.app;
      this.fireEvent = function(evt, opts) {
        return this.app.fireEvent(evt, opts);
      };
      this.setApp = function(a) {
        return this.app = a;
      };
    }

    return App;

  })();

  Ext.application({
    name: 'YMU',
    appFolder: 'javascripts',
    autoCreateViewport: false,
    views: ['YMU.View.Windows.ContactSupport', 'YMU.View.DataContent.FooterPanel'],
    models: ['YMU.Model.ContactSupportModel', 'YMU.Model.FooterModel'],
    stores: ['YMU.Store.ContactSupportStore', 'YMU.Store.FooterStore'],
    controllers: ['YMU.Controller.ContactSupport', 'YMU.Controller.Footer'],
    launch: function() {
      var contactSupportContainer, dashboardContainer, mysliderPanel, player, store, tabsList, videoContainer;
      YMU.Lib.Application = new App();
      YMU.Lib.Application.setApp(this);
      /* - Do we really want a Viewport here? Maybe we want to create
      - and render the element here instead? http://goo.gl/sTbfq, currently
      - creating items based on MVC Architecture from Sencha ExtJS 4.
      Ext.create 'Ext.container.Viewport',
          layout: 'fit' ,
          items: [
              xtype: 'panel',
              title: 'Users',
              html: 'Stuff will go here.'
          ]
      */
      player = Ext.create('YMU.View.Players.YoutubePlayer', {
        flex: 0
      });
      dashboardContainer = Ext.create('YMU.View.DataTabs.DashboardTabs', {
        padding: '5 5 5 5'
      });
      tabsList = Ext.create('YMU.View.DataTabs.YoutubeVideoTabs', {
        height: 392
      });
      videoContainer = Ext.create('YMU.View.Containers.HContainer', {
        id: 'videoContainer',
        padding: '5 5 5 5',
        items: [player, tabsList]
      });
      contactSupportContainer = Ext.create('YMU.View.Windows.ContactSupport', {
        componentCls: 'contact-support',
        bodyCls: 'contact-support-body',
        items: Ext.create('YMU.View.Windows.ContactSupportForm')
      });
      store = Ext.create('YMU.Store.YoutubeStore');
      store.load();
      store.on('load', function() {
        var aggregatedStore, containers, footerContainer, newsUpdates;
        aggregatedStore = new Array();
        store.data.each(function(item, index, totalItems) {
          return Ext.each(item.data['feed'].entry, function(rec) {
            return aggregatedStore.push(Ext.apply(rec, {
              media: {
                thumbnailSmall1: rec.media$group.media$thumbnail[1].url
              }
            }));
          });
        });
        newsUpdates = videoListTpl.applyTemplate(aggregatedStore);
        tabsList.applyNews(newsUpdates);
        footerContainer = Ext.create('YMU.View.DataContent.FooterPanel');
        return containers = Ext.create('YMU.View.Containers.VContainer', {
          id: 'mainContainer',
          items: [dashboardContainer, videoContainer, footerContainer],
          renderTo: 'view-container'
        });
      });
    }
  });

}).call(this);
