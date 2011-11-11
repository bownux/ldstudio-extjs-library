###
GET home page.
###

exports.index = (req, res) ->
    res.render 'index', { title: 'YMU ExtJS Widgets Libray' }

exports.widget = (req, res) ->
    widgetName = if req.query.name then req.query.name else 'default'
    switch widgetName
        when "data-tabs" then res.render 'data-tabs', { title: 'YMU ExtJS Widget View', name: widgetName }
        when "default"
            res.render 'widget', { title: 'widget', name: widgetName }
        else
             res.render 'widget', { title: 'widget', name: widgetName }
    
