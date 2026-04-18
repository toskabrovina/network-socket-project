const path = require("path");

module.exports = {
  SERVER_PORT: 5000,
  HTTP_PORT: 8080,

  // IP e serverit ne rrjet lokal (LAN)
  SERVER_IP: "127.0.0.1",  
  MAX_CLIENTS: 4,
  CLIENT_TIMEOUT_MS: 120_000,
  SHARED_FOLDER: path.join(__dirname, "shared"),
  STATS_LOG_FILE: path.join(__dirname, "server_stats.txt"),
};