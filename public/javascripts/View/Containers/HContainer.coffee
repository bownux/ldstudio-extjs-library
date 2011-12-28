# Generic YMU Horizontal Container
Ext.define 'YMU.View.Containers.HContainer',
    extend: 'Ext.panel.Panel',
    id: 'hContainer',
    border: false,
    width: 1024,
    autoWidth: false,
    autoHeight: true,
    monitorResize: true,
    defaults: 
        flex: 1,
    layoutConfig:
        align: 'stretch',
    layout: 
        type: 'hbox',
        pack: 'start',
    #listeners: 
    #    'resize': ->
    #        console.log this.items.items
