# Video Container
Ext.define 'Containers.HContainer',
    extend: 'Ext.panel.Panel',
    id: 'hContainer',
    border: false,
    height: 342,    
    autoWidth: true,
    monitorResize: true,
    layout: 
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    #listeners: 
    #    'resize': ->
    #        console.log this.items.items
