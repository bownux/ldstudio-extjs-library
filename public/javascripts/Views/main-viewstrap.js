
  Ext.require(['Ext.layout.*', '*']);

  Ext.require('Players.YoutubePlayer');

  Ext.require('Containers.VContainer');

  Ext.require('Containers.HContainer');

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      Players: 'javascripts/Players',
      Containers: 'javascripts/Containers'
    }
  });

  Ext.Loader.setPath('Players', 'javascripts/Players');

  Ext.Loader.setPath('Containers', 'javascripts/Containers');

  Ext.onReady(function() {
    var store;
    Ext.EventManager.onWindowResize((function(w, h) {}));
    store = Ext.create('DataTabs.YoutubeStore');
    store.load();
    return store.on('load', function() {
      var aggregatedStore, col1, col2, col3, col4, containers, dashboardContainer, footerContainer, loggedIn, newsUpdates, player, tabsList, videoContainer;
      aggregatedStore = new Array();
      store.data.each(function(item, index, totalItems) {
        return Ext.each(item.data['feed'].entry, function(rec) {
          return aggregatedStore.push(Ext.apply(rec, {
            media: {
              thumbnailSmall1: rec.media$group.media$thumbnail[1].url
            }
          }));
        });
      });
      newsUpdates = videoListTpl.applyTemplate(aggregatedStore);
      tabsList = Ext.create('DataTabs.YoutubeVideoTabs', {
        height: 392
      });
      tabsList.applyNews(newsUpdates);
      player = Ext.create('Players.YoutubePlayer', {
        flex: 0
      });
      loggedIn = Ext.create('Ext.Panel', {
        id: 'loggedInPanel',
        title: 'Training Dashboard',
        height: 250,
        padding: '0 0 5 0',
        html: "<div class='ymu-dashbaord'>                    <div class='ymu-dashboard-desc'>                        TRAINING DASHBOARD                    </div>                  </div>"
      });
      dashboardContainer = Ext.create('Containers.HContainer', {
        id: 'dashboardContainer',
        items: [loggedIn]
      });
      videoContainer = Ext.create('Containers.HContainer', {
        id: 'videoContainer',
        items: [player, tabsList]
      });
      col1 = Ext.create('Ext.Panel', {
        id: 'col1',
        style: {
          "border-right": 'solid 2px darkGray'
        },
        html: "<div class='ymu-footer-col first'>                    <div class='ymu-footer-col-title'>Sales Resources Go Mobile!</div>                                 <div class='ymu-footer-col-desc'>                        Access the YMU Resource Center from any smart phone, anywhere                        Yamaha takes you. Just open phone's web browser to:                        www.YMUsalesresources.mobi                    </div>                  </div>"
      });
      col2 = Ext.create('Ext.Panel', {
        id: 'col2',
        style: {
          "border-right": 'solid 2px darkGray'
        },
        html: "<div class='ymu-footer-col'>                    <div class='ymu-footer-col-title'>R.I.D.E. Program Launched</div>                                 <div class='ymu-footer-col-desc'>                        Rider Instruction and Development Education program launched                        in April 2011. Visit the <a href='#'>R.I.D.E. webpage</a> and                         also take the <a href='#'>Riders Ed online training course</a>                        to decide which level your delearship will be. The program                        assists riders with finding the training and programs they're                        looking for, which will develop positive relationships, and                        provide opportunities for increased traffic in your delearship!                    </div>                  </div>"
      });
      col3 = Ext.create('Ext.Panel', {
        id: 'col3',
        style: {
          "border-right": 'solid 2px darkGray'
        },
        html: "<div class='ymu-footer-col'>                    <div class='ymu-footer-col-title'>Looking To Get Certified?</div>                                 <div class='ymu-footer-col-desc'>                        Learn about all of our different certification programs, like                        the YTA, YPA, and YSA and Pro Yamaha Certification programs by                        taking the corresponding <a href='#'>Certification online training                        courses</a> and on the <a href='#'>Parts & Services webpage</a>.                    </div>                  </div>"
      });
      col4 = Ext.create('Ext.Panel', {
        id: 'col4',
        html: "<div class='ymu-footer-col last'>                    <div class='ymu-footer-col-title'>NEWS & UPDATES</div>                                 <div class='ymu-footer-col-desc'>                    </div>                  </div>"
      });
      footerContainer = Ext.create('Containers.HContainer', {
        id: 'footerContainer',
        padding: '5 0 0 0',
        defaults: {
          flex: 2,
          height: 280,
          bodyPadding: 10,
          style: {
            "text-align": 'left'
          }
        },
        layoutConfig: {
          pack: 'center',
          align: 'middle'
        },
        items: [col1, col2, col3, col4]
      });
      return containers = Ext.create('Containers.VContainer', {
        id: 'mainContainer',
        items: [dashboardContainer, videoContainer, footerContainer],
        renderTo: 'view-container'
      });
    });
  });
