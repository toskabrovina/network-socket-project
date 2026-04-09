const net = require("net");
const fileCommands = require("./fileCommands");

const PORT = 3000;
let clients = [];

const server = net.createServer((socket) => {
    console.log("Client connected");

    clients.push(socket);

    // ✅ KREJT LOGJIKA DUHET BRENDA KËTIJ BLOKU
    socket.on("data", (data) => {
        const msg = data.toString().trim();

        console.log("Received:", msg);

        if (msg === "/list") {
            fileCommands.list(socket);
        } else {
            socket.write("Server got: " + msg + "\n");
        }
    });

    socket.on("end", () => {
        clients = clients.filter(c => c !== socket);
        console.log("Client disconnected");
    });

    socket.on("error", (err) => {
        console.log("Error:", err.message);
    });
});

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});