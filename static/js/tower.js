var container = document.getElementById('container');

var camera, scene, renderer, controls, light;

var plane;
var theta = 0;

init(container);
animate();
render();

function setCameraPositionToHome() {
    camera.position.set(-1150, -400, 3100);
    camera.setViewOffset(window.innerWidth, window.innerHeight, 260, -150, window.innerWidth, window.innerHeight);
}

function init(container) {

    // Camera

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    setCameraPositionToHome();

    scene = new THREE.Scene();

    // ambient
    scene.add(new THREE.AmbientLight(0x222222));

    // Cubes

    for (var i = 0; i < table.length; i++) {
        var count = table[i][1];

        var tableRowModule = 15;
        var height = 190;
        var width = 150;
        var margin = 60;

        var depth = Math.floor(count / 7000);


        addMesh(height, width, depth, function (mesh) {
            mesh.position.x = ((i % tableRowModule) * (height + margin)) - 1300;
            mesh.position.y = (Math.floor(i / tableRowModule) * -(width + margin)) + 550;

            mesh.position.z = depth / 2;

            scene.add(mesh);

            var edges = new THREE.EdgesHelper(mesh, 0x7FFFFF);
            edges.material.linewidth = 1;

            scene.add(edges);
        });
        //*/


        addTextPlane(table[i], height, width, function(mesh) {

            mesh.position.x = ((i % tableRowModule) * (height + margin)) - 1300;
            mesh.position.y = (Math.floor(i / tableRowModule) * -(width + margin)) + 550;
            mesh.position.z = depth;
            scene.add(mesh);

            var edges = new THREE.EdgesHelper(mesh, 0x7FFFFF);
            edges.material.linewidth = 2;
            scene.add(edges);
        });
        //*/
    }

    // Canvas

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Controls

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.addEventListener('change', render);

    // Listeners

    window.addEventListener('resize', onWindowResize, false);
}

function addMesh(height, width, depth, callback) {
    var geometry = new THREE.BoxGeometry(height, width, depth);

    var material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        shading: THREE.FlatShading,
        transparent: true,
        opacity: 0.9,
        overdraw: 0.1 // for canvasRenderer only
    });

    var mesh = new THREE.Mesh(geometry, material);

    callback(mesh);
}

function addTextPlane(data, height, width, callback) {
    var text = data[0];
    var geometry = new THREE.BoxGeometry(height, width, 0);

    var back_color = 'rgba(0,127,127,0.5)';
    var font = "bold 40px Helvetica, sans-serif";
    var text_color = "rgba(255, 255, 255, 1)";
    var rect_width = 300; //... power of two
    var rect_depth = 150; //... power of two

    var temp_canvas = document.createElement('canvas');
    var temp_context = temp_canvas.getContext('2d');

    temp_context.fillStyle = back_color;
    temp_context.fillRect(0, 0, rect_width, rect_depth);//... fixed size rectangle, using powers of two

    temp_context.font = font;
    temp_context.fillStyle = text_color;
    temp_context.fillText(text, 70, 55); //... offset_width, offset_depth of start point of text string (bottom left corner of 1st char).
    temp_context.fillText(data[1], 115, 135);

    //... NB texture doesn't need to know name of the context, just the name of the canvas
    var temp_texture = new THREE.Texture(temp_canvas);

    temp_texture.minFilter = THREE.LinearFilter;//THREE.NearestFilter;//... to avoid console warnings  about texture .NE. power of two.

    temp_texture.needsUpdate = false; //... important

    var material = new THREE.MeshBasicMaterial({map: temp_texture});

    var mesh1 = new THREE.Mesh(
        geometry,
        material
    );

    //... write custom properties to the mesh object
    mesh1.c_text = text;
    mesh1.c_back_color = back_color;
    mesh1.c_font = font;
    mesh1.c_text_color = text_color;
    mesh1.c_rect_width = rect_width; //... unchanged
    mesh1.c_rect_depth = rect_depth;

    callback(mesh1);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);

    //theta = 0.01 //the speed of rotation
    //rotate camera
    //theta += 0.01;
    //var radius = 2500;

    //camera.position.x = radius * Math.sin( theta);
    //camera.position.y = radius * Math.sin( theta);
    //camera.position.z = radius * Math.cos( theta);
    //camera.lookAt( scene.position );

    //console.log("pos=", camera.position);

    controls.update();
}

function render() {
    renderer.render(scene, camera);
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}