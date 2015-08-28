Ext.define('FIFA.view.main.master.MasterVM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.master',
    requires: [
        'FIFA.model.Futbolista',
        'FIFA.model.Club'
    ],

    stores: {
        futbolistas: {
            model: 'FIFA.model.Futbolista',
            filterOnLoad: false,
            remoteSort: true,
            pageSize: 25,
            remoteFilter: true,
            listeners: {datachanged: 'futbolistaDataChanged'}
        },
        clubs: {
            model: 'FIFA.model.Club',
            filterOnLoad: false,
            remoteSort: true,
            pageSize: 25,
            remoteFilter: true
        }
    }
});