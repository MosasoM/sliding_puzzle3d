function to_where(add){
    let path = pzm.con.cube_path[add]
    for (let i = 0; i < 3; ++i){
        if (!pzm.par.occupied[path[i]]){
            pzm.par.occupied[path[i]] = true
            pzm.par.occupied[add] = false
            return path[i];
        }
    }
    return -1;
}

function load_ans(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) { 
        } else {
          alert("status = " + xmlhttp.status);
        } 
      }
    }
    xmlhttp.open("GET", "./all.txt");
    xmlhttp.send();
    xmlhttp.onload=(function() {
      data = xmlhttp.responseText.split('\n');
      for (let i = 0; i < data.length; ++ i){
          line = data[i].split(' ');
          pzm.con.ans[String(line[0])] = line[1];
      }
      init_cube(pzm.par,pzm.con)
    }
    )

}

function is_finished(){
    for (let i =0; i < 7; ++i){
        if (pzm.par.cube_address[i] !== i){
            return false
        }
    }
    return true
}


function can_be_solved(state){
    s = ""
    for (let i = 0; i <8; ++i){
        s += String(state[i])
    }
    if (s in pzm.con.ans){
        return true
    }else{
        return false
    }
}

function intersects_handle(intersects){
    if(intersects.length > 0){
        let cube_num = Number(intersects[0].object.name)
        let adr = pzm.par.cube_address[cube_num]
        if (pzm.par.occupied[adr]){
            let space = to_where(adr);
            if (space == -1){
                return
            }
            space = Number(space)
            pzm.par.cube_address[cube_num] = space
            pzm.par.init_state[space] = cube_num
            pzm.par.init_state[adr] = 7
            intersects[0].object.position.set(pzm.con.cube_pos[space][0],pzm.con.cube_pos[space][1],pzm.con.cube_pos[space][2]);
        }
      }
      if(is_finished()){
        pzm.par.not_clear = false
        pzm.par.renderer.render(pzm.par.scene, pzm.par.camera);
        pzm.par.control_cam.update();
        pzm.par.control_light.update();
        (function(){
            alert("clear")
        })();

        }
}