"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Window = function () {
    function Window(mainClass, buttonBarClass) {
        _classCallCheck(this, Window);

        this._isHidden = false;
        this._isFullscreen = false;
        this._mainClass = mainClass;
        this._mainContentClass = mainClass + "-content";
        this._mainDOM = $("." + mainClass);
        this._mainContentDOM = $("." + mainClass + "-content");
        this._buttonBarClass = buttonBarClass;
        this._buttonBarDOM = $("." + buttonBarClass);
    }

    _createClass(Window, [{
        key: "triggerFullscreen",
        value: function triggerFullscreen() {
            if (this._isFullscreen) {
                this._mainDOM.removeClass(this._mainClass + "-fullscreen");
                this._isFullscreen = false;
            } else {
                this._mainDOM.addClass(this._mainClass + "-fullscreen");
                this._isFullscreen = true;
            }
        }
    }, {
        key: "hideScreen",
        value: function hideScreen() {
            this._mainDOM.addClass(this._mainClass + "-hide");
            this._buttonBarDOM.addClass(this._buttonBarClass + "-hide");
            this._mainContentDOM.addClass(this._mainContentClass + "-hide");
            this._isHidden = true;
        }
    }, {
        key: "showScreen",
        value: function showScreen() {
            this._mainDOM.removeClass(this._mainClass + "-hide");
            this._buttonBarDOM.removeClass(this._buttonBarClass + "-hide");
            this._mainContentDOM.removeClass(this._mainContentClass + "-hide");
            this._isHidden = false;
        }
    }, {
        key: "toggleScreen",
        value: function toggleScreen() {
            if (this._isHidden) {
                this.showScreen();
            } else {
                this.hideScreen();
            }
        }
    }, {
        key: "setButtons",
        value: function setButtons(redButton, yellowButton, greenButton) {
            var _this = this;

            this._redButton = $("." + redButton);
            this._yellowButton = $("." + yellowButton);
            this._greenButton = $("." + greenButton);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = document.querySelectorAll("." + redButton)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var button = _step.value;

                    button.addEventListener("click", function () {
                        _this.hideScreen();
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            document.querySelector("." + greenButton).addEventListener("click", function () {
                _this.triggerFullscreen();
            });
        }
    }, {
        key: "onForeground",
        value: function onForeground() {
            this._mainDOM.css("z-index", 1);
        }
    }, {
        key: "onBackground",
        value: function onBackground() {
            this._mainDOM.css("z-index", 0);
        }
    }]);

    return Window;
}();

var DockButton = function DockButton(buttonClass, selector, window, otherWindows) {
    _classCallCheck(this, DockButton);

    this._mainDOM = $("." + buttonClass).has("." + selector);
    this._window = window;
    this._otherWindows = otherWindows;

    this._mainDOM.click(function () {
        if (window._isHidden) {

            window.onForeground();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = otherWindows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _window = _step2.value;

                    _window.onBackground();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            window.showScreen();
            currentWindow = window;
        } else {
            if (currentWindow != window) {

                window.onForeground();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = otherWindows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _window2 = _step3.value;

                        _window2.onBackground();
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                currentWindow = window;
            } else {
                window.hideScreen();
            }
        }
    });
};

var frontendWindow = new Window("desktop-browser", "desktop-bar-br");
var backendWindow = new Window("desktop-ide", "desktop-bar-ide");
frontendWindow.setButtons("br-close-button", "br-close-button", "br-fullscreen-button");
backendWindow.setButtons("i-close-button", "i-close-button", "i-fullscreen-button");

var currentWindow = backendWindow;

var frontDock = new DockButton("icon-wrapper", "frontend-icon", frontendWindow, [backendWindow]);
var backDock = new DockButton("icon-wrapper", "backend-icon", backendWindow, [frontendWindow]);

$(".icon-wrapper").hover(function () {
    $(".dock").addClass("dock-hovered");
}, function () {
    $(".dock").removeClass("dock-hovered");
});