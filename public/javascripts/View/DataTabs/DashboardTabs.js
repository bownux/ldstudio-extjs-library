(function() {
  var authenticate, authenticatedContainer, authenticatedTabs, dashboard_y, dbSalesGrid, dbSalesStore, loggedIn, loggedOut, loginPanel, notAuthenticatedContainer, renderAction, sliderPanel, tmp_combo_data, tmp_combo_yta_data, tmp_sales_incentive_data, ypa, ypaStore, yta, ytaStore;

  dashboard_y = 300;

  renderAction = function(val) {
    return "<img height=15px align=middle src='images/act_" + val + ".png'>";
  };

  sliderPanel = Ext.create('YMU.View.Sliders.SliderPanel', {
    height: 320,
    flex: 5
  });

  loginPanel = Ext.create('YMU.View.Forms.LoginPanel', {
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

  notAuthenticatedContainer = Ext.create('YMU.View.Containers.HContainer', {
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

  tmp_combo_data = [['Bronze', ''], ['Silver', '']];

  ypaStore = Ext.create('Ext.data.ArrayStore', {
    fields: [
      {
        name: 'tier'
      }, {
        name: 'destination'
      }
    ]
  });

  ypaStore.loadData(tmp_combo_data);

  ypa = Ext.create('YMU.View.Containers.VContainer', {
    id: 'ypa',
    title: 'YPA',
    flex: 1,
    items: [
      {
        xtype: 'panel',
        id: 'ypa-container',
        height: dashboard_y,
        layout: {
          align: 'center',
          type: 'fit'
        },
        items: [
          {
            xtype: 'combo',
            displayField: 'name',
            width: 300,
            margin: '10 50 10 50',
            queryMode: 'local',
            typeAhead: true,
            store: ypaStore,
            displayField: 'tier',
            blankText: 'Field not selected',
            emptyText: 'Select Tier:'
          }
        ]
      }
    ]
  });

  tmp_combo_yta_data = [['Bronze', ''], ['Silver', ''], ['Gold', '']];

  ytaStore = Ext.create('Ext.data.ArrayStore', {
    fields: [
      {
        name: 'tier'
      }, {
        name: 'destination'
      }
    ]
  });

  ytaStore.loadData(tmp_combo_yta_data);

  yta = Ext.create('YMU.View.Containers.VContainer', {
    id: 'yta',
    title: 'YTA',
    flex: 1,
    items: [
      {
        xtype: 'panel',
        id: 'yta-container',
        height: dashboard_y,
        layout: {
          align: 'center',
          type: 'fit'
        },
        items: [
          {
            xtype: 'combo',
            displayField: 'name',
            width: 300,
            margin: '10 50 10 50',
            queryMode: 'local',
            typeAhead: true,
            store: ytaStore,
            displayField: 'tier',
            blankText: 'Field not selected',
            emptyText: 'Select Tier:'
          }
        ]
      }
    ]
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
      }, ypa, yta, {
        title: 'MY COMPLETIONS',
        html: ''
      }, {
        title: 'DEALER REPORT',
        html: ''
      }
    ]
  });

  authenticatedContainer = Ext.create('YMU.View.Containers.VContainer', {
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
    return Ext.getCmp("dashboardContainer").logIn();
  };

  Ext.define('YMU.View.DataTabs.DashboardTabs', {
    extend: 'YMU.View.Containers.HContainer',
    id: 'dashboardContainer',
    height: dashboard_y,
    items: [authenticatedContainer, loggedIn],
    constructor: function(config) {
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
      this.removeAll(true);
      this.add(authenticatedContainer);
      this.add(loggedIn);
      return this.doLayout();
    }
  });

}).call(this);
