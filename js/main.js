import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Agregar una luz direccional para los reflejos
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Cubo con material mejorado (MeshStandardMaterial para reflejos, manteniendo el color original)
const geometry = new THREE.BoxGeometry(1, 1, 1, 32, 32, 32); // Aumentamos los segmentos
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,  // Manteniendo el color verde original
    roughness: 0.2,   // Controla el nivel de rugosidad
    metalness: 0.8,   // Controla cuán metálico se ve el objeto
    envMapIntensity: 1, // Intensidad del mapa de ambiente (reflejos)
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Borde independiente
const edges = new THREE.EdgesGeometry(geometry); 
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const edgesMesh = new THREE.LineSegments(edges, edgeMaterial);
scene.add(edgesMesh);

// Configurar fondo a negro
scene.background = new THREE.Color(0x000000); // Establecer el fondo a negro

camera.position.z = 2;

function animate() {
    // Rotar el cubo y el borde en los tres ejes
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    edgesMesh.rotation.x = cube.rotation.x;
    edgesMesh.rotation.y = cube.rotation.y;
    edgesMesh.rotation.z = cube.rotation.z;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
