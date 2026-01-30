const WebSocket = require("ws");
const mqtt = require("mqtt");

const TEST_MODE = process.argv.includes("--test");
const LOCAL_MQTT_URL = "mqtt://localhost:1883";
const REMOTE_MQTT_URL = "mqtt://captain.dev0.pandor.cloud:1884";
const WS_PORT = 8080;

const wss = new WebSocket.Server({ port: WS_PORT });
const clients = new Set();

// === TEST MODE ===
function generateWeatherData() {
  return {
    temp: Math.floor(Math.random() * 30) + 5,
    unite: "°C",
    humidity: Math.floor(Math.random() * 60) + 30,
  };
}

function broadcastTestWeather() {
  const data = generateWeatherData();
  const payload = JSON.stringify({
    topic: "weather/test",
    data,
    timestamp: Date.now(),
  });

  console.log("Sending test weather data:", data);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

if (TEST_MODE) {
  console.log("Running in TEST MODE - sending simulated weather data every 3s");
  setInterval(broadcastTestWeather, 3000);
}

// === MQTT MODE ===
let localMqtt, remoteMqtt;

if (!TEST_MODE) {
  localMqtt = mqtt.connect(LOCAL_MQTT_URL);
  remoteMqtt = mqtt.connect(REMOTE_MQTT_URL);
}

function broadcastToClients(topic, message) {
  let data;
  try {
    data = JSON.parse(message.toString());
  } catch {
    data = message.toString();
  }

  const payload = {
    topic,
    data,
    timestamp: Date.now(),
  };

  console.log("MQTT message:", topic, data);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  }
}

if (!TEST_MODE) {
  // Local MQTT
  localMqtt.on("connect", () => {
    console.log("Connected to LOCAL MQTT broker");
    localMqtt.subscribe(["weather/#"], (err) => {
      if (err) {
        console.error("Failed to subscribe to local topics:", err);
      } else {
        console.log("Subscribed to weather/# (local)");
      }
    });
  });

  localMqtt.on("message", broadcastToClients);

  localMqtt.on("error", (err) => {
    console.error("Local MQTT error:", err);
  });

  // Remote MQTT
  remoteMqtt.on("connect", () => {
    console.log("Connected to REMOTE MQTT broker (captain.dev0.pandor.cloud)");
    remoteMqtt.subscribe(["weather/#"], (err) => {
      if (err) {
        console.error("Failed to subscribe to remote topics:", err);
      } else {
        console.log("Subscribed to weather/# (remote)");
      }
    });
  });

  remoteMqtt.on("message", broadcastToClients);

  remoteMqtt.on("error", (err) => {
    console.error("Remote MQTT error:", err);
  });
}

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");
  clients.add(ws);

  ws.on("message", (message) => {
    if (TEST_MODE) return;

    try {
      const { topic, data } = JSON.parse(message.toString());
      if (topic && data) {
        if (topic.startsWith("weather/")) {
          remoteMqtt.publish(topic, JSON.stringify(data));
          console.log("Published to REMOTE MQTT:", topic, data);
        } else {
          localMqtt.publish(topic, JSON.stringify(data));
          console.log("Published to LOCAL MQTT:", topic, data);
        }
      }
    } catch (e) {
      console.error("Failed to parse WS message:", e);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clients.delete(ws);
  });
});

console.log(`WebSocket server running on port ${WS_PORT}`);
