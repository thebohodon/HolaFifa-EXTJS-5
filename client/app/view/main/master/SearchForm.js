Ext.define('FIFA.view.main.master.SearchForm', {
    extend: 'Ext.form.Panel',

    alias: 'widget.searchform',

    cls:'searchform',

    requires: [
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.Radio',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill'
    ],

    layout: 'vbox',
    fieldDefaults: {
        labelAlign: 'left',
        labelPad: 1,
        labelSeparator: ':',
        labelWidth: 120,
        width:'90%'
    },
    title: 'Buscador',
    glyph:'xf276@FontAwesome',

    items: [
        {
            xtype: 'textfield',
            name: 'nombre',
            reference: 'nombre',
            fieldLabel: 'Nombre'
        }, {
            xtype: 'textfield',
            name: 'nacionalidad',
            reference: 'nacionalidad',
            fieldLabel: 'Nacionalidad'
        }, {
            xtype: 'numberfield',
            name: 'aniosclub',
            reference: 'aniosclub',
            fieldLabel: 'Antigüedad en club'
        }, {
            xtype: 'datefield',
            name: 'cumpleanios',
            reference: 'cumpleanios',
            fieldLabel: 'Cumpleaños'
        }, {
            xtype: 'combobox',
            name: 'idequipo',
            bind: {
                store: '{clubs}'
            },
            reference: 'equipo',
            fieldLabel: 'Equipo',
            displayField: 'nombre',
            valueField: 'id'
        }, {
            xtype: 'radiogroup',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            fieldLabel: '¿Balón de Oro?',
            reference: 'balonoro',
            defaultType: 'radiofield',
            items: [{
                xtype: 'radiofield',
                name: 'balonoro',
                boxLabel: 'Sí',
                inputValue: true
            }, {
                xtype: 'radiofield',
                name: 'balonoro',
                boxLabel: 'No',
                inputValue: false
            }]

        }
    ],
    bbar: [
        {
            text: 'Limpiar',
            handler: 'limpiar',
            glyph:'xf12d@FontAwesome'
        },
        {
            xtype: 'tbfill'
        },
        {
            text: 'Buscar',
            handler: 'buscar',
            glyph:'xf002@FontAwesome'
        }
    ]
});