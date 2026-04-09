
const fs = require("fs");

function list(socket) {
    fs.readdir(".", (err, files) => {
        if (err) {
            socket.write("Error reading directory\n");
            return;
        }

        socket.write("Files:\n");
        files.forEach(file => {
            socket.write(file + "\n");
        });
    });
}

module.exports = {
    list
};