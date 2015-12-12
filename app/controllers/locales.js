// load the module
var abextras2 = require('com.alcoapps.actionbarextras');

var args = arguments[0] || {};

// variable recibida de la categoria seleccionada
var recIDCAT=args.elid;
var tituloVentana=args.title;


function obtenerLocales(){
	var json_categories=Alloy.Globals.JSON_CATEGORIES;
	for (var i = json_categories.length - 1; i >= 0; i--) {
		if(json_categories[i].id==recIDCAT){
			if(json_categories[i].numLocals>0)
				return json_categories[i].locals;
			else
				alert('La categoria no tiene locales registrados');
				return 0;
		}
	};
	alert('No se encontro el IDCAT');
	return 0;
}




function alAbrirLocales(evt){



	// set extras once the Activity is available
	abextras2.title = "Categorias : "+tituloVentana;
	abextras2.titleFont = "Chunkfive.otf";
	abextras2.titleColor="#ffffff";
	abextras2.backgroundColor="#FBA03C";
	abextras2.statusbarColor  = "#CF450A";
	abextras2.navigationbarColor = "#CF450A";


	var activity = $.locales.getActivity(),
	  actionBar = activity.actionBar;
  		
  	actionBar.displayHomeAsUp=true;
    actionBar.onHomeIconItemSelected=function(){
    	$.locales.close();
    };




	var locales_cat=obtenerLocales();

	if(locales_cat!==0){

		for (key in locales_cat){

		
			var data=locales_cat[key];

		//	 Ti.API.info(data); 

		 	viewLocal=Alloy.createController('fragments/imagelabel'); 
		 	viewLocal.getView().id=key;
		 	viewLocal.getView().title=data.title;
		 	viewLocal.getView().idgrupo=data.idgrupo;
			viewLocal.getView().height="280px";
			viewLocal.getView().top=2;
			

		 	viewLocal.updateViews({
		 		"#ImageView_1":{
		 			image:Alloy.Globals.baseUrl+data.image  
		 		},
		 		"#titleCat":{
		 			text:data.title 
		 		}
		 	});		 			 
			$.localesScrollView.add(viewLocal.getView());
		}
	}


}


function onClicScroll(evt){
	var data={title:evt.source.title,elid:evt.source.id,idgrupo:evt.source.idgrupo};
	var localWindow=Alloy.createController('local',data).getView();
	localWindow.open();
	
}