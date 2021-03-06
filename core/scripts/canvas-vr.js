function CanvasVR() {

    this.context = new WebGLRenderingContext(this);

    this.context.drawingBufferWidth = window.width;
    this.context.drawingBufferHeight = window.height;

    this.releasePointerCapture = function () { };
    this.setPointerCapture = function () { };

    this.focus = function () { };

    this.getBoundingClientRect = function getBoundingClientRect() {
        var rect = {};
        rect.top = 0;
        rect.bottom = this.height;

        rect.width = this.width;
        rect.height = this.height;

        rect.left = 0;
        rect.right = this.width;

        rect.x = 0;
        rect.y = 0;

        return rect;
    };

    this.style = {};

    this.addEventListener = function (eventType, eventHandler) {
        // Let the window element manage canvas events
        navigator.holojs.nativeInterface.eventRegistration.addEventListener(window.native, eventType, eventHandler.bind(this));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        // Let the window element manage canvas events
        navigator.holojs.nativeInterface.eventRegistration.removeEventListener(window.native, eventType, eventHandler.bind(this));
    };

    this.getContext = function getContext(contextType) {
        if (contextType === 'experimental-webgl' || contextType === 'webgl') {
            if (typeof this.context === "undefined") {
                this.context = new WebGLRenderingContext();
            }
            return this.context;
        } else {
            throw "CanvasVR only supports a WebGL rendering context";
        }
    };

    Object.defineProperty(this, 'width',
        {
            get: function () {
                if (navigator.holojs.nativeInterface.headsetPresent === true) {
                    return window.width * 2;
                } else {
                    return window.width;
                }
            },
            set: function (value) {}
        });

    Object.defineProperty(this, 'height',
        {
            get: function () {
                return window.height;
            },
            set: function (value) { }
        });

    Object.defineProperty(this, 'clientWidth',
        {
            get: function () {
                return this.width;
            }
        });

    Object.defineProperty(this, 'clientHeight',
        {
            get: function () {
                return this.height;
            }
        });

    this.setAttribute = function () { };
    this.style = {};
}