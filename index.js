$(document).ready(function(){
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'js/data.json',
        success: ajaxSuccess,
        error: function() {
            alert("Image data cannot be loaded!");
        }
    });
});

function ajaxSuccess(images) {
    var $gallery = $('.gallery');
    $gallery.empty();
    $.each(images, function(i, image){
        $gallery.append("<li>"
                        +"<img src="
                        +"'images/square/"
                        +image.path
                        +"' alt='"
                        +image.title
                        +"'>"
                        +"</li>"
                    );
    });

    $gallery.children().mouseenter(function(event){
        var $img = $(this).find('img');
        $img.addClass("gray");

        var $imgTitle = $img.attr('alt');
        var $path="images/medium/";
        var $info;
        var $Hometown;
        var $area;
        var $taken3;

        $(images).each(function(){
            var title = this.title;
            if (title==$imgTitle) {
                $path = $path+this.path;
                $info = this.description;
                $Hometown= this.city;
                $area = this.country;
                $taken3 = this.taken;
                return;
            }
        });

        $("body").append("<div id='"
                        +"preview"
                        +"'>"
                        +"<img src='"
                        +$path
                        +"' alt='"
                        +$imgTitle
                        +"'>"
                        +"<p>"
                        +$info
                        +"<br>"
                        +$Hometown
                        +", "
                        +$area
                        +" ["
                        +$taken3
                        +"]"
                        +"</p>"
                        +"</div>");

        $("#preview").fadeIn(1000);
        $("#preview").css({
            zIndex: 10,
            top: event.pageY+10,
            left: event.pageX+10
        });
    });

    $gallery.children().mouseleave(function(){
        $(this).find('img').removeClass("gray");
        $("body").find("#preview").remove();
    });

    $gallery.children().mousemove(function(event){
        $("#preview").css({
            zIndex: 10,
            top: event.pageY+10,
            left: event.pageX+10
        });
    });
}
