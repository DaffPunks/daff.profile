$(function () {
    let is_hidden = false;


    $(".i-open-button").click(function () {
        $(".desktop-ide").removeClass("desktop-ide-anim");
        $(".desktop-bar-ide").removeClass("desktop-bar-anim");
        $(".ide-text").removeClass("ide-text-anim");
        $(".i-open-button").removeClass("i-open-button-anim");
        is_hidden = false;
    });

    $(".i-close-button").click(function () {
        $(".desktop-ide").addClass("desktop-ide-anim");
        $(".desktop-bar-ide").addClass("desktop-bar-anim");
        $(".ide-text").addClass("ide-text-anim");
        $(".i-open-button").addClass("i-open-button-anim");
        is_hidden = true;
    });

    $(".i-fullscreen-button").click(function () {
        if($(".desktop-ide").hasClass("desktop-ide-fullscreen")) {
            $(".desktop-ide").removeClass("desktop-ide-fullscreen");
        } else {
            $(".desktop-ide").addClass("desktop-ide-fullscreen");
        }
    });

    $(".icon-wrapper").hover(function () {
       $(".dock").addClass("dock-hovered");
    }, function () {
        $(".dock").removeClass("dock-hovered");
    });

    $(".backend-icon").click(function () {
        if($(".desktop-ide").hasClass("desktop-ide-anim")) {
            $(".desktop-ide").removeClass("desktop-ide-anim");
            $(".desktop-bar-ide").removeClass("desktop-bar-anim");
            $(".ide-text").removeClass("ide-text-anim");
            $(".i-open-button").removeClass("i-open-button-anim");
        } else {
            $(".desktop-ide").addClass("desktop-ide-anim");
            $(".desktop-bar-ide").addClass("desktop-bar-anim");
            $(".ide-text").addClass("ide-text-anim");
            $(".i-open-button").addClass("i-open-button-anim");
        }
    });

});