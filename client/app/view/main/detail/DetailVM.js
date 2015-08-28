Ext.define('FIFA.view.main.detail.DetailVM', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.detail',
    requires: [
        'FIFA.model.Club'
    ],

    stores: {
        clubs: {
            model: 'FIFA.model.Club',
            filterOnLoad: false,
            remoteSort: true,
            pageSize: 25,
            remoteFilter: true,
            autoLoad: true
        }
    }

});