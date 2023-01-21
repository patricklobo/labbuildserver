const { exec } = require("child_process");

module.exports = {
    UTIL: {
        cmd(cmd = ""){
            return new Promise((suc, fail)=>{
                exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        return fail(error.message);
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return fail(stdout);
                    }
                    return suc(stdout);
                });
            })
        }
    }
}