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
    console.log("hide");
    if(y <= 1000){
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