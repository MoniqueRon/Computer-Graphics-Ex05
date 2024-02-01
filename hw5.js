import {OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 'ForestGreen' );

function degrees_to_radians(degrees) {
  let pi = Math.PI;
  return degrees * (pi/180);
}

const colors = {
	red: 0xff0000,
	green: 0x00ff00,
	blue: 0x0000ff,
	yellow: 0xffff00,
	cyan: 0x00ffff,
	magenta: 0xff00ff,
	white: 0xffffff,
	black: 0x000000,
	gray: 0xC0C0C0,
	pink: 0xFFC0CB,
};
const goalMaterial = new THREE.MeshBasicMaterial({ color: colors.white });
const ballMaterial = new THREE.MeshBasicMaterial({ color: colors.black });
const netMaterial = new THREE.MeshBasicMaterial({ color: colors.gray, side: THREE.DoubleSide });
const materials = [goalMaterial, ballMaterial, netMaterial];

// Add here the rendering of your goal

// Create the front goalposts
const frontGoalpostRadius = 0.1;
const frontGoalpostHeight = 2;
const frontGoalpostRadialSegments = 32;
const frontGoalpostGeometry = new THREE.CylinderGeometry(frontGoalpostRadius, frontGoalpostRadius, frontGoalpostHeight, frontGoalpostRadialSegments);
const frontGoalpost1 = new THREE.Mesh(frontGoalpostGeometry, goalMaterial);
const frontGoalpost2 = new THREE.Mesh(frontGoalpostGeometry, goalMaterial);

makeTranslation(frontGoalpost1, -3, 1, -5);
makeTranslation(frontGoalpost2,3, 1, -5)

// Create rings/toruses for the goalposts
const goalpostRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const goalpostRing1 = new THREE.Mesh(goalpostRingGeometry, goalMaterial);
const goalpostRing2 = new THREE.Mesh(goalpostRingGeometry, goalMaterial);

makeTranslation(goalpostRing1, -3, 0, -5)
makeTranslation(goalpostRing2, 3, 0, -5)

// Create the back supports
const backSupportRadius = 0.1;
const backSupportHeight = 3;
const backSupportRadialSegments = 32;
const backSupportGeometry = new THREE.CylinderGeometry(backSupportRadius, backSupportRadius, backSupportHeight, backSupportRadialSegments);
const backSupport1 = new THREE.Mesh(backSupportGeometry, goalMaterial);
const backSupport2 = new THREE.Mesh(backSupportGeometry, goalMaterial);

makeRotationX(backSupport1, 45)
makeTranslation(backSupport1, -3, 1, -6);
makeRotationX(backSupport2, 45)
makeTranslation(backSupport2, 3, 1, -6);

// Create rings/toruses for the back supports
const backSupportRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const backSupportRing1 = new THREE.Mesh(backSupportRingGeometry, goalMaterial);
const backSupportRing2 = new THREE.Mesh(backSupportRingGeometry, goalMaterial);

makeTranslation(backSupportRing1, -3, 0, -7);
makeTranslation(backSupportRing2, 3, 0, -7);

// Create the crossbar
const crossbarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);
const crossbar = new THREE.Mesh(crossbarGeometry, goalMaterial);
makeRotationX(crossbar, 90)
makeRotationY(crossbar, 90)
makeTranslation(crossbar, 0, 2, -5);

// Create the side nets
const triangleVertices = [
	new THREE.Vector2(0, 0),
	new THREE.Vector2(2, 0),
	new THREE.Vector2(0, 2)
];
const triangleShape = new THREE.Shape(triangleVertices);
const sideNetGeometry = new THREE.ShapeGeometry(triangleShape);
const rightNet = new THREE.Mesh(sideNetGeometry, netMaterial);
const leftNet = new THREE.Mesh(sideNetGeometry, netMaterial);

makeRotationY(rightNet, 90)
makeTranslation(rightNet, 3, 0, -5);
makeRotationY(leftNet, 90)
makeTranslation(leftNet, -3, 0, -5);

// Create the back net
const backNetGeometry = new THREE.PlaneGeometry(6, 3, 1, 1);
const backNet = new THREE.Mesh(backNetGeometry, netMaterial);
makeRotationX(backNet, 45);
makeTranslation(backNet, 0, 1, -6);

// Create the ball
const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
makeTranslation(ball, 0, 0, -3);

const skelton = new THREE.Group();
skelton.add(frontGoalpost1);
skelton.add(frontGoalpost2);
skelton.add(goalpostRing1);
skelton.add(goalpostRing2);
skelton.add(backSupport1);
skelton.add(backSupport2);
skelton.add(backSupportRing1);
skelton.add(backSupportRing2);
skelton.add(crossbar);

const nets = new THREE.Group();
nets.add(rightNet);
nets.add(leftNet);
nets.add(backNet);

const goal = new THREE.Group();
goal.add(skelton);
goal.add(nets);

// Create banners - BONUS

const canvas1 = document.createElement('canvas');
const canvas2 = document.createElement('canvas');

const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const bannerWidth = 10;
const bannerHeight = 2.5;

canvas1.width = bannerWidth * 100;
canvas1.height = bannerHeight * 100;

canvas2.width = bannerWidth * 100;
canvas2.height = bannerHeight * 100;

ctx1.font = 'Bold 120px Tahoma';
ctx1.fillStyle = 'black';
ctx1.textAlign = 'center';
ctx1.textBaseline = 'middle';
ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
ctx1.fillStyle = 'pink';
ctx1.fillText('Go Monique!', canvas1.width / 2, canvas1.height / 2);

ctx2.font = 'Bold 120px Tahoma';
ctx2.fillStyle = 'white';
ctx2.textAlign = 'center';
ctx2.textBaseline = 'middle';
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
ctx2.fillStyle = 'magenta';
ctx2.fillText('Go May!', canvas2.width / 2, canvas2.height / 2);

const bannerTexture1 = new THREE.CanvasTexture(canvas1);
const bannerTexture2 = new THREE.CanvasTexture(canvas2);

const bannerMaterial1 = new THREE.MeshBasicMaterial({ map: bannerTexture1 });
const bannerMaterial2 = new THREE.MeshBasicMaterial({ map: bannerTexture2 });

const bannerGeometry = new THREE.PlaneGeometry(bannerWidth, bannerHeight);
const banner1 = new THREE.Mesh(bannerGeometry, bannerMaterial1);
const banner2 = new THREE.Mesh(bannerGeometry, bannerMaterial2);

makeRotationY(banner1, -45);
makeTranslation(banner1, 7, 4, -15);
makeRotationY(banner2, 45);
makeTranslation(banner2, -7, 4, -15);

const bannerPoleMaterial = new THREE.MeshBasicMaterial({ color: colors.black });
const bannerPoleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 32);

const bannerPole1 = new THREE.Mesh(bannerPoleGeometry, bannerPoleMaterial);
const bannerPole2 = new THREE.Mesh(bannerPoleGeometry, bannerPoleMaterial);

makeTranslation(bannerPole1, 7, 2, -15.2);
makeTranslation(bannerPole2, -7, 2, -15.2);

const banners = new THREE.Group();
banners.add(banner1);
banners.add(banner2);
banners.add(bannerPole1);
banners.add(bannerPole2);


// Create the scene
scene.add(goal);
scene.add(ball);
scene.add(banners);
scene.add(camera);

// This defines the initial distance of the camera
const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0, 2, 5); // sets the camera origin
camera.applyMatrix4(cameraTranslate)

renderer.render( scene, camera );

const controls = new OrbitControls( camera, renderer.domElement );

let isOrbitEnabled = true;

const toggleOrbit = (e) => {
	if (e.key == "o"){
		isOrbitEnabled = !isOrbitEnabled;
	}
}

const toggleWireframe = (e) => {
	if (e.key == "w") {
		if (materials[0].wireframe === false) {
			materials.forEach((element) => {
				element.wireframe = true;
			});
		} else {
			materials.forEach((element) => {
				element.wireframe = false;
			});
		}
	}
};

let state1 = false;
const toggleState1 = (e) => {
	if (e.key == "1") {
		state1 = !state1;
	}
};

let state2 = false;
const toggleState2 = (e) => {
	if (e.key == "2") {
		state2 = !state2;
	}
};

const toggleState3 = (e) => {
	if (e.key == "3") {
		goal.scale.x *= 0.95;
		goal.scale.y *= 0.95;
		goal.scale.z *= 0.95;
	}
};


let ballSpeed = 1.0; 
const toggleStateUp = (e) => {
	if (e.key == "ArrowUp") {
		ballSpeed *= 2;
	}
};

const toggleStateDown = (e) => {
	if (e.key == "ArrowDown") {
		ballSpeed *= 0.5;
	}
};


document.addEventListener('keydown',toggleOrbit)
document.addEventListener('keydown',toggleWireframe)
document.addEventListener('keydown',toggleState1)
document.addEventListener('keydown',toggleState2)
document.addEventListener('keydown',toggleState3)
document.addEventListener('keydown',toggleStateUp)
document.addEventListener('keydown',toggleStateDown)


//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function makeTranslation(object, x, y, z) {
	const tanslateMatrix = new THREE.Matrix4();
	tanslateMatrix.makeTranslation( x, y, z);
	object.applyMatrix4(tanslateMatrix);
}

function makeRotationX(object, deg) {
	const rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationX(degrees_to_radians(deg));
	object.applyMatrix4(rotationMatrix);
}

function makeRotationY(object, deg) {
	const rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationY(degrees_to_radians(deg));
	object.applyMatrix4(rotationMatrix);
}

function makeRotationZ(object, deg) {
	const rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationZ(degrees_to_radians(deg));
	object.applyMatrix4(rotationMatrix);
}


function animate() {

	requestAnimationFrame( animate );

	if (state1) {
		makeTranslation(ball, 0, -0.5 * ballSpeed, 0);
		makeRotationX(ball, 5 * ballSpeed);

	}
	if (state2) {
		makeTranslation(ball, 0.5 * ballSpeed, 0, 0);
		makeRotationY(ball, 4 * ballSpeed);
	}

	controls.enabled = isOrbitEnabled;
	controls.update();

	renderer.render( scene, camera );

}
animate()