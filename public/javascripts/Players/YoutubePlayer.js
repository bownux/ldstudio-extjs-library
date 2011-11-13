
  Ext.define('Players.YoutubePlayer', {
    extend: 'Ext.panel.Panel',
    id: 'YoutubePlayer',
    title: 'YMU Video',
    width: 562,
    height: 342,
    html: '<div><iframe width="560" height="315" src="http://www.youtube.com/embed/D3ybnmNX91I" frameborder="0" allowfullscreen></iframe></div>',
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
      return this.update("<div><iframe width='560' height='315' src='http://www.youtube.com/embed/" + video_id + "' frameborder='0' allowfullscreen></iframe></div>");
    }
  });
