
  Ext.require(['Ext.layout.*', '*']);

  Ext.require('Players.YoutubePlayer');

  Ext.require('Containers.VContainer');

  Ext.require('Containers.HContainer');

  Ext.Loader.setConfig({
    enabled: true,
    paths: {
      Players: 'javascripts/Players',
      Containers: 'javascripts/Containers',
      Views: 'javascripts/Views'
    }
  });

  Ext.Loader.setPath('Players', 'javascripts/Players');

  Ext.Loader.setPath('Containers', 'javascripts/Containers');

  Ext.Loader.setPath('Views', 'javascripts/Views');

  Ext.onReady(function() {
    var store;
    store = Ext.create('DataTabs.YoutubeStore');
    store.load();
    return store.on('load', function() {
      var aggregatedStore, col1, col2, col3, col4, containers, dashboardContainer, footerContainer, mysliderPanel, newsUpdates, player, tabsList, videoContainer;
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
      dashboardContainer = Ext.create('Views.Dashboard');
      videoContainer = Ext.create('Containers.HContainer', {
        id: 'videoContainer',
        items: [player, tabsList]
      });
      col1 = Ext.create('Ext.Panel', {
        id: 'col1',
        style: {
          "border-right": 'solid 2px #03529D'
        },
        html: "<div class='ymu-footer-col first'>                    <div class='ymu-footer-col-title'>Sales Resources Go Mobile!</div>                                 <div class='ymu-footer-col-desc'>                        Access the YMU Sales Resource Center from any device, PC, tablets                         and smart/mobile phones , anytime anywhere Yamaha takes you. Just                         open your device’s browser to: <a href='http://www.YMUsalesresources.mobi' target='_blank' style='color:#00579a'>www.YMUsalesresources.mobi</a>                        <br/>                        <div class='image-wrap'>                        <img src='/images/footer-col1-FPO2.png' style='margin-top:-5px;' alt='YMU Sales Resource - Mobile' />                        </div>                    </div>                  </div>"
      });
      col2 = Ext.create('Ext.Panel', {
        id: 'col2',
        style: {
          "border-right": 'solid 2px #03529D'
        },
        html: "<div class='ymu-footer-col'>                    <div class='ymu-footer-col-title'>R.I.D.E. Program Launched</div>                                 <div class='ymu-footer-col-desc'>                        Rider Instruction, Demo and Events program was launched in September of                         2011. Visit the RIDE webpage  and find out about the RIDE. Take the courses                         and become the  go-to dealer for all things Motorsports in your community                        <br/>                        <div class='image-wrap'>                        <img src='/images/footer-col2-FPO2.png' alt='R.I.D.E.' />                        </div>                    </div>                  </div>"
      });
      col3 = Ext.create('Ext.Panel', {
        id: 'col3',
        style: {
          "border-right": 'solid 2px #03529D'
        },
        html: "<div class='ymu-footer-col'>                    <div class='ymu-footer-col-title'>Looking To Get Certified?</div>                                 <div class='ymu-footer-col-desc'>                        Learn about all of our different certification programs, like YSA, YPA,                         and YTA programs by logging in. Take the courses and get the recognition                         you and your dealer deserve.                         <br/>                        <div class='image-wrap'>                        <img src='/images/footer-col3-FPO2.png' alt='YTA/YSA/YPA' />                        </div>                    </div>                  </div>"
      });
      col4 = Ext.create('Ext.Panel', {
        id: 'col4',
        html: "<div class='ymu-footer-col last'>                    <div class='ymu-footer-col-title'>NEWS & UPDATES</div>                                 <div class='ymu-footer-col-desc'>                        Make sure to take the new Walk-Around format Sales Incentives tests                         beginning 1-2-2011:                        <br />                        <ul class='ymu-footer-col4-list' style='float:left;'>                            <li>2012 YFZ-R1</li>                            <li>2012 WR450F</li>                            <li>2012 Raider SCL</li>                            <li>2012 Grizzly 300</li>                            <li>2012 YFZ450</li>                        </ul>                        <div class='image-wrap'>                            <img src='/images/footer-col4-FPO2.png' width='105px' height='78px' style='padding-right: 5px; float:right;' alt='YTA/YSA/YPA' />                        </div>                        </div>                  </div>"
      });
      footerContainer = Ext.create('Containers.HContainer', {
        id: 'footerContainer',
        padding: '5',
        defaults: {
          flex: 2,
          height: 215,
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
      containers = Ext.create('Containers.VContainer', {
        id: 'mainContainer',
        defaults: {
          padding: '5 5 5 5'
        },
        items: [dashboardContainer, videoContainer, footerContainer],
        renderTo: 'view-container'
      });
      return mysliderPanel = dashboardContainer.getComponent("publicContainer").getComponent("slider-panel");
    });
  });
