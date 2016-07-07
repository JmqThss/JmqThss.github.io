//解决IE8不支持getElementsByClassName
if (!document.getElementsByClassName) { 
	document.getElementsByClassName = function (className) {
	//document["getElementsByClassName"] = function (className) {
	    var children = document.getElementsByTagName('*');
	    var elements = new Array();
	    for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        var classNames = child.className.split(' ');
	        for (var j = 0; j < classNames.length; j++) {
	            if (classNames[j] == className) {
	                elements.push(child);
	                break;
	            }
	        }
	    }
	    return elements;
	}
};

function $(arg) {
	if (arg[0] == '#')  {
		var id = arg.substr(1, arg.length-1);
		return document.getElementById(id);
	}
	else if (arg[0] == '.') {
		var classname = arg.substr(1, arg.length-1);
		return document.getElementsByClassName(classname);
	}
	else return document.getElementsByTagName(arg);
}

var pt = Object.prototype;
pt.attr = function() {
	if (arguments.length == 1) {
		if (!(this instanceof HTMLElement)) return "The element is not a DOM HTMLElement";
		else if (typeof this.attributes[arguments[0]] == "undefined") return arguments[0]+" is not found";
		return this.attributes[arguments[0]].value;
	}
	else if (arguments.length > 1) {
		if (!(this instanceof HTMLElement)) return "The element is not a DOM HTMLElement";
		else if (typeof this.attributes[arguments[0]] == "undefined") return arguments[0]+" is not found";
		return this.setAttribute(arguments[0], arguments[1]);
	}
	else return "Wrong Attribute Arguments";
}

//back to top button ================================================================================
var BackToTop = document.getElementById("BackToTopBtn");

function backTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },1)
}
// press Ctrl-Z  to go back to top
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.ctrlKey && evt.keyCode == 90) {
        backTop(1000);
    }
};
// hide the button when at top 
function hide(){
    var y = document.body.scrollTop;
    if(y <= 20){
    	BackToTop.style.visibility = "hidden";
    }
    else{
    	BackToTop.style.visibility = "visible";    	
    }
}

hide();

// place the button at different corners  
BackToTop["init"] = function() {
    if (typeof arguments[0] == "object") {
        for (x in arguments[0]) {
            if (x == 'x') {
                BackToTop.style.marginLeft = arguments[0][x] + 'px';
            }
            else if (x == 'y') {
                BackToTop.style.marginTop = arguments[0][x] + 'px';
            }
            else if (x == 'LeftUp' && arguments[0][x] == true) {
                BackToTop.style.marginLeft = "0%";
                BackToTop.style.marginTop = "0%";
            }
            else if (x == 'RigthUp' && arguments[0][x] == true) {
                BackToTop.style.marginLeft = "80%";
                BackToTop.style.marginTop = "0%";
            }
            else if (x == 'LeftDown' && arguments[0][x] == true) {
                BackToTop.style.marginLeft = "0%";
                BackToTop.style.marginTop = "75%";
            }
            else if (x == 'RightDown' && arguments[0][x] == true) {
                BackToTop.style.marginLeft = "80%";
                BackToTop.style.marginTop = "75%";
            }
        }
    }
}

// the modal part ================================================================================
var Modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Control drag mode
var draggable = true; 

// Close Key
var close = 27;  //数字27代表esc 这个键位， 更改这个数字来换键位

// When the user clicks the button, open the modal
btn.onclick = function() {
    Modal.style.display = "block";
}
// When the user press esc, close the modal

document.onkeydown = function(evt){
	evt = evt || window.event;
	console.log(evt.keyCode);
    if (evt.keyCode == close) {				
        Modal.style.display = "none";
    }
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == Modal) {
        Modal.style.display = "none";
    }
}

// Modal.init =====================================================================================
Modal["init"] = function() {
    if (typeof arguments[0] == "object") {
        for (x in arguments[0]) {
            if (x == 'content') {
                console.log(arguments[0][x]);
                this.getElementsByTagName('p')[0].innerHTML = arguments[0][x];
            }
            else if (x == 'draggable') {
                if (arguments[0][x] == false) draggable = false;
                else if (arguments[0][x] == true) draggable = true;
            }
            else if (x == 'closeKey') {
                close = arguments[0][x];
            }
        }
    }
}
//================================================================================-===================

// draggable modal ================================================================================
var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    //console.log("drag: " + x_elem + ',' + y_elem);
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
    //console.log("drag: " + x_elem + ',' + y_elem);
}

// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

// Bind the functions...
Modal.onmousedown = function () {
    
    if (draggable) _drag_init(this);
    return false;
};

document.onmousemove = _move_elem;
document.onmouseup = _destroy;

//===================================================================================================