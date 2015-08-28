/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('FIFA.view.main.ViewPortMain', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.viewportmain',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Card',
        'FIFA.view.main.ViewPortMainController',
        'FIFA.view.main.ViewPortMainVM',
        'FIFA.view.main.detail.Detail',
        'FIFA.view.main.master.Master'
    ],

    require: [
        'FIFA.view.main.master.Master',
        'FIFA.view.main.detail.Detail'
    ],
    controller: 'viewportmain',
    viewModel: {
        type: 'viewportmain'
    },
    cls: 'viewportApp',
    layout: {
        type: 'card'
    },
    title: 'ViewPort de Hola FIFA',
    glyph: 'xf0c8@FontAwesome',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                handler: 'backCard',
                text: 'Volver',
                hidden: true,
                view: 'detail',
                glyph: 'xf177@FontAwesome'
            },
            {
                xtype: 'button',
                handler: 'newRecord',
                text: 'Nuevo',
                glyph: 'xf067@FontAwesome'
            },
            {
                xtype: 'button',
                handler: 'editRecord',
                text: 'Editar',
                disabled: 'true',
                view: 'master',
                marc: 'disable',
                glyph: 'xf044@FontAwesome'
            }, {
                xtype: 'button',
                handler: 'deleteRecord',
                text: 'Borrar',
                disabled: 'true',
                reference: 'borrar',
                marc: 'disable',
                glyph: 'xf068@FontAwesome'
            }
        ]
    }],

    items: [{
        xtype: 'master',
        reference: 'master'
    }, {
        xtype: 'detail',
        reference: 'detail'
    }]
});
