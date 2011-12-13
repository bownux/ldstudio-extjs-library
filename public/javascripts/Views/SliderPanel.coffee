# Generic YMU Horizontal Container
Ext.define 'Views.SliderPanel',
    extend: 'Ext.panel.Panel',
    id: 'slider-panel',
    width: 730,
    html: '<p id="loading">Loading<p>',
    loader: {
        autoLoad: true,
        url: 'slider-content.html',
        loadMask: true,
        success: ->
            console.log 'Slider Panel Loaded.'
            #Ext.Msg.alert 'Slider Panel Loaded'
        }
