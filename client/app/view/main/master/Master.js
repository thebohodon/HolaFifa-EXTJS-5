Ext.define('FIFA.view.main.master.Master', {
    extend: 'Ext.container.Container',

    alias: 'widget.master',
    require: [
        'FIFA.view.main.master.Tabla',
        'FIFA.view.main.master.SearchForm'
    ],

    controller: 'master',
    viewModel: {
        type: 'master'
    },

    layout: {
        type: 'border'
    },
    items: [{
        xtype: 'searchform',
        reference: 'searchform',
        region: 'west',
        width: 330,
        split: true,
        collapsible: true
    }, {
        xtype: 'tabla',
        reference: 'tabla',
        region: 'center',
        listeners: {
            selectionchange: 'futbolistaSelChange',
            itemdblclick: 'onFutbolistaDblClick'
        }
    }]
});