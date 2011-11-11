Ext.require('Ext.tab.*');
//TODO: convert to coffee
//TODO: get values from jsonp
//TODO: use more dynamic values for panel sizing
Ext.onReady(function(){
    var tabs2 = Ext.createWidget('tabpanel', {
        renderTo: 'data-tabs',//document.body,
        activeTab: 0,
        width: 300,
        height: 250,
        plain: true,
        defaults :{
            autoScroll: true,
            bodyPadding: 10
        },
        items: [{
                title: 'NEWS & UPDATES',
                loader: {
                    url: 'ajax1.htm',
                    contentType: 'html',
                    autoLoad: true
                    //params: 'foo=123&bar=abc'
                }
            },{
                title: 'TRAINING',
                loader: {
                    url: 'ajax2.htm',
                    contentType: 'html',
                    loadMask: true
                },
                listeners: {
                    activate: function(tab) {
                        tab.loader.load();
                    }
                }
            }
        ]
    });
});
