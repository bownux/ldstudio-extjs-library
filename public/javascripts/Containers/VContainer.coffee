# Generic YMU Vertical Container
Ext.define 'Containers.VContainer',
    extend: 'Ext.panel.Panel',
    id: 'vContainer',
    border: false,
    width: 1024,
    autoWidth: false,
    autoHeight: true,
    monitorResize: true,
    layout: 
        type: 'fit',
        pack: 'start',
        align: 'stretch'
    #listeners: 
    #    'resize': ->
    #        console.log this.items.items
