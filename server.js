const dgram = require("dgram");
const fs = require("fs");

const server = dgram.createSocket("udp4");

let loggedUsers = {};

server.on("message", (msg, rinfo) => {
    const text = msg.toString().trim();
    console.log(`Marrë nga ${rinfo.address}: ${text}`);

  
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        data = { type: "TEXT", value: text };
    }

    if (data.type === "AUTH") {
        loggedUsers[rinfo.address] = { role: data.role, user: data.user };
        server.send(`SUKSES: Miresevini ${data.user} (${data.role})`, rinfo.port, rinfo.address);
        return;
    }

    if (!loggedUsers[rinfo.address]) {
        server.send("GABIM: Identifikohu me AUTH ne fillim!", rinfo.port, rinfo.address);
        return;
    }


    if (data.type === "LIST") {
        fs.readdir(".", (err, files) => {
            if (err) {
                server.send("GABIM gjate leximit!", rinfo.port, rinfo.address);
                return;
            }
const result = "LISTA E FAJLLAVE:\n" + files.join("\n");
            server.send(result, rinfo.port, rinfo.address);
        });
    } 
    else if (data.type === "READ") {
        fs.readFile(`./${data.fileName}`, "utf8", (err, content) => {
            if (err) {
                server.send(`GABIM: Fajlli '${data.fileName}' nuk u gjet!`, rinfo.port, rinfo.address);
                return;
            }
            server.send(`PERMBAJTJA E ${data.fileName}:\n${content}`, rinfo.port, rinfo.address);
        });
    } 
    else {
        server.send("Unknown command", rinfo.port, rinfo.address);
    }
}); 
           
server.bind(3000, () => {
    console.log("UDP Server running on port 3000");
});
