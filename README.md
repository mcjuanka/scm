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
var json = "[{id:'11', idp:'1', leaf: true, id: '11', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Municipios', descrip: '', valor: '', vnum: '0', type: ''},{id:'12', idp:'1', leaf: true, id: '12', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Personas prestadoras de servicios públicos', descrip: '', valor: '', vnum: '0', type: ''},{id:'13', idp:'1', leaf: true, id: '13', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Agrupaciones de recicladores', descrip: '', valor: '', vnum: '0', type: ''},{id:'14', idp:'1', id: '14', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Gestores', descrip: '', valor: '', vnum: '0', type: '', children: [{id:'141', idp:'14', id: '141', idp: '14', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Puntos Limpios', descrip: '', valor: '', vnum: '0', type: '', children: [{id:'142', idp:'141', leaf: true, id: '142', idp: '141', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Puntos Limpios -X', descrip: '', valor: '', vnum: '0', type: ''}]}]},{id:'15', idp:'1', leaf: true, id: '15', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Empleados', descrip: '', valor: '', vnum: '0', type: ''},{id:'37', idp:'1', leaf: true, id: '37', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: 'sys_user', nombre: 'Público en General', descrip: '', valor: '', vnum: '0', type: ''},{id:'129', idp:'1', leaf: true, id: '129', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Áreas Metropolitanas', descrip: 'De acuerdo a la ley 1625 de 2012, una entidad administrativa formada por un conjunto de dos o más municipios integrados alrededor de un municipio que sirve de núcleo o metrópoli. Debido a que estas entidades están vinculados entre sí por estrechas relaciones de orden físico, económico y social, se requiere por tanto de una administración coordinada para la programación de su desarrollo y la racional prestación de sus servicios públicos.', valor: '', vnum: '', type: ''},{id:'150', idp:'1', leaf: true, id: '150', idp: '1', idt: '0', idd: '0', vdef: '0', codigo: '', nombre: 'Afiliados Acodal', descrip: '', valor: '', vnum: '0', type: ''}]";

$('.datagrid').treegrid({
  data: json,
  height: 450,
  fields: [
    { title: "Nombres", field: "nombres", type: "text", width: 150},
    { title: "Dirección", field: "direccion", type: "text", width: 150},
    { title: "Teléfono", field: "telefono", type: "text", width: 80},
    { title: "Email", field: "email", type: "text", width: 100},
    { title: "opt", type: "action", width: 60,
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
