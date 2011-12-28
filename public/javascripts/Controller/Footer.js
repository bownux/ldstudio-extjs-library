
  Ext.define('YMU.Controller.Footer', {
    extend: 'Ext.app.Controller',
    refs: [
      {
        ref: 'footerPanel',
        selector: 'footerpanelcontent'
      }
    ],
    views: ['YMU.View.DataContent.FooterPanel'],
    stores: ['YMU.Store.FooterStore'],
    init: function() {
      this.control({
        'footerpanelcontent': {
          afterrender: this.onFooterViewRendered
        }
      });
      return this.application.on({
        footercontentchange: this.onContentChange,
        scope: this
      });
    },
    onLaunch: function() {
      var footerStore;
      footerStore = this.getYMUStoreFooterStoreStore();
      return footerStore.load({
        scope: this
      });
    },
    onFooterViewRendered: function() {
      return this.getFooterPanel().updateItems(this.getYMUStoreFooterStoreStore().data);
    },
    onContentChange: function(store) {
      return console.log("onContentChange");
    }
  });
