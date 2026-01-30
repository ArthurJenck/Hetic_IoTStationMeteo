#include <Arduino.h>
#include <MQTTConnection.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

WiFiClient espClient;
PubSubClient mqttConn(espClient);

MQTTConnection::MQTTConnection(const char* MQTT_HOST, const int MQTT_PORT, const char* MQTT_TOPIC)
    : _MQTT_HOST(MQTT_HOST), _MQTT_PORT(MQTT_PORT), _MQTT_TOPIC(MQTT_TOPIC) {
        if (mqttConn.connected()) {
            mqttConn.disconnect();
        }

        mqttConn.setServer(_MQTT_HOST.c_str(), _MQTT_PORT);
        mqttConn.setKeepAlive(60);
        mqttConn.setSocketTimeout(15);

        Serial.println("[MQTT] Connection...");
        String clientId = "esp32-" + String((uint32_t)ESP.getEfuseMac(), HEX);

        for (int i = 0; i < 3; i++) {
            if(mqttConn.connect(clientId.c_str())) {
                Serial.println("[MQTT] Connected");
                return;
            }
            delay(1000);
        }
    }

void MQTTConnection::sendMessage(const StaticJsonDocument<256> doc) {
    char payload[256];
    size_t n = serializeJson(doc, payload, sizeof(payload));

    bool status = mqttConn.publish(_MQTT_TOPIC.c_str(), payload, n);

    Serial.println("[MQTT]" + status ? "Data send" : "Error sending data");
}