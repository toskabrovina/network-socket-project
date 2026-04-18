const dgram = require("dgram");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { SERVER_PORT, SERVER_IP } = require("./config");

const clientSocket = dgram.createSocket("udp4");


const clientId = process.argv[2] || "client1";
const role = process.argv[3] || "read"; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log(`Client ID: ${clientId}, role: ${role}`);
console.log("Komandat:");
console.log("  /list");
console.log("  /read <filename>");
console.log("  /upload <local_filename>   (vetëm admin)");
console.log("  /download <filename>");
console.log("  /delete <filename>         (vetëm admin)");
console.log("  /search <keyword>          (kërkim i file-ve sipas emrit)");
console.log("  /info <filename>           (madhësia, data e krijimit dhe modifikimit)");
console.log("  <tekst i lirë>             (dërgohet si mesazh MSG)\n");

rl.prompt();

function sendToServer(commandLine) {
  const payload = `${clientId}|${role}|${commandLine}`;
  const buffer = Buffer.from(payload, "utf8");

  clientSocket.send(buffer, SERVER_PORT, SERVER_IP, (err) => {
    if (err) {
      console.error("Gabim gjatë dërgimit te serveri:", err.message);
      rl.prompt();
    }
  });
}

function saveDownloadedFile(filename, base64Data) {
  try {
    const buffer = Buffer.from(base64Data, "base64");
    const savePath = path.join(process.cwd(), filename);

    fs.writeFile(savePath, buffer, (err) => {
      if (err) {
        console.error("Gabim në ruajtjen e file-it:", err.message);
      } else {
        console.log(`✅ File "${filename}" u shkarkua dhe u ruajt lokalisht te: ${savePath}`);
      }
      rl.prompt();
    });
  } catch (error) {
    console.error("Gabim gjatë dekodimit të file-it:", error.message);
    rl.prompt();
  }
}