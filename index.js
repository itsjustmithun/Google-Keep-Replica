 var clickState = 0;     //simple toggle function logic
 function toggleNav() {
 	var sidebar = document.getElementById("sidebar");
 	var main = document.getElementById("main");
 	if(clickState == 0){
 		sidebar.style.width = "0";
 		main.style.marginLeft = "100px";
 		clickState = 1;		
 	}
 	else{
 		sidebar.style.width = "265px";
 		main.style.marginLeft = "265px";
 		clickState = 0;
 	}
 	
 }


 function loadNotes(label_val) {
 	var grid = document.getElementById("myGrid");
 	for ( var i = 0, len = localStorage.length; i < len; ++i ) {      //iterating the localstorage to fetch notes
 		item = localStorage.getItem( localStorage.key( i ) );
 		var item_array = JSON.parse(item);                        //original value was json string so converting to array

 		if((label_val == 0) || (label_val!=0 && item_array[3]==label_val)){      //condition to sort with labels or not
 			var div = document.createElement('div');     //creating new divs for notes and pushing values
 		div.setAttribute("class","item");   
 		div.setAttribute("id",localStorage.key(i) )
 		if(item_array[0]!="")     //if title is blank condition
 			div.innerHTML = "<strong>"
 		+item_array[0]+"</strong>"+"<br>"+item_array[1]+"<br><br>";
 		else
 			div.innerHTML = item_array[1]+"<br><br>";

 		if(item_array[3]!=null)
 			div.innerHTML += "Label: "+item_array[3]+"<br>";

 		var xy = document.createElement("a");     //creating change color option
 		xy.setAttribute("href", "#");
 		xy.setAttribute("name", localStorage.key(i));
 		xy.innerHTML = document.getElementById("button_color").innerHTML;
 		div.appendChild(xy);

 		var lb = document.createElement("a");     //creating label option
 		lb.setAttribute("href", "#");
 		lb.setAttribute("name", localStorage.key(i));
 		lb.innerHTML = document.getElementById("button_label").innerHTML;
 		div.appendChild(lb);

 		var z = document.createElement("a");   //creating delete button option
 		z.setAttribute("href", "#");
 		z.setAttribute("name", localStorage.key(i));
 		z.setAttribute("onclick", "deleteNote(this.name);");
 		z.setAttribute("style", "float:right;");
 		z.innerHTML = document.getElementById("button_delete").innerHTML;
 		div.appendChild(z);
 		
 		div.style.background = item_array[2];    //changing background of div

 		grid.appendChild(div);
 		}


 		
 		
 	}
 }


 loadNotes(0);




 var x = document.getElementById("input_main");
 var title = document.getElementById("input_title");
 var title_value = document.getElementById("title_value"); 
 var label = document.getElementById("label_value");
 var y = document.getElementById("input_extra");
 var color = document.getElementById("color_value");
 x.addEventListener("focus", myFocusFunction, true);

 function myFocusFunction() {      //display remaining filed when user click on text input
 	title.style.display= "block";
 	y.style.display= "block";
 }
 function submitFunction() {
 	title.style.display= "none";
 	y.style.display= "none";
 	var value = [title_value.value, x.value, color.value, label.value ];
 	localStorage.setItem(Date.now(), JSON.stringify(value));
 	location.reload();
 }

 function deleteNote(id) {
 	if (confirm("Delete this note?")) {
 		localStorage.removeItem(id);
 		location.reload();
 	} else {

 	}
 	
 }

 function changeColor(obj) {     //color change function
 	var id = obj.parentElement.name;         
 	var note = localStorage.getItem(id);
 	var array = JSON.parse(note);
 	array[2] = obj.value;

 	localStorage.setItem(id, JSON.stringify(array));
 	location.reload();
 }



 function changeLabel(obj) {     //color change function
 	var id = obj.parentElement.name;         
 	var note = localStorage.getItem(id);
 	var array = JSON.parse(note);
 	array[3] = obj.value;

 	localStorage.setItem(id, JSON.stringify(array));
 	location.reload();
 }

 function labelLoad(label){
 	var div = document.getElementById("myGrid").innerHTML="";    //clearly div to load new notes according to labels
 	loadNotes(label);
 }