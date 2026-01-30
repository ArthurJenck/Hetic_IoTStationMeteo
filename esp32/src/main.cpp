#include <Arduino.h>
#include <DHT.h>
#include <TempReader.h>
#include <WifiConnection.h>
#include <MQTTConnection.h>

// Define LEDs
#define RED_LED 25
#define GREEN_LED 26


// Define DHT
#define DHT_Pin 27
#define DHT_Type 11


// Define Button
#define BUTTON_LED 33
#define BUTTON_DEV 32

// Define WiFi auth
#define SSID "iCellulaire"
#define PASS "mBi540816"

// Define MQTT
#define MQTT_HOST "172.20.48.1"
#define MQTT_PORT 1883
#define MQTT_TOPIC "weather/"
#define DEVICE_ID "esp32_01"

bool tempType = false;

TempReader* dht;

WifiConnection* wifi;

MQTTConnection* mqtt;


void switchtTemp();

void setup() {
  Serial.begin(115200);
  
  // Setup LEDs
  // pinMode(RED_LED, OUTPUT);
  // pinMode(GREEN_LED, OUTPUT);

  // Setup Buttons
  pinMode(BUTTON_LED, OUTPUT);
  pinMode(BUTTON_DEV, OUTPUT);

  // Setup DHT
  dht = new TempReader(DHT_Pin, DHT_Type, false, true);

  // Connect to WiFi
  wifi = new WifiConnection(SSID, PASS);

  // Connect to MQTT
  mqtt = new MQTTConnection(MQTT_HOST, MQTT_PORT, MQTT_TOPIC);
}

void loop() {
  const float temp = dht->getTemp();
  const String unit = dht->getUnit();

  Serial.print(temp);
  Serial.println(unit);

  StaticJsonDocument<256> doc;
  doc["device_id"] = DEVICE_ID;
  doc["ts"] = millis();
  JsonObject humidity = doc.createNestedObject("humidity");
  humidity["unit"] = "%";
  humidity["value"] = 48.1;
  JsonObject temperature = doc.createNestedObject("temperature");
  temperature["unit"] = "F";
  temperature["value"] = 17.0;

  mqtt->sendMessage(doc);

  delay(2000);
}

void switchTemp() {
  tempType = !tempType;
}