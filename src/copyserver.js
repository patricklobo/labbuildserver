import { UTIL } from "./util";
const prompts = require("prompts");

const init = async () => {
    try {
        const questions = [
            {
                type: "number",
                name: "dev",
                message: "Digite o número do disco deseja instalar:",
            },
        ];

        let resp = null;
        try {
            resp = await UTIL.cmd('sudo fdisk -l | grep "Disk /dev/sd"');
        } catch (error) {
            resp = error;
        }
        let list = resp.split("\n").filter((i) => i);
        let _devs = list.map((i, index) => {
            let _devs = i.split(" ");
            return _devs[1].substring(0, _devs[1].length - 1);
        });
        let devs = list.map((i, index) => {
            let _devs = i.split(" ");
            let dev = `[${index + 1}] -> ${_devs[2]} ${_devs[3]} -> ${
                _devs[1]
            }`;
            return dev;
        });
        console.clear();
        console.log();
        console.log("LISTA DE DISCOS");
        console.log();
        console.log(devs.join("\n"));
        console.log();
        const response = await prompts(questions);
        let index = response.dev - 1;
        let disco = _devs[index];
        if (disco) {
            console.clear();
            console.log();
            console.log("Disco selecionado: ", devs[index]);
            const response = await prompts({
                type: "confirm",
                name: "value",
                message: "Tem certeza que deseja prosseguir?",
                initial: true,
            });
            if (response.value) {
                console.clear();
                console.log();
                console.log("Esse procedimento pode demorar, por favor aguarde...");
                try {
                    let resp = await UTIL.cmd(`sudo gzip -cd < ./labbase.img.gz | dd of=${disco} bs=32M`);
                } catch (error) {
                    console.log(error);
                }
                console.clear();
                console.log();
                const response = await prompts({
                    type: "confirm",
                    name: "value",
                    message: "Procedimento finalizado! Remova o pendrive e reinicie a servidor.",
                    initial: true,
                });
            }
        } else {
            const response = await prompts({
                type: "confirm",
                name: "value",
                message: "Disco selecionado invalido.",
                initial: true,
            });
            init();
        }
        // console.log(response)
        // console.log(_devs);
    } catch (error) {
        console.log("Ocorreu um erro", error);
    }
};

init();
