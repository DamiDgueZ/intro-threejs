import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Agregar bordes negros
const edges = new THREE.EdgesGeometry(geometry); // Crea una geometría de bordes
const edgeMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } ); // Material de borde negro
const edgesMesh = new THREE.LineSegments( edges, edgeMaterial ); // Crea los bordes
cube.add( edgesMesh ); // Agrega los bordes al cubo

camera.position.z = 5;

function animate() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}