const dgram = require("dgram");
const fs = require("fs");

const server = dgram.createSocket("udp4");

let loggedUsers = {};

server.on("message", (msg, rinfo) => {
    const text = msg.toString().trim();
    console.log("MESSAGE:", text);

  
    try {
        const data = JSON.parse(text);

        if (data.type === "AUTH") {
            loggedUsers[rinfo.address] = true;
            server.send("AUTH OK", rinfo.port, rinfo.address);
            return;
        }
    } catch {}

    if (!loggedUsers[rinfo.address]) {
        server.send("Please login first", rinfo.port, rinfo.address);
        return;
    }


    if (text === "list") {
        fs.readdir(".", (err, files) => {
            if (err) {
                server.send("Error reading directory", rinfo.port, rinfo.address);
                return;
            }

            const result = "Files:\n" + files.join("\n");
            server.send(result, rinfo.port, rinfo.address);
        });
    } else {
        server.send("Unknown command", rinfo.port, rinfo.address);
    }
});

server.bind(3000, () => {
    console.log("UDP Server running on port 3000");
});
