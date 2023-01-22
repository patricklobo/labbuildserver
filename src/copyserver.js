
import { UTIL } from './util';
const prompts = require('prompts');


const init = async () =>{
    try {
        const questions = [
            {
              type: 'number',
              name: 'dev',
              message: 'Qual disco deseja instalar?'
            },
          ];
          
        let resp = await UTIL.cmd("sudo fdisk -l | grep \"Disk /dev/sd\"");
        let list = resp.split("\n").filter( i => i);
        let devs = list.map( (i, index) => {
            let _devs = i.split(" ");
            let dev = `[${(index + 1)}] -> ${_devs[2]} ${_devs[3]} -> ${_devs[1]}`;
            return dev;
        })
        const response = await prompts(questions);
        console.log(response)
        console.log(devs);
    } catch (error) {
        console.log("erro", error);
    }
}

init();