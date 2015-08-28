Ext.define('FIFA.model.Club', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    fields: [
        {
            name: 'nombre', type: 'string'
        }, {
            name: 'pais', type: 'string'
        }, {
            name: 'id', type: 'integer'
        }],

    proxy: {
        type: 'rest',
        url: '/services/clubs',
        reader: {
            type: 'json'
        }
    }

});

