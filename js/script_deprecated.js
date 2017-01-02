"use strict";

$(function () {
    var frontendOnForeground = false;

    $(".i-close-button").click(function () {
        $(".desktop-ide").addClass("desktop-ide-anim");
        $(".desktop-bar-ide").addClass("desktop-bar-anim");
        $(".ide-text").addClass("ide-text-anim");
        $(".i-open-button").addClass("i-open-button-anim");
    });

    $(".br-close-button").click(function () {
        $(".desktop-browser").addClass("desktop-br-anim");
        $(".desktop-bar-br").addClass("desktop-bar-anim");
    });

    $(".i-fullscreen-button").click(function () {
        if ($(".desktop-ide").hasClass("desktop-ide-fullscreen")) {
            $(".desktop-ide").removeClass("desktop-ide-fullscreen");
        } else {
            $(".desktop-ide").addClass("desktop-ide-fullscreen");
        }
    });

    $(".br-fullscreen-button").click(function () {
        if ($(".desktop-browser").hasClass(".desktop-br-fullscreen")) {
            $(".desktop-browser").removeClass(".desktop-br-fullscreen");
        } else {
            $(".desktop-browser").addClass(".desktop-br-fullscreen");
        }
    });

    $(".icon-wrapper").hover(function () {
        $(".dock").addClass("dock-hovered");
    }, function () {
        $(".dock").removeClass("dock-hovered");
    });

    $(".icon-wrapper").has(".backend-icon").click(function () {
        if ($(".desktop-ide").hasClass("desktop-ide-anim")) {
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
        if (frontendOnForeground) {
            $(".desktop-browser").css("z-index", 0);
            frontendOnForeground = false;
        }
    });

    $(".icon-wrapper").has(".frontend-icon").click(function () {
        if ($(".desktop-browser").hasClass("desktop-br-anim")) {
            $(".desktop-browser").removeClass("desktop-br-anim");
            $(".desktop-bar-br").removeClass("desktop-bar-anim");
        } else {
            $(".desktop-browser").addClass("desktop-br-anim");
            $(".desktop-bar-br").addClass("desktop-bar-anim");
        }
    });
});