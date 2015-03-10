var container = document.getElementById('container');

var camera, scene, renderer, controls, light;

var plane;

init(container);
animate();
render();

function setCameraPositionToHome() {
    camera.position.set(-500,-1800, 3400);
    camera.setViewOffset( window.innerWidth, window.innerHeight, 330, -160, window.innerWidth, window.innerHeight );
}

function init(container) {

    // Camera

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    setCameraPositionToHome();

    scene = new THREE.Scene();

    // ambient
    scene.add(new THREE.AmbientLight( 0x222222 ) );

    // Cubes

    for (var i = 0; i < table.length; i++) {
        var count = table[i][1];

        var tableRowModule = 15;
        var height = 190;
        var width = 150;
        var margin = 60;

        var depth = Math.trunc(count/7000);
        addMesh(height, width, depth, function (mesh) {
            mesh.position.x = ((i % tableRowModule) * (height + margin)) - 1300;
            mesh.position.y = (Math.trunc(i / tableRowModule) * - (width + margin)) + 550;
            mesh.position.z = depth / 2;
            scene.add(mesh);

            var edges = new THREE.EdgesHelper( mesh, 0x7FFFFF);
            edges.material.linewidth = 1;

            scene.add(edges);
        });
    }

    // Canvas

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Controls

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    // Listeners

    window.addEventListener('resize', onWindowResize, false);
}

function addMesh(width, height, depth, callback) {
    var geometry = new THREE.BoxGeometry(width, height, depth);

    var material = new THREE.MeshLambertMaterial( {
        color: 0x00ffff,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        shading: THREE.FlatShading,
        transparent: true,
        opacity: 0.9,
        overdraw: 0.1 // for canvasRenderer only
    } );

    //var material = new THREE.MeshBasicMaterial({vertexColors: THREE.NoColors, overdraw: false, color: 0x00ffff, transparent: true, opacity: 0.9});

    var mesh = new THREE.Mesh(geometry, material);

    callback(mesh);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}