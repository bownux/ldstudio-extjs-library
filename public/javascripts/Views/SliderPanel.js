(function() {
  Ext.define('Views.SliderPanel', {
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',
    currentPanel: 1,
    afterRender: function(comp, obj) {
      this.showIt(this);
      return this.callParent(arguments);
    },
    loader: {
      autoLoad: true,
      url: 'slider-content.html',
      loadMask: true
    },
    trackEvent: function(evt) {
      return _gaq.push(['_trackEvent', 'Slider', evt]);
    },
    showIt: function(slider) {
      var addHandler, clearClass, createIcon, dh, i, iconIncr, initial, legend, legendElements, legendIcons, panelContainer, slideCount;
      legendIcons = [];
      iconIncr = 0;
      createIcon = function(icon) {
        var icn;
        icn = {
          tag: 'div',
          cls: 'legend-icon',
          html: iconIncr
        };
        return legendIcons.push(icn);
      };
      panelContainer = Ext.get('panel-container');
      slideCount = slider.el.dom.firstChild.children[0].children[0].childElementCount;
      i = 0;
      while (i < slideCount) {
        createIcon(i);
        i++;
      }
      legend = {
        tag: 'div',
        id: 'legend',
        cls: 'legend',
        cn: [legendIcons]
      };
      dh = Ext.DomHelper;
      dh.append('panel-slider', legend);
      legendElements = Ext.get("legend");
      initial = legendElements.first();
      initial.addCls('legend-active');
      panelContainer.addListener('mouseover', function() {
        return clearInterval(slider.slidePanelTimer);
      });
      panelContainer.addListener('mouseout', function() {
        return slider.slidePanelTimer = setInterval(slider.autoRotate, 5000);
      });
      clearClass = function(element) {
        element.removeCls('legend-active');
        if (element.next()) {
          return clearClass(element.next());
        }
      };
      addHandler = function(element) {
        if (element !== null) {
          element.addListener('click', function(evt) {
            var clickedPanel, diff, direction, move, x;
            clearClass(Ext.get("legend").first());
            element.addCls('legend-active');
            clickedPanel = parseInt(element.dom.innerText);
            clickedPanel || (clickedPanel = parseInt(element.dom.innerHTML));
            if (slider.currentPanel === clickedPanel) {
              return;
            }
            if (clickedPanel > slider.currentPanel) {
              diff = clickedPanel - slider.currentPanel;
              move = diff * slider.width;
              direction = 'left';
            } else {
              diff = slider.currentPanel - clickedPanel;
              move = diff * slider.width;
              direction = 'right';
            }
            slider.trackEvent("Panel " + clickedPanel);
            slider.currentPanel = clickedPanel;
            x = slider.currentPanel;
            return panelContainer.move(direction, move, true);
          });
          return addHandler(element.next());
        }
      };
      addHandler(initial);
      slider.autoRotate = function() {
        var direction, distance;
        slider.currentPanel++;
        clearClass(initial);
        distance = 730;
        direction = "left";
        if (slider.currentPanel === slideCount + 1) {
          distance = slider.width * slideCount - slider.width;
          direction = "right";
          slider.currentPanel = 1;
        }
        panelContainer.move(direction, distance, true);
        clearClass(initial);
        for (x = 1; x < slider.currentPanel+1; x++){
                if(x == 1){ 
                    var cel = initial;
                }else{
                    cel = cel.next();
                }
                if (x == slider.currentPanel){
                    cel.addCls('legend-active');
                }
                    
            };
        return this;
      };
      slider.slidePanelTimer = setInterval(slider.autoRotate, 5000);
      return slider;
    }
  });
}).call(this);
