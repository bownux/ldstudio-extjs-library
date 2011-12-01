(function() {
  /*
  GET home page.
  */  exports.index = function(req, res) {
    return res.render('index', {
      title: 'YMU ExtJS Widgets Libray'
    });
  };
  exports.widget = function(req, res) {
    var widgetName;
    widgetName = req.query.name ? req.query.name : 'default';
    switch (widgetName) {
      case "data-tabs":
        return res.render('data-tabs', {
          title: 'YMU ExtJS Widget View',
          name: widgetName
        });
      case "player-panel":
        return res.render('player-panel', {
          title: 'YMU ExtJS Widget View',
          name: widgetName
        });
      case "video-container":
        return res.render('video-container', {
          title: 'YMU ExtJS Widget View',
          name: widgetName
        });
      case "signup":
        return res.render('signup', {
          title: 'YMU ExtJS Signup Form View',
          name: widgetName
        });
      case "default":
        return res.render('widget', {
          title: 'widget',
          name: widgetName
        });
      default:
        return res.render('widget', {
          title: 'widget',
          name: widgetName
        });
    }
  };
}).call(this);
