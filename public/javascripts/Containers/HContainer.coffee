# Video Container
Ext.define 'Containers.HContainer',
    extend: 'Ext.panel.Panel',
    id: 'hContainer',
    border: false,
    height: 342,    
    width: 1024,
    autoWidth: false,
    monitorResize: true,
    layout: 
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    #listeners: 
    #    'resize': ->
    #        console.log this.items.items
