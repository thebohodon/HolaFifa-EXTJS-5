Ext.define('FIFA.view.main.master.MasterCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.master',

    buscar: function (bt) {
        var me = this,
            store,
            search = me.lookupReference("searchform"),
            params = search.getForm().getValues(),
            value,
            filters,
            tabla = me.lookupReference("tabla");
        filters = [
            {
                property: 'filter',
                value: true
            }
        ];

        store = tabla.getStore();

        Ext.each(Ext.Object.getKeys(params), function (name) {
            value = params[name];
            if (value !== '' && value !== null) {
                filters[filters.length] = {
                    property: name,
                    value: value
                };
                console.log('Property: ' + name + '. Value: ' + value);
            }
        });

        store.clearFilter(true);
        store.filter(filters, null, true);

        store.load(1, {
            callback: function (records, operation, success) {
                if (!success) {
                    Ext.Msg.show({
                        title: 'Error',
                        message: operation.getError().statusText,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    //TODO ..
                }
            }
        });
    },

    limpiar: function (bt) {
        var me = this;
        me.lookupReference('searchform').reset();
    },

    futbolistaSelChange: function (futbolistaModel, futbolistaSelection) {
        var me = this,
            viewport = me.getView().up('viewportmain'),
            buttons = Ext.ComponentQuery.query('button[marc="disable"]', viewport);

        if (futbolistaSelection.length) {
            Ext.Array.each(buttons, function (btn) {
                btn.setDisabled(false);
            });
        } else {
            Ext.Array.each(buttons, function (btn) {
                btn.setDisabled(true);
            });
        }
    },

    onFutbolistaDblClick: function (grid, modelSelect) {
        var me = this,
            viewport = me.getView().up('viewportmain'),
            viewportController = viewport.getController(),
            detailController = viewportController.lookupReference('detail').getController(),
            btns = Ext.ComponentQuery.query('button[view]', viewport),
            btnBorrar = viewport.getController().lookupReference('borrar');

        viewportController.nextCard(btns, btnBorrar);
        detailController.loadModel(modelSelect);
        viewportController.lookupReference('detail').setTitle(modelSelect.getData().nombre);

    },

    futbolistaDataChanged: function (store) {
        this.getViewModel().set('totalFutbolistas', store.getCount() > 0 ? store.getTotalCount() : 0);
        this.lookupReference('tabla').getSelectionModel().deselectAll();
    }
})
;
