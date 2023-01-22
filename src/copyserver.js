
import { UTIL } from './util';
const prompts = require('prompts');


const init = async () =>{
    try {
        const questions = [
            {
              type: 'text',
              name: 'dish',
              message: 'Do you like pizza?'
            },
            {
              type: prev => prev == 'pizza' ? 'text' : null,
              name: 'topping',
              message: 'Name a topping'
            }
          ];

        let resp = await UTIL.cmd("sudo fdisk -l | grep \"Disk /dev/sd\"");
        let list = resp.split("\n").filter( i => i);
        let devs = list.map( i => {
            let _devs = i.split(" ");
            let dev = `${_devs[2]} ${_devs[3]} -> ${_devs[1]}`;
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