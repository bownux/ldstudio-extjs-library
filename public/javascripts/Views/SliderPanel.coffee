# Generic YMU Horizontal Container
Ext.define 'Views.SliderPanel',
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',
    currentPanel: 1,
    afterRender: (comp,obj) ->
        console.log "Im done rendering beyootch!"
        console.log this
        this.showIt(this)
        this.callParent arguments

    loader: 
        autoLoad: true,
        url: 'slider-content.html',
        loadMask: true,
        success: ->
            console.log 'Slider Panel Loaded.'
    
    showIt: ( slider )=>
        #Array to hold icons created in config loop
        legendIcons = []
        iconIncr = 0 
        createIcon = (icon) ->
            console.log iconIncr++
            icn =
                tag:'div',
                cls:'legend-icon',
                html: iconIncr,
            #add icon to the container
            legendIcons.push icn
        #@todo delete this dependency    
        panelContainer =  Ext.get 'panel-container'
        slideCount = slider.el.dom.firstChild.children[0].children[0].childElementCount
        
        dh = Ext.DomHelper
        i = 0
        while i < slideCount
            createIcon i
            i++
        
        legend = 
            tag:'div',
            id:'legend',
            cls:'legend',
            cn: [
                legendIcons
            ]
        

        #Add legend to the Panel Slider Container
        dh.append 'panel-slider', legend

        legendElements = Ext.get("legend")
        initial = legendElements.first();
        initial.addCls 'legend-active'
        
        panelContainer.addListener 'mouseover', ->
            clearInterval window.slidePanelTimer
        panelContainer.addListener 'mouseout', ->

        clearClass = (element) ->
           element.removeCls 'legend-active'
           if element.next()
               clearClass element.next() 
               
        addHandler = (element) ->
            ##If elements are available attache event listeners
            if element != null
                element.addListener 'click', (evt) ->
                    clearClass Ext.get("legend").first() 
                    element.addCls 'legend-active'
                    clickedPanel = parseInt(element.dom.innerText)
                    console.log "Current Panel Position in addHandler: #{slider.currentPanel}"
                    if slider.currentPanel is clickedPanel 
                        return
                    if clickedPanel > slider.currentPanel
                        diff = clickedPanel - slider.currentPanel
                        move = diff * slider.width
                        direction = 'left'
                    else
                        diff = slider.currentPanel - clickedPanel
                        move = diff * slider.width
                        direction = 'right'
                    slider.currentPanel = clickedPanel
                    x = slider.currentPanel
                    panelContainer.move direction, move, true
                addHandler element.next()
        #Begin attaching event listeners
        addHandler initial

        
        x=0
        autoRotate = ->
            console.log "Autorotate position: #{x}"
            clearClass initial
            distance = 730
            direction = "left"
            pp = x
            console.log "Incr #{x}"
            if x is 3 
                distance = panelContainer.getWidth() - slider.width 
                direction = "right"
                x = 0 
            console.log "#{direction} #{distance}"
            panelContainer.move direction, distance, true
            x++
        console.log 'autorotate'
        window.slidePanelTimer = setInterval autoRotate , 3000

        #begin autorotate
    
