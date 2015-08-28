Ext.define('FIFA.view.main.master.Tabla', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.tabla',

    requires: [
        'Ext.grid.column.Date'
    ],

    defaultLabel: {},
    title: 'Resultados de la búsqueda',
    glyph:'xf0c9@FontAwesome',
    bind: {
        store: '{futbolistas}',
        title: 'El número de resultados es <span class="count">[{totalFutbolistas}]</span>'
    },

    columns: [{
        name: 'nombre',
        reference: 'gridnombre',
        header: 'Nombre',
        dataIndex: 'nombre',
        flex: 1
    }, {
        name: 'nacionalidad',
        reference: 'gridnacionalidad',
        header: 'Nacionalidad',
        dataIndex: 'nacionalidad',
        flex: 1
    }, {
        name: 'aniosclub',
        reference: 'gridaniosclub',
        header: 'Antigüedad en club',
        dataIndex: 'aniosclub',
        width:'60 px',
        align:'center'
    }, {
        xtype: 'datecolumn',
        name: 'cumpleanios',
        reference: 'gridcumpleanios',
        header: 'Años',
        width:'30 px',
        align:'center',
        dataIndex: 'cumpleanios',
        format:'d-m-Y',
        renderer:function(value){
            var anios=Ext.Date.format(new Date(),'Y')-Ext.Date.format(value,'Y');
            if(Ext.Date.format(new Date(),'m')-Ext.Date.format(value,'m')<0){
                anios--;
            }
            else if((Ext.Date.format(new Date(),'m')-Ext.Date.format(value,'m')===0)&&(Ext.Date.format(new Date(),'d')-Ext.Date.format(value,'d')<0)){
                anios--;
            }
            return anios;
        }
    }, {
        name: 'equipo',
        reference: 'gridequipo',
        header: 'Equipo',
        dataIndex: 'nombreequipo',
        flex: 1
    }, {
        name: 'balonoro',
        reference: 'gridbalonoro',
        header: '¿Balón de oro?',
        align:'center',
        dataIndex: 'balonoro',
        flex: 1,
        renderer:function(value){
            if(value==='Sí'){
                 return '<i class="fa fa-futbol-o" style="background-color:yellow "></i>';
            }
        }
    }]

});