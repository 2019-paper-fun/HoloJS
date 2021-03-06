function WebSocket(url, protocols) {
    navigator.holojs.nativeInterface.WebSocket.create(this, url, protocols);

    if (typeof this.native === 'undefined') {
        throw "cannot create websocket";
    }

    this.addEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.addEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.removeEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.url = url;
    this.protocols = protocols;

    this.close = function (code, reason) {
        if (arguments.length === 0) {
            this.native = navigator.holojs.nativeInterface.WebSocket.close(this.native);
        } else if (arguments.length === 1) {
            this.native = navigator.holojs.nativeInterface.WebSocket.close(this.native, code);
        } else {
            this.native = navigator.holojs.nativeInterface.WebSocket.close(this.native, code, reason);
        }
    };

    this.send = function (data) {
        navigator.holojs.nativeInterface.WebSocket.send(this.native, data);
    };

    Object.defineProperty(this, 'onopen', {
        get: function () {
            return this.onopenEvent;
        },
        set: function (value) {
            if (this.onopenEvent) {
                this.removeEventListener('open', this.onopenEvent);
            }

            if (value) {
                this.addEventListener('open', value);
            }

            this.onopenEvent = value;
        }
    });


    Object.defineProperty(this, 'onmessage', {
        get: function () {
            return this.onmessageEvent;
        },
        set: function (value) {
            if (this.onmessageEvent) {
                this.removeEventListener('message', this.onmessageEvent);
            }

            if (value) {
                this.addEventListener('message', value);
            }

            this.onmessageEvent = value;
        }
    });

    Object.defineProperty(this, 'onclose', {
        get: function () {
            return this.oncloseEvent;
        },
        set: function (value) {
            if (this.oncloseEvent) {
                this.removeEventListener('close', this.oncloseEvent);
            }

            if (value) {
                this.addEventListener('close', value);
            }

            this.oncloseEvent = value;
        }
    });

    Object.defineProperty(this, 'onerror', {
        get: function () {
            return this.onerrorEvent;
        },
        set: function (value) {
            if (this.onerrorEvent) {
                this.removeEventListener('error', this.onerrorEvent);
            }

            if (value) {
                this.addEventListener('error', value);
            }

            this.onerrorEvent = value;
        }
    });

    Object.defineProperty(this, 'binaryType', {
        get: function () {
            return "arraybuffer";
        },
        set: function (value) {
            if (value !== "arraybuffer") {
                throw "not implemented";
            }
        }
    });

    Object.defineProperty(this, 'readyState', {
        get: function () {
            return navigator.holojs.nativeInterface.WebSocket.readyState(this.native);
        }
    });

    Object.defineProperty(this, 'bufferedAmount', {
        get: function () {
            throw "not implemented";
        }
    });
}