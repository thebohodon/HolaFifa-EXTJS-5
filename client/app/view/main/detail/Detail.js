Ext.define('FIFA.view.main.detail.Detail', {
    extend: 'Ext.form.Panel',

    alias: 'widget.detail',

    requires: [
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.Radio',
        'Ext.form.field.Text',
        'Ext.layout.container.Column',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Fill',
        'FIFA.view.main.detail.DetailCtrl',
        'FIFA.view.main.detail.DetailVM'
    ],

    controller: 'detail',
    viewModel: {
        type: 'detail'
    },
    cls: 'detail',
    layout: 'column',
    glyph: 'xf007@FontAwesome',
    items: [
        {
            xtype: 'textfield',
            name: 'nombre',
            reference: 'nombreDtl',
            fieldLabel: 'Nombre',
            columnWidth: 0.5,
            allowBlank: false,
            dataIndex: 'nombre'
        }, {
            xtype: 'textfield',
            name: 'nacionalidad',
            allowBlank: false,
            reference: 'nacionalidadDtl',
            fieldLabel: 'Nacionalidad',
            columnWidth: 0.5,
            dataIndex: 'nacionalidad'
        }, {
            xtype: 'numberfield',
            name: 'aniosclub',
            reference: 'aniosclubDtl',
            minValue: 0,
            fieldLabel: 'Antigüedad',
            columnWidth: 0.5,
            dataIndex: 'aniosclub',
            value:0
        }, {
            xtype: 'datefield',
            name: 'cumpleanios',
            allowBlank: false,
            reference: 'cumpleaniosDtl',
            fieldLabel: 'Cumpleaños',
            columnWidth: 0.5,
            format: 'd-m-Y',
            dataIndex: 'cumpleanios'
        }, {
            xtype: 'combobox',
            name: 'idequipo',
            reference: 'clubDtl',
            bind: {
                store: '{clubs}'
            },
            displayField: 'nombre',
            valueField: 'idequipo',
            fieldLabel: 'Club',
            columnWidth: 0.5,
            dataIndex: 'idequipo'
        }, {
            xtype: 'radiogroup',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            fieldLabel: '¿Balón de Oro?',
            reference: 'balonoro',
            defaultType: 'radiofield',
            columnWidth: 0.5,
            items: [
                {
                    xtype: 'radiofield',
                    name: 'balonoro',
                    boxLabel: 'Sí',
                    reference: 'si',
                    inputValue: true
                }, {
                    xtype: 'radiofield',
                    name: 'balonoro',
                    boxLabel: 'No',
                    reference: 'no',
                    inputValue: false
                }
            ]
        }
    ],
    bbar: [
        {
            xtype: 'tbfill'
        },
        {
            text: 'Resetear',
            handler: 'limpiar',
            glyph: 'xf0e2@FontAwesome'
        },

        {
            text: 'Guardar',
            handler: 'guardar',
            formBind: 'true',
            glyph: 'xf0c7 @FontAwesome'
        }
    ]
});