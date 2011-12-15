(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
    },
    showIt: __bind(function() {
      var createIcon, dh, icon, iconIncr, legend, legendIcon, legendIcons, panelContainer, slideCount, sliderContent, _i, _len, _ref;
      console.log("ShowIT from Slider");
      legendIcons = [];
      iconIncr = 0;
      createIcon = function(icon) {
        var icn;
        console.log(iconIncr++);
        icn = {
          tag: 'div',
          cls: 'legend-icon',
          html: iconIncr
        };
        return legendIcons.push(icn);
      };
      panelContainer = Ext.get('panel-container');
      sliderContent = panelContainer.dom;
      slideCount = sliderContent.childElementCount;
      dh = Ext.DomHelper;
      _ref = sliderContent.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        icon = _ref[_i];
        createIcon(icon);
      }
      legendIcon = {
        tag: 'div',
        cls: 'legend-icon',
        html: '#'
      };
      legend = {
        tag: 'div',
        id: 'legend',
        cls: 'legend',
        cn: [legendIcons]
      };
      console.log("Width " + (panelContainer.getWidth()));
      return dh.append('panel-slider', legend);
    }, this)
  });
}).call(this);
