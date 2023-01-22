
import { UTIL } from './util';


const init = async () =>{
    try {
        let resp = await UTIL.cmd("sudo fdisk -l | grep \"Disk /dev/sd\"");
        console.log(resp.split("\n"));
    } catch (error) {
        console.log("erro", error);
    }
}

init();