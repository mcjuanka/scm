# scm
DataGrid and Tree

/*
 * jQuery treegrid Plugin - Juan Carlos Muñoz..! - Oct - 2017
 *
 * Copyright 2012, Grégoire Dubourg
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

Plugin jQuery, q crea una tabla, con la información de un array json, si el array contiene nodos, los carga en forma de tree.

Modo de uso:
<div class="datagrid"></div>
var json = "[{id:'1', idp:'0', id: '1', idp: '0', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Terceros', descrip: '', valor: '', vnum: '0', type: '', children: [{id:'11', idp:'1', leaf: true, id: '11', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Municipios', descrip: '', valor: '', vnum: '0', type: ''},{id:'12', idp:'1', leaf: true, id: '12', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Personas prestadoras de servicios públicos', descrip: '', valor: '', vnum: '0', type: ''},{id:'13', idp:'1', leaf: true, id: '13', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Agrupaciones de recicladores', descrip: '', valor: '', vnum: '0', type: ''},{id:'14', idp:'1', id: '14', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Gestores', descrip: '', valor: '', vnum: '0', type: '', children: [{id:'141', idp:'14', id: '141', idp: '14', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Puntos Limpios', descrip: '', valor: '', vnum: '0', type: '', children: [{id:'142', idp:'141', leaf: true, id: '142', idp: '141', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Puntos Limpios -X', descrip: '', valor: '', vnum: '0', type: ''}]}]}]}]";

$('.datagrid').treegrid({
  data: json,
  height: 450,
  fields: [
    { title: "ID", field: "id", type: "text", width: 10},
    { title: "Nombre", field: "nombre", type: "text", width: 250},
    { title: "opt", type: "action", width: 40,
      ItemAction: {
        edit: {
          obj: '<button type="button" class="btn btn-default" title="Editar registro...!">',
          icons: '<span class="glyphicon glyphicon-edit">',
          onClick: function(row){
            console.log(row);
          },
        },
        del: {
          obj: '<button type="button" class="btn btn-default" title="Borrar registro...!">',
          icons: '<span class="glyphicon glyphicon-remove">',
          onClick: function(row){
            console.log(row);
          },
        }
      }
    },
  ],
  onClickEvent: function(row){
    //console.log(row);
  },
});
