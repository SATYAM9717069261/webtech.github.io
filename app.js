//Book Animation
function book_loader() {
	var front = document.querySelector('.face-front');
	var back = document.querySelector('.face-back');
	var flip = document.querySelector('.book-content');
	var uno = document.querySelectorAll('.book');
	var portada = document.querySelectorAll('#portada');

	var contZindex = 2;
	var customZindex = 1;

	for (var i = 0; i < uno.length; i++) {
		uno[i].style.zIndex = customZindex;
		customZindex--;

		uno[i].addEventListener('click', function (e) {

			var tgt = e.target;
			var unoThis = this;

			unoThis.style.zIndex = contZindex;
			contZindex++;

			if (tgt.getAttribute('class') == 'face-front') {
				unoThis.style.zIndex = contZindex;
				contZindex += 20;
				setTimeout(function () {
					unoThis.style.transform = 'rotateY(-180deg)';
				}, 500);
			}
			if (tgt.getAttribute("class") == 'face-back') {
				unoThis.style.zIndex = contZindex;
				contZindex += 20;

				setTimeout(function () {
					unoThis.style.transform = 'rotateY(0deg)';
				}, 500);
			}

			if (tgt.getAttribute('id') == 'portada') {
				flip.classList.remove("trnsf-reset");
				flip.classList.add("trnsf");
			}
			if (tgt.getAttribute('id') == 'trsf') {
				flip.classList.remove("trnsf");
				flip.classList.add("trnsf-reset");
			}

		});
	}
	// end Book Animantion

}

//  Billing
var checked_data = "";  // variable for bill seperated by ,  

function add_element(event) {
	if (document.getElementById(event.getAttribute("title")).checked == true) {
		checked_data += event.getAttribute("title").split('$')[0];
		checked_data += "$";
		checked_data += event.getAttribute("title").split('$')[1];
		checked_data += ',';
		bill_generator();
		 
		if(document.getElementById("side_bill").style.display!="block"){
			side_bill_show();
		}
	}
	var oper = ""  // temp variable for checked and unchecked data manupulation 
	if (document.getElementById(event.getAttribute("title")).checked == false) {
		oper += event.getAttribute("title").split('$')[0];
		oper += "$";
		oper += event.getAttribute("title").split('$')[1];
		checked_data = checked_data.replace(oper + ",", "");
		bill_generator();
	}
}
function bill_generator() {
	text = "";
	total = 0
	for (const value of checked_data.split(',')) {
		if (value != '') {
			text += "<label for='inputEmail3' class='col-sm-9 col-form-label'>" + value.split("$")[0] + "</label> <div class='col-sm-3'> <div class='input-group-prepend'> <div class='input-group-text' style='height: 39px;'>$</div> <label class='form-control' id='inputEmail3'>" + value.split("$")[1] + "</label></div></div>";
			total += parseInt(value.split("$")[1]);
		}
	}
	document.getElementById("bill").innerHTML = text;
	total_payable(total);
}

function total_payable(total) {
	document.getElementById("payable").innerHTML = "<label for='inputEmail3' class='col-sm-9 col-form-label'>PAYABLE AMOUNT ..........</label><div class='col-sm-3'><div class='input-group-prepend'><div class='input-group-text'>$" + total + "</div></div></div>";
}
// End Billing


// pop up 
function menu_show() {
	// Menu Load
	document.getElementById("myModal").style.display = "block";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('Menu Content').innerHTML = this.responseText;
			book_loader();
		}
	};
	xhttp.open("GET", "book_content.html", true);
	xhttp.send();

	// End Menu Load
}

function menu_close() {
	document.getElementById("myModal").style.display = "none";
}

// End Pop-up

//Side Bill Show 
function side_bill_show() {
	var bill_dict={};
	document.getElementById("book_container").classList.remove("col-7");
	document.getElementById("book_container").style.marginLeft="35px";
	document.getElementById("side_bill").style.display="block";

}
//End Side Bill Show
