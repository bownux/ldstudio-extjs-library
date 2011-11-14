(function() {
  var newsTab;

  Ext.require(['Ext.tab.*', '*']);

  window.videoListTpl = new Ext.XTemplate('<div>', '<p>', '<tpl for=".">', '<tpl for="media">', '<p><a onclick="changePlayerVideo(\'{[this.getVideoID(values)]}\')", href="javascript:void(0);"><img src="{thumbnailSmall1}" style="padding-right:2px" /></a></p>', '</tpl>', '<tpl for="title">', '<p>title{#}: {[this.getValueFromRaw(values)]}</p>', '</tpl>', '<tpl for="content">', '<p>description{#}: {[this.getValueFromRaw(values)]}</p>', '</tpl>', '<br />', '</tpl>', '</p>', '</div>', {
    config: {
      disableFormats: false
    },
    getValueFromRaw: function(value) {
      return value.$t;
    },
    getVideoID: function(value) {
      var reID, res, str;
      str = value.thumbnailSmall1;
      reID = /\S+\/vi\/(\S+)\//;
      res = str.match(reID);
      if (res) {
        console.log(res[1]);
        return res[1];
      } else {
        return 'D3ybnmNX91I';
      }
    }
  });

  newsTab = Ext.create('Ext.Panel', {
    id: 'news',
    title: 'NEWS & UPDATES',
    html: '<p>NEWS TAB</p>'
  });

  Ext.define('DataTabs.YoutubeVideoTabs', {
    extend: 'Ext.TabPanel',
    activeTab: 0,
    width: 300,
    height: 250,
    plain: true,
    myNews: '',
    defaults: {
      autoScroll: true,
      bodyPadding: 10
    },
    items: [
      newsTab, {
        itemId: 'training',
        title: 'TRAINING',
        html: '<p>TRAINING TAB</p>'
      }
    ],
    applyNews: function(content) {
      return newsTab.update(content);
    }
  });

}).call(this);
