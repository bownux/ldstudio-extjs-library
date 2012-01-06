(function() {

  Ext.require(['*']);

  Ext.define('YMU.Model.UserModel', {
    extend: 'Ext.data.Model',
    fields: ['username', 'password']
  });

}).call(this);
