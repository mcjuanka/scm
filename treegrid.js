/*
 * jQuery treegrid Plugin - Juan Carlos Muñoz..! - Oct - 2017
 *
 * Copyright 2012, Grégoire Dubourg
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($) {
	var options, $me;
	$.fn.treegrid = function(opts){
		var data = opts.data;
		var $cont = $('<div>');
		if(!$(this).html()){
			options = $.extend({}, $.fn.treegrid.defaults, opts);
			//console.log('No Existe...!');
		}
		//console.log(data);
		$me = $(this);
		$(this).html('');
		//console.log(options.fields);
		$me.append(create());
		return this.each(function() {
			$(this).find("tbody tr").each(function() {
				initialize($(this));
			});
		});
	};
	$.fn.treegrid.defaults = {
		data: [],
		fields: [],
		width: 100,
		height: 350,
		dataAttribute: "level",
		collapsedByDefault: true,
		ignoreClickOn: "input, a",
		onClickEvent: function(){},
		exist: false,
	};
	function create(){
		var data = options.data;
		var flds = options.fields;
		var $nf = 0; //Número de campos de la tabla...!
		var wth = 100
		var $dc = $('<div class="inner">');
		var $tbl = $('<table class="table treegrid table-bordered table-fix">'); //Tabla de datos...!
		var $h_d = $('<thead>'); //Head table data...!
		var $tb = $('<tbody>'); //Body table data...!
		$me.attr("class","outer");
		$dc.append($tbl);
		$me.append($dc);
		if(options.height){
			$me.height(options.height);
			//$tbl.height(options.height);
			$tb.height(options.height);
		}
		var $trd = $('<tr>'); //Tr para el head de la tabla de datos...!
		var $tdx = '';
		if(flds){
			$nf = flds.length;
			var $title_h = '';
			for(var f in flds){
				$tdx = $('<th text-align="center">');
				if(flds[f].width)
					wth = flds[f].width;
				else
					wth = wth;
				$tdx.width(wth);
				$trd.append($tdx);
				/*if(flds[f].title)
					$title_h = '<div>'+flds[f].title.toUpperCase()+'</div>';
				else
					$title_h = '<div>'+flds[f].title.toUpperCase()+'</div>';*/
				if(flds[f].title)
					$title_h = flds[f].title.toUpperCase();
				else
					$title_h = flds[f].title.toUpperCase();
				$tdx.append($title_h);
			}
			$h_d.append($trd);
		}
		$tbl.append($h_d);
		$tbl.append($tb);
		SetResult(data,0);
		function SetResult(json,level){
			var $tr = $('<tr>');
			var $nl = level+1;
			$.each(json,function(i, reg){
				var p_row = "p_row"+reg.idp;
				var c_row = "p_row"+reg.id;
				$tr = $('<tr data-level="'+level+'" class="'+p_row+'" data-stat="0">');
				addClickEvent($tr,reg);
				var in_i = 0;
				for(var f in flds){
					$tdx = $('<td>');
					if(flds[f].width)
						wth = flds[f].width;
					else
						wth = wth;
					$tdx.width(wth);
					if(flds[f].type == 'action'){
						var la = flds[f].ItemAction;
						//var $ac = $('<div class="col-md-12">');
						var $ac = $('<div>');
						for(var a in la){
							var $o = $(la[a].obj);
							addClickEvent($o,reg,la[a].onClick);
							$o.append(la[a].icons)
							$ac.append($o);
						}
						$tdx.append($ac);
						$tr.append($tdx);
					}else{
						if(reg.children){
							if(in_i == 0){
								var $img = $('<img src="img/expand.png" class="img_exp">');
								$img.click(function(event) {
									if($('.'+c_row).attr("data-stat")=='0'){
										$('.'+c_row).attr("data-stat",1);
										$img.attr('src', 'img/collapse.png');
									}else{
										$('.'+c_row).attr("data-stat",0);
										$img.attr('src', 'img/expand.png');
									}
								});
								$tdx.append($img); //.append('<b>'+reg[flds[f].field]);
								in_i = 1;
							}else $tdx.append('<b>'+reg[flds[f].field]);
							$tr.append($tdx);
						}else{
							if(flds[f].field != 'id')
								$tdx.append(reg[flds[f].field]);
							$tr.append($tdx);
						}
					}
				}
				$tr.click(function(){
					if($(this).hasClass("highlight"))
						$(this).removeClass('highlight');
					else
						$(this).addClass('highlight').siblings().removeClass('highlight');
				});
				$tr.appendTo($tb);
				if(reg.children) SetResult(reg.children,$nl);
			});
		}
		return $tbl;
	}
	function addClickEvent($el,row,nFunk){
		$el.click(function(e){
			if(nFunk)
				nFunk.call(this, row);
			else
				options.onClickEvent.call(this, row);
		});
	}
	$.fn.treegrid.load = function(){
		options.data = arguments[0];
		$me.html('');
		$me.append(create());
	}
	$.fn.collapse = function() {
		if ($(this).hasChildren()) {
			$(this).removeClass("expanded").addClass("collapsed");
			childrenOf($(this)).each(function() {
				var $img = $(this).children('td:first').find('img');
				if($(this).attr("data-level")=='1')
					$img.css("padding-left","15px");
				else
					$img.css("padding-left","25px");
				$(this).attr("data-stat",0);
				$img.attr('src', 'img/expand.png');
				$(this).fadeOut( "slow", function(){}).collapse();
			});
		}
		return this;
	};
	$.fn.expand = function() {
		if ($(this).hasChildren()) {
			$(this).removeClass("collapsed").addClass("expanded");
			childrenOf($(this)).each(function() {
				$(this).fadeIn( "slow", function(){});
			});
		}
		return this;
	};
	$.fn.hasChildren = function() {
		return (childrenOf($(this)).length > 0);
	};
	$.fn.toggle = function() {
		if ($(this).hasClass("collapsed"))
			$(this).expand();
		else
			$(this).collapse();
		return this;
	};
	function initialize(node) {
		if (node.hasChildren()){
			var $img = node.children('td:first').find('img');
			$img.click(function(event) {
				var $target = $(event.target);
				if (!$target.is(options.ignoreClickOn)) {
					node.toggle();
					return false;
				}
			});
			/*node.click(function(event) {
				node.addClass('highlight'); //.siblings().removeClass('highlight');
			});*/
			if (options.collapsedByDefault)
				node.collapse();
			else
				node.expand();
		}
	};
	function getLevel(node) {
		return parseInt($(node).data(options.dataAttribute));
	};
	function childrenOf(node) {
		nodeLevel = getLevel(node);
		childrenLevel = nodeLevel + 1;
		return $(node).nextUntil("tr[data-" + options.dataAttribute + "=" + nodeLevel + "]", "tr[data-" + options.dataAttribute + "=" + childrenLevel + "]");
	};
})(jQuery);