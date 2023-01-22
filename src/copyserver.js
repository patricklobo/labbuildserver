
import { UTIL } from './util';


const init = async () =>{
    try {
        let resp = await UTIL.cmd("sudo fdisk -l | grep \"Disk /dev/sd\"");
        let list = resp.split("\n").filter( i => i);
        let devs = list.map( i => {
            let _devs = i.split(" ");
            let dev = `${_devs[2]} ${_devs[3]} -> ${1}`;
            return dev;
        })
        console.log(devs);
    } catch (error) {
        console.log("erro", error);
    }
}

init();