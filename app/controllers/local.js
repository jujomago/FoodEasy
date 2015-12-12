// load the module
var abextras3 = require('com.alcoapps.actionbarextras');

var args = arguments[0] || {};




var url = Alloy.Globals.baseUrl+"data_local.php";



var json;


function alAbrirLocal(evt){
Ti.API.info('alAbrirLocal');

	//activityIndicator.show();
	// set extras once the Activity is available
	abextras3.title = "Local : "+args.title;
	abextras3.titleFont = "Chunkfive.otf";
	abextras3.titleColor="#ffffff";
	abextras3.backgroundColor="#FBA03C";
	abextras3.statusbarColor  = "#CF450A";
	abextras3.navigationbarColor = "#CF450A";

	var activity = $.local.getActivity(),
	  actionBar = activity.actionBar;

 	actionBar.displayHomeAsUp=true;
    actionBar.onHomeIconItemSelected=function(){
      	$.local.close();
    };
}


var xhr = Ti.Network.createHTTPClient({	
    onload: fillDataLocal,
	onerror:function(e){
		alert('error');
	}
});

xhr.open('POST',url);
xhr.send(args);  


function fillDataLocal(data){
	Ti.API.info('fillDataLocal');
	json=JSON.parse(data.source.responseText);	
	//Ti.API.info(json);




	if(json.especialidad.images.length>0){
		for (var i = json.especialidad.images.length - 1; i >= 0; i--) {
			var theimg=json.especialidad.images[i];
			var dataparent=json.especialidad;

			viewPlatoPrecio=Alloy.createController('especialidad'); 
		 	viewPlatoPrecio.getView().id=dataparent.idplato;
		 	viewPlatoPrecio.getView().title=dataparent.title;

			viewPlatoPrecio.updateViews({
		 		"#imagenPlato":{
		 			image:Alloy.Globals.baseUrl+theimg,
		 			defaultImage: "plato.png",
		 			width:Ti.UI.FILL,
					height:Ti.UI.FILL  
		 		},
		 		"#nombrePlato":{ 
		 			text:dataparent.title 
		 		},
		 		"#precioPlato":{
		 			text:"COSTO: "+dataparent.precio 
		 		}
		 	});		 
			$.scrollableEpecialidades.addView(viewPlatoPrecio.getView());
		};


		var elScroller=$.scrollableEpecialidades;

		var ar = elScroller.getViews();
		var t = 0;
		setInterval(function(e) {
		    if(t >= ar.length) {
		        t = 0;
		    }
		    elScroller.scrollToView(t);
		    t++;
		}, 3500);


	}

	if(json.menu.length>0){
		var viewImageLabel;
		for (var i = json.menu.length - 1; i >= 0; i--) {
			var item=json.menu[i];


		viewPlatoPrecio=Alloy.createController('especialidad'); 
		 	viewPlatoPrecio.getView().id=dataparent.idplato;
		 	viewPlatoPrecio.getView().title=dataparent.title;
		 		viewPlatoPrecio.getView().width="50%";
		viewPlatoPrecio.getView().height="230px";
		viewPlatoPrecio.getView().borderWidth=1;
		viewPlatoPrecio.getView().borderColor="white";

			viewPlatoPrecio.updateViews({
		 		"#imagenPlato":{
		 			image:Alloy.Globals.baseUrl+item.image,
		 			defaultImage: "plato.png",
		 			width:Ti.UI.FILL,
					height:Ti.UI.FILL  
		 		},
		 		"#nombrePlato":{ 
		 			text:item.title 
		 		},
		 		"#precioPlato":{
		 			text:item.precio,
		 			bottom:4
		 		},
		 		"#cinta":{
		 			height:"25%"
		 		}
		 	});	


			$.scrollMenu.add(viewPlatoPrecio.getView());
		};
	}

}
