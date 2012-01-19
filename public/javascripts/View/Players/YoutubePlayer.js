(function() {

  window.changePlayerVideo = function(value, title, description) {
    if (title == null) title = 'YMU';
    if (description == null) description = 'YMU Video';
    Ext.getCmp('YoutubePlayer').changeVideo(value, unescape(title));
    return Ext.getCmp('news').applyDescription(unescape("<div class='video-panel-title'>" + title + "</div>" + "<div class='video-panel-desc'>" + description + "</div>"));
  };

  Ext.define('YMU.View.Players.YoutubePlayer', {
    extend: 'Ext.panel.Panel',
    id: 'YoutubePlayer',
    title: 'YMU Video',
    width: 662,
    height: 392,
    header: false,
    headerAsText: false,
    html: '<div><iframe width="660" height="365" src="http://www.youtube.com/embed/hT8Ce7KJ2n4?rel=0&wmode=Opaque" frameborder="0" allowfullscreen></iframe></div>',
    constructor: function(config) {
      this.initConfig(config);
      this.callParent(arguments);
      //RPS: Commented out
      //console.log("TET");
      return changePlayerVideo('hT8Ce7KJ2n4', '2011 Raider Walk Around');
    },
    setTitle: function(newTitle) {
      var me, oldTitle;
      me = this;
      oldTitle = this.title;
      me.title = this.applyTitle(newTitle) || newTitle;
      if (me.header) {
        me.header.setTitle(me.title);
      } else {
        me.updateHeader();
      }
      if (me.reExpander) me.reExpander.setTitle(me.title);
      return me.fireEvent('titlechange', me, me.title, oldTitle);
    },
    applyTitle: function(title) {
      if (!Ext.isString(title) || title.length === 0) {
        return alert('Error: Title must be a valid non-empty string');
      } else {
        return "YMU Video: " + title;
      }
    },
    changeVideo: function(video_id, video_title) {
      this.setTitle(video_title);
      return this.update("<div><iframe width='660' height='365' src='http://www.youtube.com/embed/" + video_id + "?rel=0&wmode=Opaque' frameborder='0' allowfullscreen></iframe></div>");
    }
  });

}).call(this);
