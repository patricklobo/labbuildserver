
import { UTIL } from './util';
const prompts = require('prompts');


const init = async () =>{
    try {
        const questions = [
            {
              type: 'number',
              name: 'dev',
              message: 'Digite o número do disco deseja instalar:'
            },
          ];
          
        let resp = await UTIL.cmd("sudo fdisk -l | grep \"Disk /dev/sd\"");
        let list = resp.split("\n").filter( i => i);
        let _devs = list.map( (i, index) => {
            let _devs = i.split(" ");
            return _devs[1].substring(0,_devs[1].length -1);
        })
        let devs = list.map( (i, index) => {
            let _devs = i.split(" ");
            let dev = `[${(index + 1)}] -> ${_devs[2]} ${_devs[3]} -> ${_devs[1]}`;
            return dev;
        })
        console.log("LISTA DE DISCOS");
        console.log(devs.join("\n"));
        const response = await prompts(questions);
        let disco = _devs[response.dev - 1];
        if(disco){
            console.log("Disco selecionado: ", disco);
        }
        // console.log(response)
        // console.log(_devs);
    } catch (error) {
        console.log("erro", error);
    }
}

init();