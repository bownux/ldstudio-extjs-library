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
        console.log "ShowIT from Slider"
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
        #for ( x=0; x<slideCount; x++)
        legendIcon = 
            tag:'div',
            cls:'legend-icon',
            html: '#'
        
        
        legend = 
            tag:'div',
            id:'legend',
            cls:'legend',
            cn: [
                legendIcons
            ]
        

        

        
        console.log "Width #{panelContainer.getWidth()}"
        dh.append 'panel-slider', legend
        #panelContainer.createChild('<h1 style="position:absolute;left:20px">Test</h1>')

