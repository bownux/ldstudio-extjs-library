
  /*
  GET home page.
  */

  exports.index = function(req, res) {
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
