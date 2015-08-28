/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('FIFA.view.main.ViewPortMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewportmain',

    requires: [
        'FIFA.model.Futbolista'
    ],

    nextCard: function (btns, btnBorrar) {
        var me = this,
            layout = me.getView().getLayout();
        layout.next();

        btnBorrar.setDisabled(false);

        Ext.Array.each(btns, function (bt) {
            this.bottonView[layout.getActiveItem().xtype].apply(me, [bt]);
        }, me);
    },

    backCard: function () {
        var me = this,
            viewport = me.getView(),
            layout = viewport.getLayout(),
            numberItem = -1,
            i = 0,
            btns = Ext.ComponentQuery.query('button[view]', viewport),
            master = me.lookupReference('master'),
            gridSelection,
            btnBorrar;

        while (numberItem < 0) {
            if (layout.getActiveItem() === viewport.items.items[i]) {
                numberItem = i;
            }
            i++;
        }
        if (numberItem !== 0) {
            layout.setActiveItem(numberItem - 1);
            Ext.Array.each(btns, function (bt) {
                this.bottonView[layout.getActiveItem().xtype].apply(me, [bt]);
            }, me);
        }
        if (me.getView().getLayout().getActiveItem() === master) {
            gridSelection = master.down('tabla').getSelection();
            btnBorrar = me.lookupReference('borrar');
            gridSelection.length === 0 ? btnBorrar.setDisabled(true) : btnBorrar.setDisabled(false);
        }
    },
    newRecord: function () {
        var me = this,
            detail = me.getView().down('detail'),
            form = detail.getForm(),
            btns,
            btnBorrar,
            camposSoloLectura=['nombreDtl','nacionalidadDtl','cumpleaniosDtl'];

        Ext.Array.each(camposSoloLectura,function(campo){
            detail.getController().lookupReference(campo).setReadOnly(false);
        });

        form.loadRecord(Ext.create('FIFA.model.Futbolista'));
        detail.setTitle('Creación de un nuevo jugador');
        form.reset();

        if (me.getView().getLayout().getActiveItem() !== detail) {
            btnBorrar = me.lookupReference('borrar');
            btns = Ext.ComponentQuery.query('button[view]', me.getView());
            me.nextCard(btns, btnBorrar);
        }

    },
    bottonView: {
        master: function (btn) {
            if (btn.view === 'master') {
                btn.show();
            } else {
                btn.hide();
            }
        },
        detail: function (btn) {
            if (btn.view === 'detail') {
                btn.show();
            } else {
                btn.hide()
            }
        }
    },

    editRecord: function (btnEdit) {
        var me = this, rows, grid, controllerMaster;
        grid = me.getView().down('tabla');
        rows = grid.getSelection();
        controllerMaster = me.getView().down('master').getController();

        if (rows && rows.length > 0) {
            controllerMaster.onFutbolistaDblClick(grid, rows[0]);
        }
    },

    deleteRecord: function (btnDeleteRecord) {
        var me = this,
            viewport = me.getView(),
            layout = viewport.getLayout(),
            activeItem = layout.getActiveItem(),
            record,
            dataList = me.lookupReference('master').down('tabla'),
            detail = me.lookupReference('detail'),
            store;

        if (activeItem === detail) {
            record = detail.getForm().getRecord();
        }
        else {
            record = dataList.getSelection()[0];
        }

        store = dataList.getStore();
        if(!record.phantom){
            Ext.MessageBox.confirm('Borrar futbolista',
                '¿Está seguro que desea borrar este dato?',
                function (action) {
                    if (action === 'yes') {
                        record.erase();
                        if (layout.getActiveItem() === detail) {
                            me.backCard();
                        }
                        store.reload();
                    }
                }
            );
        }else{
            detail.getForm().reset();
        }

    }

})
;
