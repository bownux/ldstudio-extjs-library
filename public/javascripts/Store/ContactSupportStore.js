(function() {

  Ext.require('YMU.Model.ContactSupportModel');

  Ext.define('YMU.Store.ContactSupportStore', {
    extend: 'Ext.data.Store',
    requires: ['YMU.Model.ContactSupportModel'],
    model: 'YMU.Model.ContactSupportModel'
  });

}).call(this);
