// load the module
var abextras = require('com.alcoapps.actionbarextras');
var url = Alloy.Globals.baseUrl+"categorias.php";
var json;



$.actInd.show();

// View para el Side Menu
/*	backgroundColor: "#fff"
});


Alloy.CFG.drawermenu=$.drawermenu;
Alloy.CFG.main=main;

var menu=Alloy.createController('menu').getView();

$.drawermenu.init({
    menuview:menu,
    mainview:main,
    duration:200,
    parent: thisWin
});
$.drawermenu.showhidemenu();
*/

var xhr = Ti.Network.createHTTPClient({	
    onload: fillCategories,
	onerror:function(e){
		  var alertDialog = Titanium.UI.createAlertDialog({
              title: 'WARNING!',
              message: 'El servidor no responde.  Intenta reiniciando la aplicacion ',
              buttonNames: ['OK']
            });
            alertDialog.show();
	},
	timeout:6000
});

xhr.open('GET',url);
xhr.send();  


function fillCategories(json){
		
		//$.actInd.show();

      	json = JSON.parse(this.responseText);
      	Alloy.Globals.JSON_CATEGORIES=json;
    	//Ti.API.info('############# RESULTADO: ###########');
      //  Ti.API.info(json);   

		for (var i=0; i < json.length; i++) { 
			var data=json[i];
			
		 	viewCategoria=Alloy.createController('fragments/imagelabel'); 
		 	viewCategoria.getView().id=data.id;
		 	viewCategoria.getView().title=data.title;
			viewCategoria.getView().numLocals=data.numLocals;

		 	viewCategoria.getView().width="50%";
			viewCategoria.getView().height="230px";
			viewCategoria.getView().borderWidth=1;
			viewCategoria.getView().borderColor="white";

		 	viewCategoria.updateViews({
		 		"#ImageView_1":{
		 		//	image:"plato.png"
		 			image:Alloy.Globals.baseUrl+data.image  
		 		}, 
		 		"#titleCat":{
		 			text:data.title 
		 		}
		 	});		 			 
			$.categoryScrollView.add(viewCategoria.getView()) 
		};


		//activityIndicator.hide();
		$.actInd.hide();
		$.index.remove($.actInd);
	//	$.categoryScrollView.show(); 
		

	
	
}



// EVENTS UI


function onClicScroll(evt){

	if(evt.source.id!="categoryScrollView"){
		if(evt.source.numLocals==0){
			alert('Esta categoria todavia no tiene datos, Lo sentimos ...');
		}else{
			var data={title:evt.source.title,elid:evt.source.id};
			var localesWindow=Alloy.createController('locales',data).getView();
			localesWindow.open();
		}
	}

	
}

var searchView = Ti.UI.Android.createSearchView({
    hintText: "Buscar..."
});

searchView.addEventListener("change",function(){
		Ti.API.info('EVENTO SEARCH');
	 		var alertDialog = Ti.UI.createAlertDialog({
              title: 'MESSAGE!',
              message: 'Esta funcion no se encuentra disponsible ahora',
              buttonNames: ['OK']
            });
            alertDialog.show();
});

function alAbrir(evt){

	//activityIndicator.show();
	// set extras once the Activity is available
	abextras.title = "Categorias";
	abextras.titleFont = "Chunkfive.otf";
	abextras.titleColor="#ffffff";
	abextras.backgroundColor="#FBA03C";
	abextras.statusbarColor  = "#CF450A";
	abextras.navigationbarColor = "#CF450A";



	var activity = $.index.getActivity(),
	  actionBar = activity.actionBar;

	abextras.displayShowHomeEnabled=true;
	abextras.displayShowTitleEnabled=true;
	abextras.displayUseLogoEnabled=true;

 
	// now set the menus
	evt.source.activity.onCreateOptionsMenu = function(e){
			Ti.API.info('onCreateOptionsMenu Index');
         //   e.menu.clear();     
			

            e.menu.add({
                title: 'Search',
                actionView : searchView,
                icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
            });

            var sideItemMenu=e.menu.add({
                title: 'Side Menu',           
                icon: "drawericonw@2x.png",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
            });

            sideItemMenu.addEventListener('click',function(){
				 alert('Funcion no disponible por ahora');
				//$.drawermenu.showhidemenu();
            });

	};

}




$.index.open(); 