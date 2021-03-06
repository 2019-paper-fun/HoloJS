navigator.getGamepads = function () {
    let gamepads = [];
    nativeInterface.gamepadManager.connectedGamepads.forEach(function (value, key) {
        gamepads.push(value);
    });

    return gamepads;
};

function GamepadManager() {
    this.connectedGamepads = new Map();

    this.ongamepadconnected = function (connectedGamepad) {

        connectedGamepad.index = this.connectedGamepads.size;

        this.connectedGamepads.set(this.connectedGamepads.size, connectedGamepad);

        console.log("gamepad added");
    };

    this.ongamepaddisconnected = function (disconnectedGamepad) {
        this.connectedGamepads.delete(disconnectedGamepad.index);
    };
}

nativeInterface.gamepadManager = new GamepadManager();

