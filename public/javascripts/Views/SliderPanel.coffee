# Generic YMU Horizontal Container
Ext.define 'Views.SliderPanel',
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',

    loader: 
        autoLoad: true,
        url: 'slider-content.html',
        loadMask: true,
        success: ->
            console.log 'Slider Panel Loaded.'
    
    showIt: =>
        legendIcons = []
        iconIncr = 0 
        
        createIcon = (icon) ->
            console.log iconIncr++
            icn =
                tag:'div',
                cls:'legend-icon',
                html: iconIncr,
            legendIcons.push icn
            
        panelContainer =  Ext.get 'panel-container'
        sliderContent = panelContainer.dom
        slideCount = sliderContent.childElementCount
        
        dh = Ext.DomHelper
        createIcon icon for icon in sliderContent.children
        
        
        legend = 
            tag:'div',
            id:'legend',
            cls:'legend',
            cn: [
                legendIcons
            ]
        
        console.log "Width #{panelContainer.getWidth()}"
        
        #Add legend to the Panel Slider Container
        dh.append 'panel-slider', legend

        legendElements = Ext.get("legend")
        initial = legendElements.first();
        initial.addCls 'legend-active'

        pp = 1
        
        clearClass = (element) ->
           element.removeCls 'legend-active'
           if element.next()
               clearClass element.next() 
               
        addHandler = (element) ->
            ##If elements are available attache event listeners
            if element != null
                console.log element 
                element.addListener 'click', ->
                    clearClass Ext.get("legend").first() 
                    element.addCls 'legend-active'
                    clickedPanel = parseInt(element.dom.innerText)
                    if pp is clickedPanel 
                        return
                    if clickedPanel > pp
                        diff = clickedPanel - pp
                        move = diff * 730
                        direction = 'left'
                    else
                        diff = pp - clickedPanel
                        move = diff * 730
                        direction = 'right'
                    pp = clickedPanel
                    panelContainer.move direction, move, true
                addHandler element.next()
        #Begin attaching event listeners
        addHandler initial

        #begin autorotate
    
