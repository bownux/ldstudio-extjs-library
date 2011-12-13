(function() {
  Ext.define('Containers.SliderPanel', {
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',
    loader: {
      autoLoad: true,
      url: 'slider-content.html',
      loadMask: true,
      success: function() {
        console.log('Slider Panel Loaded.');
        return console.log(Ext.get('.panel-content'));
      }
    }
  });
}).call(this);
