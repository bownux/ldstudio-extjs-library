(function() {
  var authenticate, authenticatedContainer, authenticatedTabs, dashboard_y, dbSalesGrid, dbSalesStore, loggedIn, loggedOut, loginPanel, notAuthenticatedContainer, renderAction, sliderPanel, tmp_sales_incentive_data;
  dashboard_y = 300;
  renderAction = function(val) {
    return "<img height=15px align=middle src='images/act_" + val + ".png'>";
  };
  sliderPanel = Ext.create('Views.SliderPanel', {
    height: 320,
    flex: 5
  });
  loginPanel = Ext.create('Views.LoginPanel', {
    height: 320,
    flex: 2
  });
  loggedIn = Ext.create('Ext.Panel', {
    id: 'loggedInPanel',
    title: 'Your Profile',
    height: dashboard_y,
    flex: 1,
    html: "<div class='ymu-dashbaord'>            <div class='ymu-dashboard-desc'>                Your Profile            </div>          </div>"
  });
  loggedOut = Ext.create('Ext.Panel', {
    id: 'loggedOutPanel',
    title: 'Log In',
    height: dashboard_y,
    flex: 1,
    html: "<div class='ymu-dashbaord'>            <div class='ymu-dashboard-desc'>                Log In            </div>          </div>"
  });
  notAuthenticatedContainer = Ext.create('Containers.HContainer', {
    id: 'publicContainer',
    flex: 3,
    items: [sliderPanel, loginPanel]
  });
  tmp_sales_incentive_data = [['2011 Star Walk-Around Challenge', 'start', '', ''], ['2011 ATV/SXS Walk-Around Challenge', '', 'Completed', '11/17/2011'], ['2011 Motorcycle Walk-Around CHallenge', 'start', 'In Progress', '']];
  dbSalesStore = Ext.create('Ext.data.ArrayStore', {
    fields: [
      {
        name: 'activity_name'
      }, {
        name: 'action'
      }, {
        name: 'status'
      }, {
        name: 'completion_date',
        type: 'date'
      }
    ]
  });
  dbSalesStore.loadData(tmp_sales_incentive_data);
  dbSalesGrid = Ext.create('Ext.grid.GridPanel', {
    id: 'dashboardSalesGrid',
    title: 'SALES INCENTIVES',
    store: dbSalesStore,
    columns: [
      {
        header: 'Activity Name',
        width: 280,
        sortable: true,
        dataIndex: 'activity_name'
      }, {
        header: 'Action',
        width: 160,
        sortable: true,
        dataIndex: 'action',
        renderer: renderAction
      }, {
        header: 'Status',
        width: 150,
        sortable: true,
        dataIndex: 'status'
      }, {
        header: 'Completion Date',
        width: 100,
        sortable: true,
        dataIndex: 'completion_date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
      }
    ],
    autoHeight: true,
    height: dashboard_y - 80,
    width: 640,
    frame: true
  });
  authenticatedTabs = Ext.create('Ext.TabPanel', {
    activeTab: 0,
    autoWidth: true,
    autoHeight: true,
    plain: true,
    layout: 'fit',
    left: -2,
    width: 725,
    height: dashboard_y - 80,
    defaults: {
      autoScroll: true
    },
    items: [
      dbSalesGrid, {
        title: 'YSA',
        html: ''
      }, {
        title: 'YPA',
        html: ''
      }, {
        title: 'YTA',
        html: ''
      }, {
        title: 'MY COMPLETIONS',
        html: ''
      }, {
        title: 'DEALER REPORT',
        html: ''
      }
    ]
  });
  authenticatedContainer = Ext.create('Containers.VContainer', {
    id: 'authenticatedContainer',
    title: 'Training Dashboard',
    layout: {
      type: 'vbox'
    },
    height: dashboard_y,
    flex: 3,
    items: [
      {
        id: 'authenticatedTopBarPanel',
        xtype: 'panel',
        buttonAlign: 'right',
        items: [
          {
            xtype: 'button',
            text: 'YMU ONLINE',
            href: 'https://yamaha-dealers.com/SumTotal/',
            margin: '0 0 5 650'
          }
        ]
      }, authenticatedTabs
    ]
  });
  authenticate = function() {
    console.log("test");
    return Ext.getCmp("dashboardContainer").logIn();
  };
  Ext.define('Views.Dashboard', {
    extend: 'Containers.HContainer',
    id: 'dashboardContainer',
    height: dashboard_y,
    items: [authenticatedContainer, loggedIn],
    constructor: function(config) {
      console.log("dashboard");
      this.initConfig(config);
      this.callParent(arguments);
      this.logOut();
      return loginPanel.getComponent("formFields").getComponent("loginButton").on('click', this.logIn, this);
    },
    logOut: function() {
      this.removeAll(false);
      this.add(notAuthenticatedContainer);
      return this.doLayout();
    },
    logIn: function() {
      console.log(this);
      this.removeAll(true);
      this.add(authenticatedContainer);
      this.add(loggedIn);
      return this.doLayout();
    }
  });
}).call(this);
