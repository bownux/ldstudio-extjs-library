
  Ext.require('YMU.Model.FooterModel');

  Ext.define('YMU.Store.FooterStore', {
    extend: 'Ext.data.Store',
    requires: ['YMU.Model.FooterModel'],
    model: 'YMU.Model.FooterModel'
  });
