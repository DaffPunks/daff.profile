class Window {

    constructor(mainClass, buttonBarClass) {
        this._isHidden = false;
        this._isFullscreen = false;
        this._mainClass = mainClass;
        this._mainContentClass = mainClass + "-content";
        this._mainDOM = $("." + mainClass);
        this._mainContentDOM = $("." + mainClass + "-content");
        this._buttonBarClass = buttonBarClass;
        this._buttonBarDOM = $("." + buttonBarClass);
    }

    triggerFullscreen() {
        if (this._isFullscreen) {
            this._mainDOM.removeClass(this._mainClass + "-fullscreen");
            this._isFullscreen = false;
        } else {
            this._mainDOM.addClass(this._mainClass + "-fullscreen");
            this._isFullscreen = true;
        }
    }

    hideScreen() {
        this._mainDOM.addClass(this._mainClass + "-hide");
        this._buttonBarDOM.addClass(this._buttonBarClass + "-hide");
        this._mainContentDOM.addClass(this._mainContentClass + "-hide");
        this._isHidden = true;
    }

    showScreen() {
        this._mainDOM.removeClass(this._mainClass + "-hide");
        this._buttonBarDOM.removeClass(this._buttonBarClass + "-hide");
        this._mainContentDOM.removeClass(this._mainContentClass + "-hide");
        this._isHidden = false;
    }

    toggleScreen() {
        if (this._isHidden) {
            this.showScreen();
        } else {
            this.hideScreen();
        }
    }

    setButtons(redButton, yellowButton, greenButton) {
        this._redButton = $("." + redButton);
        this._yellowButton = $("." + yellowButton);
        this._greenButton = $("." + greenButton);

        for (let button of document.querySelectorAll("." + redButton)) {
            button.addEventListener("click", () => {
                this.hideScreen();
            });
        }

        document.querySelector("." + greenButton).addEventListener("click", () => {
            this.triggerFullscreen();
        });
    }

    onForeground() {
        this._mainDOM.css("z-index", 1);
    }

    onBackground() {
        this._mainDOM.css("z-index", 0);
    }

}

class DockButton {
    constructor(buttonClass, selector, window, otherWindows) {
        this._mainDOM = $("." + buttonClass).has("." + selector);
        this._window = window;
        this._otherWindows = otherWindows;

        this._mainDOM.click(function () {
            if (window._isHidden) {

                window.onForeground();
                for (let window of otherWindows) {
                    window.onBackground();
                }

                window.showScreen();
                currentWindow = window;
            } else {
                if(currentWindow != window) {

                    window.onForeground();
                    for (let window of otherWindows) {
                        window.onBackground();
                    }

                    currentWindow = window;

                } else {
                    window.hideScreen();
                }
            }
        });
    }
}

let frontendWindow = new Window("desktop-browser", "desktop-bar-br");
let backendWindow = new Window("desktop-ide", "desktop-bar-ide");
frontendWindow.setButtons("br-close-button", "br-close-button", "br-fullscreen-button");
backendWindow.setButtons("i-close-button", "i-close-button", "i-fullscreen-button");

var currentWindow = backendWindow;

let frontDock = new DockButton("icon-wrapper", "frontend-icon", frontendWindow, [backendWindow]);
let backDock = new DockButton("icon-wrapper", "backend-icon", backendWindow, [frontendWindow]);

$(".icon-wrapper").hover(function () {
    $(".dock").addClass("dock-hovered");
}, function () {
    $(".dock").removeClass("dock-hovered");
});