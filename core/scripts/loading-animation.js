var camera, scene, renderer;

var updateFunction = null;

function getStartedMessageWithQr(message) {
    renderMessageCube(
        {
            icon: '\uf4bf',
            text: 'Open XRS file or link.\r\nSay "scan" to open by QR code.',
            iconX: 0.12, iconY: 0.05,
            textX: 0.005, textY: 0.14,
            iconSize: 0.05, textSize: 0.02,
            x: 0, width: 0.30, height: 0.15
        });
}

function getStartedMessageNoQr(message) {
    renderMessageCube(
        {
            icon: '\uf4bf',
            text: 'Open XRS file or link',
            iconX: 0.12, iconY: 0.05,
            textX: 0.005, textY: 0.14,
            iconSize: 0.05, textSize: 0.02,
            x: 0, width: 0.30, height: 0.15
        });
}


function loadingFailedMessage() {
    renderMessageCube(
        {
            icon: '\ue007',
            text: 'The link did not work',
            iconX: 0.04, iconY: 0.09,
            textX: 0.005, textY: 0.14,
            iconSize: 0.07, textSize: 0.015,
            x: 0, width: 0.15, height: 0.15
        });
}
function renderMessageCube(message) {
    scene.remove.apply(scene, scene.children);
    let dpm = 7000;

    let canvas = document.createElement('canvas');
    canvas.width = message.width * dpm;
    canvas.height = message.height * dpm;
    let ctx = canvas.getContext('2d');

    // Draw text
    if (message.icon) {
        ctx.font = (dpm * message.iconSize).toString() + 'px "Segoe MDL2 Assets"';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(message.icon, message.iconX * dpm, message.iconY * dpm);
    }

    if (message.text) {
        ctx.font = (dpm * message.textSize).toString() + 'px "Segoe UI"';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(message.text, message.textX * dpm, message.textY * dpm);
    }

    let texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    let signCube = new THREE.Mesh(
        new THREE.PlaneGeometry(message.width, message.height),
        new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        })
    );

    let backgroundCube = new THREE.Mesh(
        new THREE.BoxGeometry(message.width, message.height, 0.01),
        new THREE.MeshStandardMaterial({
            color: 0xe9a0e4
        })
    );

    let yPosition = navigator.holojs.nativeInterface.headsetPresent === true ? 1.6 : 0;
    let zPosition = navigator.holojs.nativeInterface.headsetPresent === true ? -1.1 : -0.5;

    backgroundCube.position.set(message.x, yPosition, zPosition - 0.01);
    signCube.position.set(message.x, yPosition, zPosition);
    scene.add(signCube);
    scene.add(backgroundCube);

    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
}

function renderLoadingAnimation() {
    scene.remove.apply(scene, scene.children);
    let geometry = new THREE.OctahedronBufferGeometry(0.10, 0);

    geometry.clearGroups();
    geometry.addGroup(0, 3, 0);
    geometry.addGroup(3, 3, 1);
    geometry.addGroup(6, 3, 2);
    geometry.addGroup(9, 3, 3);
    geometry.addGroup(12, 3, 4);
    geometry.addGroup(15, 3, 5);
    geometry.addGroup(18, 3, 1);
    geometry.addGroup(21, 3, 3);
    geometry.addGroup(24, 3, 5);

    let materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    ];


    let mesh = new THREE.Mesh(geometry, materials);
    let yPosition = navigator.holojs.nativeInterface.headsetPresent === true ? 1.6 : 0;
    mesh.position.set(0, yPosition, -1.5);
    scene.add(mesh);

    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    updateFunction = function () {
        mesh.rotation.y += 0.05;
    };
}

function renderQRScanGuide() {
    scene.remove.apply(scene, scene.children);

    let canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    let ctx = canvas.getContext('2d');

    // Draw outer guide
    ctx.font = '640px "Segoe MDL2 Assets"';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('\ue15b', -20, 620);

    // Draw outer guide
    ctx.font = '120px "Segoe MDL2 Assets"';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('\ue114', 250, 320);

    // Draw help text
    ctx.font = '40px "Segoe UI"';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('Find the QR code', 150, 500);

    let texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    let qrSquare = new THREE.Mesh(
        new THREE.PlaneGeometry(0.10, 0.10),
        new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        })
    );

    qrSquare.position.set(0, 0, -0.5);
    scene.add(camera);
    camera.add(qrSquare);

    var ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);
}

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 1000);
    scene = new THREE.Scene();

    let vrCanvas = document.createElement('canvasvr');
    renderer = new THREE.WebGLRenderer({ canvas: vrCanvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', onWindowResize, false);

    renderer.setAnimationLoop(render);

    navigator.getVRDisplays().then(
        function (value) {
            if (value.length > 0) {
                renderer.vr.enabled = true;
                renderer.vr.setDevice(value[0]);
                value[0].requestPresent([{ source: renderer.domElement }]);
            }
        });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    if (updateFunction !== null) {
        updateFunction();
    }
    renderer.render(scene, camera);
}

init();