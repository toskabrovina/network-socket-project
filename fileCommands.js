const fs = require("fs");

function list(socket) {
    console.log("Reading directory...");

    fs.readdir(".", (err, files) => {
        if (err) {
            console.log("FS ERROR:", err);
            socket.write("Error reading directory\n");
            return;
        }

        console.log("FILES:", files);

        socket.write("Files:\n");

        files.forEach((file) => {
            socket.write(file + "\n");
        });
    });
}

module.exports = { list };