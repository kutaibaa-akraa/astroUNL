function hide_show(object) {
	if ( document.getElementById(object).style.display == "block" ) {
		document.getElementById(object).style.display = "none"; }
	else {
		document.getElementById(object).style.display = "block"; }
}

function hide(object) {	document.getElementById(object).style.display = "none"; }
function show(object) {	document.getElementById(object).style.display = "block"; }


/* does 2 things
1. If the class name is not 'astro' (say blank by default), the EDU class is given as the value entered in the form + 'astro'.
2. If the class name is not 'astro' the test the user is sent to is either foo_[test], where [test] is pretest or posttest
*/

function takeTest(test){
  var astroclass = document.getElementById(test).className2.value;
  var assessment = document.getElementById(test).moduleName.value;
	if( astroclass != '' && astroclass != 'astro' ) {
	  if( astroclass.substring(0,5) != 'astro') { document.getElementById(test).className.value = 'astro'+astroclass; }
	  else { document.getElementById(test).className.value = astroclass; }
		document.getElementById(test).testName.value = assessment+'-'+test;
	}
	else {
	  document.getElementById(test).className.value = 'astro';
		document.getElementById(test).testName.value =  assessment+'-test';
	}
	
	if(astroclass.substring(0,5) == 'astro') { document.getElementById(test).className2.value = astroclass.substring(5); }
}


/* NAAP MENU */
function initmenu() {
  var menudiv = document.getElementById('naapmenu');
  
  for ( i=0; i< naapmenu.length; i++ ) {
    // create menu and append menu title
    var menu = document.createElement('div');
    menu.id = 'menu'+i;
    menu.className = 'menu';
            
    menu.onmouseover = function () { show('sub'+this.id); document.getElementById(this.id+'title').style.backgroundColor = 'blue'; }
    menu.onmouseout = function () { hide('sub'+this.id); document.getElementById(this.id+'title').style.backgroundColor = 'black'; }            
    var menutitle = document.createElement('div');
    menutitle.className = 'menutitle';
    menutitle.id = 'menu'+i+'title';
    menutitle.appendChild(document.createTextNode(naapmenu[i][0]));
    menu.appendChild(menutitle);
    
    
    // work on the submenu
    if( naapmenu[i].length > 1 ) {
      var submenu = document.createElement('div');
      submenu.id = 'submenu'+i;
      submenu.className = 'submenu';
    
      for( var j = 1; j< naapmenu[i].length; j++ ) {
        if( naapmenu[i][j] == 'hr' ) {
          var div = document.createElement('div');
          div.className = 'menuhr';        
          submenu.appendChild(div);          
        }
        else if( naapmenu[i][j] ) {
          var link = document.createElement('a');
          link.setAttribute('href','../'+naapmenu[i][j][1]);
          link.appendChild(document.createTextNode(naapmenu[i][j][0]));
          submenu.appendChild(link);
        }          
      }
      if( i == 3 ) { submenu.style.width = '22em'; }
            
      menu.appendChild(submenu);
    }      
    menudiv.appendChild(menu);
  }  
}


function menushow(id) { 
  object.style.display = 'block';
}

function menuhide(object) {
  object.style.display = 'none';
}
