Ext.define('FIFA.model.Futbolista', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'id', type: 'integer'
        }, {
            name: 'nombre', type: 'string'
        }, {
            name: 'nacionalidad', type: 'string'
        }, {
            name: 'idequipo', type: 'integer'
        }, {
            name: 'nombreequipo', type: 'string'
        },{
            name: 'aniosclub', type: 'integer'
        }, {
            name: 'cumpleanios', type: 'date', dateFormat: 'd-m-Y'
        }, {
            name: 'balonoro', type: 'boolean', convert: function (data) {
                return (data ? 'Sí' : 'No');
            }
        }
    ],

    proxy: {
        type: 'rest',
        url: '/services/futbolistas',
        reader: {
            type: 'json'
        }
    }

});