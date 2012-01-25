var dashboard_y = 300;

Ext.define('YMU.View.DataTabs.DashboardTabs', {
    extend: 'YMU.View.Containers.HContainer',
    //ui: 'dashboard',
    id: 'dashboardContainer',
    height: dashboard_y,
    layout: 'fit',
    items: [{html: 'LOADING...'}],
    afterRender: function (){
		///this.fetchUserInformation()
                this.userInfoCallback('','') 
    },
    constructor: function(config) {
    	this.initConfig(config);
		this.callParent(arguments);
    },
    fetchUserInformation: function(){
    	this.getEl().mask('Refreshing...');
  		Ext.Ajax.request({
			url : '../data/userInfo',
			method : 'GET',
			success : this.userInfoCallback,
			scope : this
		});
    },
    logOff: function(){
  		Ext.Ajax.request({
  			url : '../data/logoff',
  			method : 'GET',
  			success : this.logoffCallback,
  			scope : this
  		});
    },
    logIn: function(){
    	var loginPanel=Ext.ComponentQuery.query('#loginPanel',this)[0];
    	var vals=loginPanel.getForm().getValues();
/*    	Ext.Ajax.request({
    		url : 'https://tsydsas1/sumtotal/app/SYS_login.aspx',
    		withCredentials: true,
    		params : {
    			UserName : vals.username,
    			Password : vals.password,
    			jTimeOffset : 240,
    			ru : '',
    			SOrg : '',
    			NOrg : '',
    			LoginAs : 3,
    			DomainId : '700D22DE18EA1836C728CC881F3D5545954EA89A739D81C68772EBFEADD833E5A7D69A0D04A83982031457387C1BBAB4D98FB8421FE7A129'
    		}
    	});
*/
    	//Do login by form submission
    	loginPanel.submit({
    		url:'../data/login',
    		waitMsg: 'Logging in...',
    		waitTitle: 'Title: Logging in...',
    		scope : this,
			success : this.loginCallback,
			failure : this.failedLoginCallback,
			waitMsg : 'Saving...'
    	});
    	
    },
    showLoginCard: function() {
    	this.removeAll(true);
		//lazy creation of a new Login card
    	this.sliderPanel = Ext.create('YMU.View.Sliders.SliderPanel', {
		    height: 290,
		    flex: 5
		  });

    	var loginPanel = Ext.create('YMU.View.Forms.LoginPanel', {
    			id: 'loginPanel',
    		    height: 290,
    		    flex: 2
    		  });
        loginPanel.getComponent("formFields").getComponent("loginButton").on('click', this.logIn, this);

    	var notAuthenticatedContainer = Ext.create('YMU.View.Containers.HContainer', {
    	    id: 'publicContainer',
    	    items: [this.sliderPanel, loginPanel]
    	  });
    	this.add(notAuthenticatedContainer);
    },
    activityGroupsWithUserCallback: function(response, params) {
		this.showDashboardCard(params.user, Ext.decode(response.responseText));
    },
	showDashboardCard : function(user, activityGroups) {
    	this.removeAll(true);
		// lazy creation of a new dashboard card
		profilePanel = Ext.create('Ext.panel.Panel',{
			id : 'profilePanel',
			title : 'Your Profile',
			flex : 1,
			tpl : "<div class='ymu-dashbaord'><div class='ymu-dashboard-desc'><b>Name:</b> {name}<br><br><b>Dealer#</b>: {dealerNumber}<br><br><b>Dealer Address:</b> {address}<br><br><b>Job title:</b> {jobTitle}<br><br></div></div>",
			buttonAlign : 'center',
			buttons : [ {
				text : 'Logoff',
				id : 'logoff'
			} ]
		});
		dashboardTabs = Ext.create('Ext.tab.Panel', {
			activeTab : 0,
			title : 'Training Dashboard',
			id : 'dashboardTabs',
			tools : [ {
				type : 'refresh',
				tooltip : 'Refresh Dashboard Data',
				scope: this,
				handler : function() {
					this.fetchUserInformation();
				}
			} ],
			autoWidth : true,
			autoHeight : true,
			plain : true,
			left : -2,
			flex : 3,
			height : dashboard_y - 20,
			defaults : {
				autoScroll : true
			}
		});
	
		var dashboardContainer = Ext.create('YMU.View.Containers.VContainer', {
			id : 'authenticatedContainer',
			layout : {
				type : 'hbox',
				align : 'top'
			},
			height : dashboard_y,
			flex : 3,
			items : [ dashboardTabs, profilePanel ]
		});
		this.add(dashboardContainer);
		Ext.ComponentQuery.query('#logoff', profilePanel)[0].on('click', this.logOff, this);

		dashboardTabs.removeAll(true);
		Ext.Object.each(activityGroups, function(key, value) {
			dashboardTabs.add(this.createActivityTab(key, value, user));
		}, this);
		dashboardTabs.add(this.createCompletionsTab(user));
		if (user.employees) {
			dashboardTabs.add(this.createDealerReportTab(user));
		}
		profilePanel.update(user.profile);
		dashboardTabs.setActiveTab(0);
	},
	createActivityTab : function(label, codes, user) {
		if (codes.length) {
			//Simple activities tab
			var activities = [];
			Ext.each(codes, function(code) {
				var acts = user.activities[code];
				if (acts && acts.length > 0) {
					activities = activities.concat(acts);
				}
			}, this);
			var activityStore = Ext.create('Ext.data.ArrayStore', {
				fields : [ 'name', 'status', {
					name : 'completed',
					type : 'date',
					format : 'm-d-Y'
				}, 'url' ],
				data : activities
			});
			return Ext.create('Ext.grid.GridPanel', {
				title : label,
				store : activityStore,
				columns : [ {
					header : 'Activity Name',
					flex : 1,
					dataIndex : 'name'
				}, {
					header : 'Action',
					width : 150,
					dataIndex : 'status',
					align : 'center',
					renderer : this.renderAction
				}, {
					header : 'Completion Date',
					width : 100,
					align : 'center',
					dataIndex : 'completed',
					xtype : 'datecolumn',
					format : 'Y-m-d'
				} ],
				autoHeight : true,
				frame : true
			});
		} else {
			//Grouped activities tab
			var activityGroups = [];
			Ext.Object.each(codes, function(codeLabel, codeGroup) {
				var activities = [];
				Ext.each(codeGroup, function(code) {
					var acts = user.activities[code];
					if (acts && acts.length > 0) {
						Ext.each(acts, function(act) {
							activities.push({
								name : act[0],
								status : act[1],
								completed : act[2],
								url : act[3]
							});
						});
					}
				});
				activityGroups.push({
					name : codeLabel,
					expanded : false,
					iconCls : 'folder',
					children : activities
				});
			});
			var activityStore = Ext.create("Ext.data.TreeStore", {
				fields : [ 'name', 'status', {
					name : 'completed',
					type : 'date',
					format : 'm-d-Y'
				}, 'url' ],
				proxy : {
					type : 'memory'
				}
			});
			activityStore.setRootNode({
				children : activityGroups
			});
			return Ext.create('Ext.tree.Panel', {
				store : activityStore,
				animate : false,
				rootVisible : false,
				lines : true,
				frame : true,
				title : label,
				multiSelect : true,
				singleExpand : true,
				columns : [ {
					xtype : 'treecolumn',
					text : 'Activity Name',
					flex : 2,
					dataIndex : 'name'
				}, {
					header : 'Action',
					width : 200,
					align : 'center',
					dataIndex : 'status',
					align : 'center',
					renderer : this.renderAction
				}, {
					header : 'Completion Date',
					align : 'center',
					dataIndex : 'completed',
					xtype : 'datecolumn',
					format : 'Y-m-d'
				} ]
			});
		}
	},
	createDealerReportTab : function(user) {
		var completionStore = Ext.create('Ext.data.ArrayStore', {
			fields : [ 'employee', 'activity',
					'status', {
						name : 'startDate',
						type : 'date',
						format : 'm-d-Y'
					}, {
						name : 'endDate',
						type : 'date',
						format : 'm-d-Y'
					}, 'score' ],
			groupField : 'employee',
			data : user.employees
		});
		var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
			groupHeaderTpl : '{name}: ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
			startCollapsed : true
		});
		return Ext.create('Ext.grid.GridPanel',{
			title : "Dealer Report",
			store : completionStore,
			features : [ groupingFeature ],
			tbar : [
					"->",
					{					
						xtype : 'button',
						text : 'Export to PDF',
						icon: 'images/pdf.gif',
						cls:'x-btn-text-icon',
						handler : function() {
							window.open("../data/exportPDF?opt=dealerReport","_blank");
						}
					},
					{
						xtype : 'button',
						text : 'Export to Excel',
						icon: 'images/excel.gif',
						cls:'x-btn-text-icon',
						handler : function() {
							window.open("../data/exportExcel?opt=dealerReport","_blank");
						}
					} ],
			columns : [ {
				header : 'Employee Name',
				flex : 1,
				dataIndex : 'employee'
			}, {
				header : 'Activity Name',
				flex : 2,
				dataIndex : 'activity'
			}, {
				header : 'Start Date',
				width : 80,
				align : 'center',
				dataIndex : 'startDate',
				xtype : 'datecolumn',
				format : 'Y-m-d'
			}, {
				header : 'End Date',
				width : 80,
				align : 'center',
				dataIndex : 'endDate',
				xtype : 'datecolumn',
				format : 'Y-m-d'
			}, {
				header : 'Score',
				width : 50,
				align : 'center',
				renderer : this.renderScore,
				dataIndex : 'score'
			}, {
				header : 'Status',
				width : 100,
				align : 'center',
				dataIndex : 'status'
			} ],
			autoHeight : true,
			frame : true
		});
	},
	createCompletionsTab : function(user) {
		var activityStore = Ext.create('Ext.data.ArrayStore', {
			fields : [ 'activity', 'status', {
				name : 'startDate',
				type : 'date',
				format : 'm-d-Y'
			}, {
				name : 'endDate',
				type : 'date',
				format : 'm-d-Y'
			}, 'score' ],
			data : user.completions
		});
		return Ext.create('Ext.grid.GridPanel', {
			title : "Completions",
			store : activityStore,
			tbar : [
					"->",
					{
						xtype : 'button',
						text : 'Export to PDF',
						icon: 'images/pdf.gif',
						cls:'x-btn-text-icon',
						handler : function() {
							window.open("../data/exportPDF?opt=completions","_blank");
						}
					},
					{
						xtype : 'button',
						text : 'Export to Excel',
						icon: 'images/excel.gif',
						cls:'x-btn-text-icon',
						handler : function() {
							window.open("../data/exportExcel?opt=completions","_blank");
						}
					}],
			columns : [ {
				header : 'Activity Name',
				flex : 1,
				sortable : true,
				dataIndex : 'activity'
			}, {
				header : 'Start Date',
				width : 80,
				align : 'center',
				dataIndex : 'startDate',
				xtype : 'datecolumn',
				format : 'Y-m-d'
			}, {
				header : 'End Date',
				width : 80,
				align : 'center',
				dataIndex : 'endDate',
				xtype : 'datecolumn',
				format : 'Y-m-d'
			}, {
				header : 'Score',
				width : 50,
				renderer : this.renderScore,
				align : 'center',
				dataIndex : 'score'
			}, {
				header : 'Status',
				width : 100,
				align : 'center',
				dataIndex : 'status'
			} ],
			autoHeight : true,
			frame : true
		});
	},
    renderAction : function(val, meta, record, rowIx, store, view) {
		if (val) {
			var completed = val.toUpperCase() == "COMPLETED";
			return completed ? "Completed"
					: "<a href='http://nttotaltest1/"
							+ record.get("url")
							+ "' target='_blank'><img height=15px align=middle src='images/act_start.png' border='0'></a>";
		} else {
			return "";
		}
	},
	renderScore: function(val) {
		return val == 0 ? "" : val;
    },
    userInfoCallback : function(response, params) {
    	this.getEl().unmask();
    	//var user = Ext.decode(response.responseText);
        var user = '';
		if (user.profile) {
			this.showDashboardCardForUser(user);
		} else {
			this.showLoginCard();
		}
	},
	showDashboardCardForUser : function(user) {
		Ext.Ajax.request({
			user : user,
			url : '../data/activityGroups',
			method : 'GET',
			disableCache : false,
			success : this.activityGroupsWithUserCallback,
			scope : this
		});
	},
	logoffCallback : function(form, action) {
		this.showLoginCard();
	},
	loginCallback : function(form, action) {
		this.showDashboardCardForUser(action.result.user);
	},
	failedLoginCallback : function(form, action) {
		if (action.result.messages) {
			Ext.Msg.alert('Failed Login', action.result.messages);
		} else {
			Ext.Msg.alert('Failed Login', 'Invalid userid / password');
		}
	}
});
