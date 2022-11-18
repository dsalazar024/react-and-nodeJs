"use strict";

const axios = require("axios");
const csvtojson = require("csvtojson");

let config = {
    headers: {
        Authorization: "Bearer aSuperSecretKey"
    }
};

async function getAllFiles(req, res) {
    let allFilesParse = [];
    let parseData = [];
    let fileSearch = req.query.name;

    const responseData = await axios.get("https://echo-serv.tbxnet.com/v1/secret/files", config);
    const filesNames = responseData.data.files;

    for (let i = 0; i <= filesNames.length; i++) {
        const files = filesNames[i];
        try {
            const secretFiles = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${files}`, config);

            csvtojson().fromString(secretFiles.data).then((json) => {
                allFilesParse.push(json);
            });
        } catch (error) {
            console.log(`file with error`);
        }
    }

    for (let j = 0; j <= allFilesParse.length; j++) {

        allFilesParse[j]?.forEach(element => {

            if (!element.hex || element.text.length > 32 
                || !element.text || element.text.length <= 1 
                || !element.number || element.number <= 0) {
                console.log(element, "valores incorrectos")
            } else {
                parseData.push(
                    {
                        file: element.file,
                        lines: [{
                            text: element.text,
                            number: element.number,
                            hex: element.hex

                        }]
                    }
                );
            }
        });
    }

    if (fileSearch == undefined) {
        return res.send(parseData);
    } else {
        let filterData = parseData.filter(file => file.file === fileSearch);
        return res.send(filterData);

    }

}

module.exports = {
    getAllFiles
}