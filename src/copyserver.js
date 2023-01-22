
import { UTIL } from './util';
const prompts = require('prompts');


const init = async () =>{
    try {
        const questions = [
            {
              type: 'text',
              name: 'username',
              message: 'What is your GitHub username?'
            },
            {
              type: 'number',
              name: 'age',
              message: 'How old are you?'
            },
            {
              type: 'text',
              name: 'about',
              message: 'Tell something about yourself',
              initial: 'Why should I?'
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