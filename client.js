const dgram = require("dgram");
const client = dgram.createSocket('udp4');
const readline = require('readline');

const PORT = 3000; 
const HOST = '127.0.0.1'; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'CLIENT-ADMIN> '
});

const initialAuth = JSON.stringify({
    type: "AUTH",
    user: "Client_01",
    role: "ADMIN" 
});

client.send(initialAuth, PORT, HOST);

client.on('message', (msg) => {
    console.log("SERVER:", msg.toString());
    rl.prompt();
});

rl.on('line', (input) => {
    client.send(input, PORT, HOST);
});
