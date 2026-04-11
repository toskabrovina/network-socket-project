const net = require("net");
const readline = require("readline");

const client = net.createConnection({ port: 3000 }, () => {
    console.log("Connected to server");
});

client.on("error", (err) => {
    console.log("CLIENT ERROR:", err.message);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (input) => {
    console.log("Sending:", input);
    client.write(input);
});

client.on("data", (data) => {
    console.log("SERVER:", data.toString());
});