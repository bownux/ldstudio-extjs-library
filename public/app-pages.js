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

  Ext.Loader.setPath('Containers', 'javascripts/View/Containers');

  Ext.Loader.setPath('Forms', 'javascripts/View/Forms');


  Ext.Loader.setPath('Windows', 'javascripts/View/Windows');



  Ext.require('YMU.View.Containers.VContainer');

  Ext.require('YMU.View.Containers.HContainer');



  Ext.require('YMU.View.Windows.ContactSupport');


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

           contactSupportContainer = Ext.create('YMU.View.Windows.ContactSupport', {
        componentCls: 'contact-support',
        bodyCls: 'contact-support-body',
        closeAction: 'hide',
        items: Ext.create('YMU.View.Windows.ContactSupportForm')
      });


    }
  });

}).call(this);
