# ~ Dashboard Container
# TODO: Modularize!!
# TODO: Add logic for authentication.
# TODO: Remove hardcoded layout parameters h/w (x/y).
# TODO: Define instead of Create to persist layouts of the components.
dashboard_y = 300
renderAction = (val) ->
    "<img height=15px align=middle src='images/act_" + val + ".png'>"

sliderPanel = Ext.create 'YMU.View.Sliders.SliderPanel', {height:320,flex:5}
loginPanel  = Ext.create 'YMU.View.Forms.LoginPanel', {height:320,flex:2}

#   TODO: Needs Lougout    
loggedIn = Ext.create 'Ext.Panel'
    id: 'loggedInPanel'
    title:'Your Profile'
    height:dashboard_y
    flex: 1
    html:"<div class='ymu-dashbaord'>
            <div class='ymu-dashboard-desc'>
                Your Profile
            </div>
          </div>"
loggedOut = Ext.create 'Ext.Panel'
    id: 'loggedOutPanel'
    title:'Log In'
    height:dashboard_y
    flex: 1
    html:"<div class='ymu-dashbaord'>
            <div class='ymu-dashboard-desc'>
                Log In
            </div>
          </div>"
#   Not Authenticated
notAuthenticatedContainer = Ext.create 'YMU.View.Containers.HContainer',
{ 
      id: 'publicContainer',
      flex: 3
      items: [
          sliderPanel
          loginPanel
      ],
}
#   Authenticated
#   Temporary Data Object
tmp_sales_incentive_data = [
    [
        '2011 Star Walk-Around Challenge',
        'start', 
        '',
        ''
    ]
    [
        '2011 ATV/SXS Walk-Around Challenge',
        '',
        'Completed',
        '11/17/2011'
    ]
    [
        '2011 Motorcycle Walk-Around CHallenge',
        'start',
        'In Progress',
        ''
    ]
]
#   Sales Incentive Data Store
#   TODO: Move to separate file and make more adaptive to other data sources.
dbSalesStore = Ext.create 'Ext.data.ArrayStore'
    fields: [
        {name: 'activity_name'}
        {name: 'action'}
        {name: 'status'}
        {name: 'completion_date', type: 'date'}
    ]
#   Manually Load Data Store
dbSalesStore.loadData(tmp_sales_incentive_data)
#   Dashboard Grid Item
dbSalesGrid = Ext.create 'Ext.grid.GridPanel'
    id: 'dashboardSalesGrid'
    title: 'SALES INCENTIVES'
    store: dbSalesStore,
    columns: [
        {header: 'Activity Name', width: 280, sortable: true, dataIndex: 'activity_name'},
        {header: 'Action', width: 160, sortable: true, dataIndex: 'action', renderer: renderAction }
        {header: 'Status', width: 150, sortable: true, dataIndex: 'status'},
        {header: 'Completion Date', width: 100, sortable: true, dataIndex: 'completion_date', renderer: Ext.util.Format.dateRenderer('d/m/Y')},
    ],
    autoHeight:true,
    height: dashboard_y-80,
    width:640,
    frame:true
#	TMP: Tab Panels
ypa = Ext.create 'YMU.View.Containers.VContainer',
{ 
      id: 'publicContainer',
      flex: 1
      items: [
          {html:''},
      ],
}
#   Dashboard Authenticated Tabs
authenticatedTabs = Ext.create 'Ext.TabPanel'
    activeTab: 0
    autoWidth: true
    autoHeight: true
    plain: true
    layout: 'fit'
    left: -2
    width: 725
    height: dashboard_y-80
    defaults:
        autoScroll: true
    items: [
        dbSalesGrid,
        {title:'YSA', html:''},
        {title:'YPA', html:''},
        {title:'YTA', html:''},
        {title:'MY COMPLETIONS', html:''},
        {title:'DEALER REPORT', html:''}
    ]
#   Authenticated Container
#   TODO: Check on construct credentials or cookies
#   TODO: Figure out if we want the side panel inside/outside this
#   TODO: Do not display if authentication fails.
authenticatedContainer = Ext.create 'YMU.View.Containers.VContainer',
{ 
      id: 'authenticatedContainer',
      title: 'Training Dashboard',
      layout:
          type: 'vbox'
      height: dashboard_y,
      flex: 3
      items: [
          {
              id: 'authenticatedTopBarPanel'
              xtype: 'panel'
              buttonAlign: 'right'
              items: [
                  {xtype: 'button',text: 'YMU ONLINE', href:'https://yamaha-dealers.com/SumTotal/', margin: '0 0 5 650'},
              ]
          }
          authenticatedTabs
      ],
}
#   Authentication Logic
#   TODO: Add custom event listners and fireevents instead
authenticate = () ->
    Ext.getCmp("dashboardContainer").logIn()
#   Dashboard Parent
Ext.define 'YMU.View.DataTabs.DashboardTabs',
      extend: 'YMU.View.Containers.HContainer',
      id: 'dashboardContainer'
      height: dashboard_y
      items: [
          authenticatedContainer
          loggedIn
      ],
      constructor: (config) ->
          # Check Credentials/Cookies Temp: Check URL Params
          # TODO: Have loginPanel send parameters
          # TODO: Listen to custom events instead of just calling login
          # TODO: Event from button should also pass fields to verify credentials
          # TODO: Login action should persist some information in cookie or such for init
          #console.log("dashboard")
          this.initConfig(config)
          this.callParent(arguments)
          #this.addEvents('login', 'logout')
          this.logOut()
          loginPanel.getComponent("formFields").getComponent("loginButton").on('click', this.logIn, this);
      logOut: () ->
          this.removeAll(false)
          this.add(notAuthenticatedContainer)
          this.doLayout()
      logIn: () ->
          #console.log(this)
          this.removeAll(true)
          this.add(authenticatedContainer)
          this.add(loggedIn)
          this.doLayout()
