const net = require("net");
const fileCommands = require("./fileCommands");

const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
        const command = data.toString().trim();
        console.log("COMMAND:", command);

        if (command === "list") {
            console.log("Executing LIST...");
            fileCommands.list(socket);
        } else {
            socket.write("Unknown command\n");
        }
    });

    socket.on("error", (err) => {
        console.log("Socket error:", err.message);
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});

//test kk