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
    const message = input.trim();

    if (message === '/list'){
        const listCmd = JSON.stringify({ type: "LIST" });
        client.send(listCmd, PORT, HOST);
    }

    else if (message.startsWith('/read ')){
        const fileName = message.split(' ')[1];
        const readCmd = JSON.stringify({
            type: "READ",
            fileName: fileName
        });
        client.send(readCmd, PORT, HOST);
    }

    else{
        client.send(message, PORT, HOST);
    }

    rl.prompt();
});
