Ext.define('FIFA.view.main.detail.DetailCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.detail',

    requires: [
        'FIFA.model.Futbolista'
    ],

    limpiar: function (bt) {
        var me = this, detailForm = me.getView(), form = detailForm.getForm(), record;
        record = form.getRecord();
        if (record.phantom) {
            form.reset();
        }
        else {
            detailForm.loadRecord(form.getRecord());
            form.clearInvalid();
        }
    },
    loadModel: function (modelSelected) {
        var me = this, model, detail,
            camposSoloLectura = ['nombreDtl', 'nacionalidadDtl', 'cumpleaniosDtl'];

        Ext.Array.each(camposSoloLectura, function (campo) {
            me.lookupReference(campo).setReadOnly(true);
        });

        detail = me.getView();
        FIFA.model.Futbolista.load(modelSelected.getId(), {
            scope: me,
            success: function (record, operation) {
                var balonoro = record.getData().balonoro,
                    si = me.lookupReference('si'),
                    no = me.lookupReference('no');
                if (balonoro === si.boxLabel) {
                    si.setValue(true);
                } else {
                    no.setValue(true);
                }
            },
            callback: function (admin, operation) {
                if (admin.data === null) {
                    Ext.Msg.show({
                        title: 'Error',
                        message: operation.getError().statusText,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                } else {
                    model = admin;
                    detail.getForm().loadRecord(model);
                }
            }
        });

    },
    guardar: function (saveBtn) {
        var me = this, detailForm = me.getView(), form = detailForm.getForm(),
            record = form.updateRecord(form.getRecord()).getRecord();


        if (form.isValid()) {
            saveBtn.setDisabled(true);
            detailForm.setLoading(true);

            record.save({
                success: function (r, operation) {
                    Ext.Msg.show({
                        title: 'Guardado',
                        message: 'Los datos se han guardado satisfactoriamente.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    detailForm.setLoading(false);
                    saveBtn.setDisabled(false);
                    saveBtn.up('viewportmain').down('master').getController().buscar();
                },
                failure: function (r, operation) {
                    Ext.Msg.show({
                        title: 'Error',
                        message: 'Se ha producido un error al guardar los datos.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                    detailForm.setLoading(false);
                    saveBtn.setDisabled(false);
                }
            });
        } else {
            // TODO show warning message
        }
    }


});
