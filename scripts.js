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
material.color= new THREE.Color('white')

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
if (document.body.clientWidth < 700){
    camera.position.z = 4.5    
}else{
    camera.position.z = 2.5
}
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



const scontainer = document.querySelector('div.scroller');

let current = 0;
let target = 0;
let ease = 0.075;

function lerp(start, end, t){
  return start * (1-t) + end * t
}


function init(){
  document.body.style.height = `${document.querySelector('.boxcont').clientWidth - (window.innerWidth - window.innerHeight)}px`
}

function smscroll(){
  target = window.scrollY
  current = lerp(current, target, ease)
  scontainer.style.transform = `translate3d(${current * -1}px, 0, 0)`
  requestAnimationFrame(smscroll)
}

init();

smscroll();

let boxes = document.querySelectorAll('.box')
boxes.forEach(box => box.addEventListener('click', modal))

function modal(e){
    if (e.target.classList.contains('aboutbox')){
        document.querySelector('.about').classList.toggle("active")
        document.body.style.overflowY = 'hidden'
        document.querySelectorAll('.box div').forEach(box => box.style.transform = 'translateY(100vh)')
    }
    if (e.target.classList.contains('webox')){
        document.querySelector('.education').classList.toggle("active")
        document.body.style.overflowY = 'hidden'
        document.querySelectorAll('.box div').forEach(box => box.style.transform = 'translateY(100vh)')
    }
    if (e.target.classList.contains('projectbox')){
        document.querySelector('.projects').classList.toggle("active")
        document.body.style.overflowY = 'hidden'
        document.querySelectorAll('.box div').forEach(box => box.style.transform = 'translateY(100vh)')
    }
    if (e.target.classList.contains('testimonialbox')){
        document.querySelector('.testimonials').classList.toggle("active")
        document.body.style.overflowY = 'hidden'
        document.querySelectorAll('.box div').forEach(box => box.style.transform = 'translateY(100vh)')
    }
    if (e.target.classList.contains('contactbox')){
        document.querySelector('.contact').classList.toggle("active")
        document.body.style.overflowY = 'hidden'
        document.querySelectorAll('.box div').forEach(box => box.style.transform = 'translateY(100vh)')
    }
}

document.querySelector(".eduexit").addEventListener("click", close)

document.querySelector(".aboutexit").addEventListener("click", close)

document.querySelector(".projectsexit").addEventListener("click", close)

document.querySelector(".testimonialsexit").addEventListener("click", close)

document.querySelector(".contactexit").addEventListener("click", close)


function close(e){
    if (e.target.classList.contains("aboutexit")){
        document.querySelector('.about').classList.toggle("active")
    }if (e.target.classList.contains("eduexit")){
        document.querySelector('.education').classList.toggle("active")
    }if (e.target.classList.contains("projectsexit")){
        document.querySelector('.projects').classList.toggle("active")
    }if (e.target.classList.contains("testimonialsexit")){
        document.querySelector('.testimonials').classList.toggle("active")
    }if (e.target.classList.contains("contactexit")){
        document.querySelector('.contact').classList.toggle("active")
    }
    document.body.style.overflowY = 'scroll'
    document.querySelectorAll('.box div').forEach(box => box.style.transform = 'translateY(-0.1vh)')
}