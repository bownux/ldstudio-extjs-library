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
      var addHandler, clearClass, createIcon, dh, icon, iconIncr, initial, legend, legendElements, legendIcons, panelContainer, pp, slideCount, sliderContent, _i, _len, _ref;
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
      initial.addCls('legend-active');
      pp = 1;
      clearClass = function(element) {
        element.removeCls('legend-active');
        if (element.next()) {
          return clearClass(element.next());
        }
      };
      addHandler = function(element) {
        if (element !== null) {
          console.log(element);
          element.addListener('click', function() {
            var clickedPanel, diff, direction, move;
            clearClass(Ext.get("legend").first());
            element.addCls('legend-active');
            clickedPanel = parseInt(element.dom.innerText);
            if (pp === clickedPanel) {
              return;
            }
            if (clickedPanel > pp) {
              diff = clickedPanel - pp;
              move = diff * 730;
              direction = 'left';
            } else {
              diff = pp - clickedPanel;
              move = diff * 730;
              direction = 'right';
            }
            pp = clickedPanel;
            return panelContainer.move(direction, move, true);
          });
          return addHandler(element.next());
        }
      };
      return addHandler(initial);
    }, this)
  });
}).call(this);
