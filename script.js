// Inisialisasi scene, camera, dan renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x808080); // Set background putih
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambahkan pencahayaan
const light = new THREE.AmbientLight(0xffffff, 50);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 50);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Load model GLTF
const loader = new THREE.GLTFLoader();
loader.load(
  "models/bmw.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Sesuaikan ukuran model
    model.position.set(0, 0, 0); // Posisikan model di tengah
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Posisi kamera
camera.position.z = 100;

// Fungsi animasi
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Responsif saat window di-resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Efek lembut saat menggeser
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 5;
controls.maxPolarAngle = Math.PI / 2;
