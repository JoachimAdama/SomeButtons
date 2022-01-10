const fs = require("fs");
const path = require("path");

const dir = fs.opendir('sound', (err, dir) => {
        if (err) console.log("Error:", err)
        else {
           console.log(dir.readSync());

        }
    });