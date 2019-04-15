window.addEventListener('DOMContentLoaded', init);

function init(){
    init_main_scene(pzm.par,pzm.con)
    load_ans();
    pzm.con.gui = new dat.GUI();
    pzm.con.gui.add(pzm.con.gui_func,"hint");



  window.addEventListener('resize', onResize);
  onResize();

  function onResize() {
    const width1 = window.innerWidth;
    const height1 = window.innerHeight;
    pzm.par.renderer.setPixelRatio(window.devicePixelRatio);
    pzm.par.renderer.setSize(width1, height1);
    pzm.par.camera.aspect = width1 / height1;
    pzm.par.camera.updateProjectionMatrix();
  }

const canvas = document.querySelector('#main_canvas');
const mouse = new THREE.Vector2();
canvas.addEventListener('mousemove', handleMouseMove);
function handleMouseMove(event) {
    const element = event.currentTarget;
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    mouse.x = ( x / w ) * 2 - 1;
    mouse.y = -( y / h ) * 2 + 1;
  }
  const raycaster = new THREE.Raycaster();
  canvas.addEventListener("click",function(){
    raycaster.setFromCamera(mouse, pzm.par.camera);
    const intersects = raycaster.intersectObjects(pzm.par.scene.children);
    intersects_handle(intersects);
  })

  canvas.addEventListener("touchstart",function(event){
    pzm.par.tc_start = new Date().getTime();
  })


  canvas.addEventListener("touchend",function(event){
    pzm.par.tc_end = new Date().getTime();
    if (pzm.par.tc_end-pzm.par.tc_start <= 300){
    var to = event.changedTouches[0];
    let ele = document.getElementById("main_canvas")
    let touch = new THREE.Vector2();
    const x = to.clientX - ele.offsetLeft;
    const y = to.clientY - ele.offsetTop;
    const w = ele.offsetWidth;
    const h = ele.offsetHeight;
    touch.x = ( x / w ) * 2 - 1;
    touch.y = -( y / h ) * 2 + 1;
    raycaster.setFromCamera(touch, pzm.par.camera);
    const intersects = raycaster.intersectObjects(pzm.par.scene.children);
    intersects_handle(intersects);
      }
  })

  tick();

  function tick() {
    pzm.par.renderer.render(pzm.par.scene, pzm.par.camera);
    pzm.par.control_cam.update();
    pzm.par.control_light.update();
    requestAnimationFrame(tick);
  }
}