var pzm={
    con:{
        init_width : 100, //old name width
        init_height : 100,// old name height
        cube_mat : [
            new THREE.MeshStandardMaterial({color:0x00FF00}),
            new THREE.MeshStandardMaterial({color:0xFFFFFF}),
            new THREE.MeshStandardMaterial({color:0x00FF00}),
            new THREE.MeshStandardMaterial({color:0xFFFFFF}),
            new THREE.MeshStandardMaterial({color:0x00FF00}),
            new THREE.MeshStandardMaterial({color:0xFFFFFF})
        ],
        cube_pos : [
            [1,1,1], // 0　手前左上
            [-1,1,1], //1　手前右上
            [1,-1,1], //2　手前左下
            [1,1,-1], //3　奥左上
            [-1,-1,1], //4　手前右下
            [1,-1,-1], //5　奥左下
            [-1,1,-1], //6　奥右上
            [-1,-1,-1] //7　奥右下
        ],
        cube_path:[
            [1,2,3], //0
            [0,4,6], //1
            [0,4,5], //2
            [0,5,6],    //3
            [1,2,7],      //4
            [2,3,7],      //5
            [1,3,7],      //6
            [4,5,6]       //7
        ],
        cube_rot:[
            [0,0,0], //0
            [0,0,Math.PI/2], //1
            [Math.PI/2,0,0], //2
            [Math.PI/2,Math.PI/2,-Math.PI/2],    //3
            [0,0,Math.PI],      //4
            [0,Math.PI,Math.PI],      //5
            [0,-Math.PI/2,Math.PI/2],      //6
        ],
        gui :0,
        gui_func:{
            hint:function(){
                let now = "";
                for (let i = 0; i < 8; ++i){
                    if(pzm.par.init_state[i] == 7){
                        now_space = i;
                    }
                }

                for (let i = 0; i < 8; ++i){
                    now += String(pzm.par.init_state[i])
                }

                let next = pzm.con.ans[now];
                if (next == ""){
                    console.log("end")
                    return
                }
                let next_space = 0;
                next = next.split("")
                for (let i = 0; i < 8; ++i){
                    if (next[i] == 7){
                        temp = i
                    }
                }
                next_space = temp
            

                let c_n = pzm.par.init_state[next_space]

            
                pzm.par.occupied[now_space] = true
                pzm.par.occupied[next_space] = false
                pzm.par.cube_address[c_n] = now_space
                pzm.par.init_state[now_space] = c_n
                pzm.par.init_state[next_space] = 7
                pzm.con.cubes[c_n].position.set(pzm.con.cube_pos[now_space][0],pzm.con.cube_pos[now_space][1],pzm.con.cube_pos[now_space][2]);
        }
        },
        ans :{},
        cubes : []
    },
    par:{
        not_clear:true,
        renderer:0,
        scene:0,
        camera:0,
        light:0,
        control_cam:0,
        control_light:0,
        cube_address:[-1,-1,-1,-1,-1,-1,-1],
        occupied:[false,false,false,false,false,false,false,false],
        init_state:[0,1,2,3,4,5,6,7],
        tc_start : 0,
        tc_end : 0

    }
}