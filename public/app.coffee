Ext.application 
    name: 'YMU',

    appFolder: 'app',

    launch: ->
        Ext.create 'Ext.container.Viewport',
            layout: fit ,
            items: [
                xtype: 'panel',
                title: 'Users',
                html: 'Stuff will go here.'
            ]
