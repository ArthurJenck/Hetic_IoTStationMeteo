import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xeeeeee)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100,
)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const gltfLoader = new GLTFLoader()

gltfLoader.load('/models/breadboard.glb', (gltf) => {
    const model = gltf.scene

    model.scale.setScalar(1 / 200)
    model.position.set(0, 0, 0)

    scene.add(model)
})

gltfLoader.load('/models/esp32.glb', (gltf) => {
    const model = gltf.scene

    model.scale.setScalar(1.315)
    model.position.set(-2.6, 0.215, 0.083)
    model.rotation.y = Math.PI / 2

    scene.add(model)
})

gltfLoader.load('/models/dht22.glb', (gltf) => {
    const model = gltf.scene

    model.scale.setScalar(30)

    gui.add(model.scale, 'x')
        .min(1)
        .max(30)
        .step(0.001)
        .onChange((value) => {
            model.scale.setScalar(value)
        })

    model.rotation.x = 0.36
    model.rotation.z = -0.275

    model.position.y = 0.89

    const modelGroup = new THREE.Group()
    modelGroup.add(model)

    modelGroup.rotation.y = -Math.PI / 2

    modelGroup.position.x = 2.62
    modelGroup.position.z = 0.95

    gui.add(modelGroup.position, 'x').min(-5).max(5).step(0.001)
    gui.add(modelGroup.position, 'y').min(-5).max(5).step(0.001)
    gui.add(modelGroup.position, 'z').min(-5).max(5).step(0.001)

    scene.add(modelGroup)
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
