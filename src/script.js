import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, control, orbit;

const init = () => {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const aspect = window.innerWidth / window.innerHeight;

  cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000);
  cameraOrtho = new THREE.OrthographicCamera(- 600 * aspect, 600 * aspect, 600, - 600, 0.01, 30000);
  currentCamera = cameraPersp;

  currentCamera.position.set(1000, 500, 1000);
  currentCamera.lookAt(0, 200, 0);

  scene = new THREE.Scene();
  scene.add(new THREE.GridHelper(1000, 10, 0x888888, 0x444444));

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(1, 1, 1);
  scene.add(light);

  const texture = new THREE.TextureLoader().load('/textures/door/color.jpg', render);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const boxGeometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({ map: texture, transparent: true });

  orbit = new OrbitControls(currentCamera, renderer.domElement);
  orbit.update();
  orbit.addEventListener('change', render);

  control = new TransformControls(currentCamera, renderer.domElement);
  control.addEventListener('change', render);

  control.addEventListener('dragging-changed', function (event) {

    orbit.enabled = !event.value;

  });

  const mesh = new THREE.Mesh(boxGeometry, material);
  scene.add(mesh);

  control.attach(mesh);
  scene.add(control);

  window.addEventListener('resize', onWindowResize);

  window.addEventListener('keydown', (event) => {

    switch (event.keyCode) {

      case 81: // Q
        control.setSpace(control.space === 'local' ? 'world' : 'local');
        break;

      case 16: // Shift
        control.setTranslationSnap(100);
        control.setRotationSnap(THREE.MathUtils.degToRad(15));
        control.setScaleSnap(0.25);
        break;

      case 87: // W
        control.setMode('translate');
        break;

      case 69: // E
        control.setMode('rotate');
        break;

      case 82: // R
        control.setMode('scale');
        break;

      case 187:
      case 107: // +, =, num+
        control.setSize(control.size + 0.1);
        break;

      case 189:
      case 109: // -, _, num-
        control.setSize(Math.max(control.size - 0.1, 0.1));
        break;

      case 88: // X
        control.showX = !control.showX;
        break;

      case 89: // Y
        control.showY = !control.showY;
        break;

      case 90: // Z
        control.showZ = !control.showZ;
        break;

      case 32: // Spacebar
        control.enabled = !control.enabled;
        break;

      case 27: // Esc
        control.reset();
        break;

    }

  });

  window.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
      case 16: // Shift
        control.setTranslationSnap(null);
        control.setRotationSnap(null);
        control.setScaleSnap(null);
        break;
    }
  });
}

const onWindowResize = () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))  

  render();
}

const render = () => renderer.render(scene, currentCamera);

init();
render();