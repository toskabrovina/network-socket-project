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

function handleUserInput(line) {
  line = line.trim();

  if (!line) {
    rl.prompt();
    return;
  }

  if (line === "/list" || line.startsWith("/list ")) {
    sendToServer("LIST");
    return;
  }

  if (line.startsWith("/read ") || line === "/read") {
    const filename = line.startsWith("/read ") ? line.slice(6).trim() : "";

    if (!filename) {
      console.log("Përdor: /read <filename>");
      rl.prompt();
      return;
    }

    sendToServer(`READ ${filename}`);
    return;
  }

  if (line.startsWith("/upload ") || line === "/upload") {
    const localPath = line.startsWith("/upload ") ? line.slice(8).trim() : "";

    if (!localPath) {
      console.log("Përdor: /upload <local_filename>");
      rl.prompt();
      return;
    }

    if (role !== "admin") {
      console.log("Kjo komandë lejohet vetëm për admin.");
      rl.prompt();
      return;
    }

    fs.readFile(localPath, (err, data) => {
      if (err) {
        console.error("Nuk mund të lexohet file-i lokal:", err.message);
        rl.prompt();
        return;
      }

      const base64 = data.toString("base64");
      const filename = path.basename(localPath);

      sendToServer(`UPLOAD ${filename} ${base64}`);
      console.log(`📤 Duke dërguar "${filename}" në server...`);
      rl.prompt();
    });

    return;
  }
if (line.startsWith("/download ") || line === "/download") {
    const filename = line.startsWith("/download ") ? line.slice(10).trim() : "";

    if (!filename) {
      console.log("Përdor: /download <filename>");
      rl.prompt();
      return;
    }

    sendToServer(`DOWNLOAD ${filename}`);
    return;
  }

  if (line.startsWith("/delete ") || line === "/delete") {
    const filename = line.startsWith("/delete ") ? line.slice(8).trim() : "";

    if (!filename) {
      console.log("Përdor: /delete <filename>");
      rl.prompt();
      return;
    }

    if (role !== "admin") {
      console.log("Kjo komandë lejohet vetëm për admin.");
      rl.prompt();
      return;
    }

    sendToServer(`DELETE ${filename}`);
    return;
  }

  if (line.startsWith("/search ") || line === "/search") {
    const keyword = line.startsWith("/search ") ? line.slice(8).trim() : "";

    if (!keyword) {
      console.log("Përdor: /search <keyword>");
      rl.prompt();
      return;
    }

    sendToServer(`SEARCH ${keyword}`);
    return;
  }

  if (line.startsWith("/info ") || line === "/info") {
    const filename = line.startsWith("/info ") ? line.slice(6).trim() : "";

    if (!filename) {
      console.log("Përdor: /info <filename>");
      rl.prompt();
      return;
    }

    sendToServer(`INFO ${filename}`);
    return;
  }

  sendToServer(`MSG ${line}`);
}

rl.on("line", handleUserInput);

clientSocket.on("message", (msg) => {
  const text = msg.toString("utf8");

  if (text.startsWith("FILEDATA ")) {
    // Format i pritur:
    // FILEDATA filename base64data
    const firstSpace = text.indexOf(" ");
    const secondSpace = text.indexOf(" ", firstSpace + 1);

    if (secondSpace === -1) {
      console.log("Format i pavlefshëm i FILEDATA nga serveri.");
      rl.prompt();
      return;
    }

    const filename = text.substring(firstSpace + 1, secondSpace).trim();
    const base64Data = text.substring(secondSpace + 1).trim();

    if (!filename || !base64Data) {
      console.log("Të dhëna të paplota për file download.");
      rl.prompt();
      return;
    }

    saveDownloadedFile(filename, base64Data);
  } else {
    console.log(`Server:\n${text}\n`);
    rl.prompt();
  }
});

clientSocket.on("error", (err) => {
  console.error("UDP socket error:", err.message);
  rl.prompt();
});

rl.on("close", () => {
  console.log("\nKlienti po mbyllet...");
  clientSocket.close();
  process.exit(0);
});