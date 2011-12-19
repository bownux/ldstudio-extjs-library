(function() {
  Ext.define('Views.SliderPanel', {
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',
    currentPanel: 1,
    afterRender: function(comp, obj) {
      this.startSlider(this);
      return this.callParent(arguments);
    },
    loader: {
      autoLoad: true,
      url: 'slider-content.html',
      loadMask: true
    },
    doSomething: function() {
      return alert("I've Done something.");
    },
    startSlider: function(slider) {
      var addHandler, autoRotate, clearClass, createIcon, dh, i, iconIncr, initial, legend, legendElements, legendIcons, panelContainer, slideCount;
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
      slideCount = slider.el.dom.firstChild.children[0].children[0].childElementCount;
      dh = Ext.DomHelper;
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
      dh.append('panel-slider', legend);
      legendElements = Ext.get("legend");
      initial = legendElements.first();
      initial.addCls('legend-active');
      panelContainer.addListener('mouseover', function() {
        return clearInterval(window.slidePanelTimer);
      });
      panelContainer.addListener('mouseout', function() {});
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
            console.log("Current Panel Position in addHandler: " + slider.currentPanel);
            console.log("clickedPanel");
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
            slider.currentPanel = clickedPanel;
            x = slider.currentPanel;
            return panelContainer.move(direction, move, true);
          });
          return addHandler(element.next());
        }
      };
      addHandler(initial);
      autoRotate = function() {
        var direction, distance;
        slider.currentPanel++;
        clearClass(initial);
        distance = 730;
        direction = "left";
        console.log("CurrentPanel " + slider.currentPanel);
        if (slider.currentPanel === slideCount + 1) {
          distance = slider.width * slideCount - slider.width;
          direction = "right";
          slider.currentPanel = 1;
        }
        console.log("" + direction + " " + distance);
        return panelContainer.move(direction, distance, true);
      };
      console.log('autorotate');
      return window.slidePanelTimer = setInterval(autoRotate, 5000);
    }
  });
}).call(this);
