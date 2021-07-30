import * as THREE from 'https://threejs.org/build/three.module.js'
import * as dat from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.7/build/dat.gui.module.js'

const gui = new dat.GUI()

const canvas = document.querySelector('canvas.circle')

const scene = new THREE.Scene()

const geometry = new THREE.IcosahedronGeometry(1, 32)

const material = new THREE.MeshStandardMaterial()
material.wireframe = true
material.transparent = true
material.blending = THREE.AdditiveBlending
material.color= new THREE.Color('black')

const shape = new THREE.Mesh(geometry,material)

scene.add(shape)

const light1 = new THREE.PointLight(0xffffff, 0.1)
light1.position.set(0,0,7)
light1.intensity = 1
scene.add(light1)


const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

window.addEventListener('resize', () =>
{
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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2.5
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas :canvas,
    alpha: true,
    antialias:true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    shape.rotation.y = .1 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()