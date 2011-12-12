(function() {
  Ext.define('Containers.SliderPanel', {
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    html: '<h1>Hello WOrld<h1>',
    loader: {
      autoLoad: true,
      url: 'slider-content.html',
      success: function() {
        return alert('yes!');
      }
    }
  });
}).call(this);
