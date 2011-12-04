###
GET home page.
###

exports.index = (req, res) ->
    res.render 'index', { title: 'YMU ExtJS Widgets Libray' }

exports.widget = (req, res) ->
    widgetName = if req.query.name then req.query.name else 'default'
    switch widgetName
        when "data-tabs" then res.render 'data-tabs', { title: 'YMU ExtJS Widget View', name: widgetName }
        when "player-panel" then res.render 'player-panel', { title: 'YMU ExtJS Widget View', name: widgetName }
        when "video-container" then res.render 'video-container', { title: 'YMU ExtJS Widget View', name:widgetName }
        when "signup" then res.render 'signup', { title: 'YMU ExtJS Signup Form View', name:widgetName }
        when "default"
            res.render 'widget', { title: 'widget', name: widgetName }
        else
             res.render 'widget', { title: 'widget', name: widgetName }
    
exports.view = (req, res) ->
    viewName = if req.query.name then req.query.name else 'main'
    res.render 'view', { title: 'YMU ExtJS View '+viewName, name: viewName }
