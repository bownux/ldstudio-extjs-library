# Youtube Player Panel
# TODO: make video attributes configurable through templates
# TODO: verify videos played are from ymu author or read id from YoutubeStore
window.changePlayerVideo = (value,title = 'YMU',description='YMU Video') ->
	#console.log 'changing video: ' + value
	#console.log Ext.getCmp('YoutubePlayer')
	Ext.getCmp('YoutubePlayer').changeVideo value, unescape(title)
	Ext.getCmp('news').applyDescription unescape("<div class='video-panel-title'>"+title+"</div>"+"<div class='video-panel-desc'>"+description+"</div>")

Ext.define 'YMU.View.Players.YoutubePlayer',
    extend: 'Ext.panel.Panel',
    id: 'YoutubePlayer'
    title: 'YMU Video',
    width: 662,
    height: 392,
    header:false,
    headerAsText : false,
    html: '<div><iframe width="660" height="365" src="http://www.youtube.com/embed/hT8Ce7KJ2n4?rel=0" frameborder="0" allowfullscreen></iframe></div>',
    constructor: (config) ->
        this.initConfig(config)
        this.callParent(arguments)
        console.log "TET"
        changePlayerVideo('hT8Ce7KJ2n4','2011 Raider Walk Around') #hacky
    setTitle: (newTitle) ->
        me = this
        oldTitle = this.title
        me.title = this.applyTitle(newTitle) || newTitle
        if me.header
            me.header.setTitle(me.title)
        else
            me.updateHeader()
        if me.reExpander
            me.reExpander.setTitle(me.title);
        me.fireEvent('titlechange', me, me.title, oldTitle);
    applyTitle: (title) ->
        if (!Ext.isString(title) || title.length == 0)
            alert('Error: Title must be a valid non-empty string')
        else 
            return "YMU Video: " + title
    changeVideo: (video_id, video_title) ->
        this.setTitle(video_title)
        this.update("<div><iframe width='660' height='365' src='http://www.youtube.com/embed/" + video_id + "?rel=0' frameborder='0' allowfullscreen></iframe></div>")

