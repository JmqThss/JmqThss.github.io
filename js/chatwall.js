
$body = $("body");
var monitor = false;
var timer;
// DOM for putting messages on the wall
function onWall(nickname, content, img){
    var msg =  $("<li>").attr('class', 'media greydout long').append(
            $("<div>").attr('class', 'media-body').append(
                $("<div>").attr('class', 'media').append(
                    $("<a>").attr('class', 'pull-left').attr('href', '#').append(
                        $("<img>").attr('class','media-object img-circle').attr('src', img)),
                    $("<div>").attr('class','media-body').append(
                        $("<table>").append(
                            $("<td>").append(
                                $("<span>").text(content))),
                        $("<br>"),
                        $("<small>").attr('class', "text-muted").text(nickname),
                        $("<hr>")
                        )
                    )
                )
            );
    // if(content.length > 100 ){

    // }
        // console.log( msg.attr());

    $('.scrollable-menu').append( msg );
}


noti2.innerHTML = noti1.innerHTML;
//noti2.style.display="none";
var srcrollPlay = function(){
    if(noti2.offsetWidth-notification.scrollLeft<=0)
       notification.scrollLeft -= noti1.offsetWidth
    else{
       notification.scrollLeft++
    }
};
var intervalID = setInterval(srcrollPlay, 30);
notification.onmouseover = function() {
    clearInterval(intervalID);
};
notification.onmouseout = function() {
    intervalID = setInterval(srcrollPlay, 30);
};

// get message history when reload 
$.get("https://wall.cgcgbcbc.com/api/messages?num=4", function(data){
    for (li of data)
        onWall(li.nickname, li.content, li.headimgurl);
});
// loading animation here 
$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});
// socket connection 
var socket = io.connect("https://wall.cgcgbcbc.com");
socket.on('connect', function(){
    console.log("connected");
});
// listen to new messages 
socket.on('new message', function(data){
    onWall(data.nickname, data.content, data.headimgurl);    
    var $list = $('li');
    if($list.length > 4){
        if(monitor == true){
            $list[1].remove();
        }
        else{
            $list[0].remove();
        } 
    }   
});
// listen to admin messages 
socket.on('admin', function(data){
    $admin = $("<li>").attr('class', 'media greydout').attr('id', 'admin').append(
            $("<div>").attr('class', 'media-body').append(
                $("<div>").attr('class', 'media').append(
                    $("<div>").attr('class','media-body').append(
                        $("<span>").text(data.content),
                        $("<br>"),
                        $("<small>").attr('class', "text-muted").text(data.nickname),
                        $("<hr>")
                        )
                    )
                )
            );
    $('li:first').replaceWith($admin);
    clearTimeout(timer);
    monitor = true;
    timer = setTimeout(function(){
        monitor = false;
    }, 10000);
});
Emoji.emoji(document.getElementById('msg-container'));
//$('#msg-container').emoji();
