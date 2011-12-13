
  Ext.define('Views.SliderPanel', {
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',
    loader: {
      autoLoad: true,
      url: 'slider-content.html',
      loadMask: true,
      success: function() {
        return console.log('Slider Panel Loaded.');
      }
    }
  });
