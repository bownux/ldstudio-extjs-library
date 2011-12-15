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
      var addHandler, createIcon, dh, icon, iconIncr, initial, legend, legendElements, legendIcons, panelContainer, slideCount, sliderContent, _i, _len, _ref;
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
      legend = {
        tag: 'div',
        id: 'legend',
        cls: 'legend',
        cn: [legendIcons]
      };
      console.log("Width " + (panelContainer.getWidth()));
      dh.append('panel-slider', legend);
      legendElements = Ext.get("legend");
      initial = legendElements.first();
      addHandler = function(element) {
        if (element !== null) {
          console.log(element);
          element.addListener('click', function() {
            return alert("Clicked " + element.dom.innerText);
          });
          return addHandler(element.next());
        }
      };
      return addHandler(initial);
    }, this)
  });
}).call(this);
