function init_main_scene(main,con){
    main.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#main_canvas'),
        preserveDrawingBuffer: true
      });
      main.renderer.setPixelRatio(window.devicePixelRatio);
      main.renderer.setSize(con.init_width, con.init_height);
      main.scene = new THREE.Scene();
      main.camera = new THREE.PerspectiveCamera(45, con.init_width / con.init_height, 1, 50000);
      main.light = lighting(main.scene);
      main.control_cam = new THREE.OrbitControls(main.camera, main.renderer.domElement);
      main.control_light = new THREE.OrbitControls(main.light, main.renderer.domElement);
      main.control_light.enablePan = false;
      main.control_light.enableZoom = false;
      main.control_cam.enableKeys = false;
      main.control_cam.enablePan = false;
      main.control_light.enableKeys = false;
      main.camera.position.set(0, 0, 15);
      main.renderer.setClearAlpha(0);
}

function lighting(scene) {
    var light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2;
    light.position.set(0, 0, 100);
    scene.add(light);
    return light;
  }

function init_cube(par,con){
    let break_loop_too_much = 0;
    while(true){
    randomize(par.init_state)
    if (can_be_solved(par.init_state)){
        break;
    }
    break_loop_too_much+=1;
    if(break_loop_too_much > 20){
        break
    }
    }
    for (let i = 0; i < 7; ++i){
        let geo = new THREE.BoxGeometry(2,2,2);
        let cube = new THREE.Mesh(geo,con.cube_mat);
        pzm.con.cubes.push(cube);
    }
    for (let i = 0; i < 7; ++i){
        for (let j = 0; j < 8; ++j){
            if(pzm.par.init_state[j] == i){
                temp = j
            }
        }
        pzm.con.cubes[i].position.set(con.cube_pos[temp][0],con.cube_pos[temp][1],con.cube_pos[temp][2])
        pzm.con.cubes[i].name=i.toString()
        par.cube_address[i] = temp
        par.occupied[temp] = true
        pzm.con.cubes[i].rotation.set(con.cube_rot[i][0],con.cube_rot[i][1],con.cube_rot[i][2])
        par.scene.add(pzm.con.cubes[i]);

    }

}

function randomize(array){
    for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
}