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
#define MQTT_HOST "172.20.10.11"
#define MQTT_PORT 1883
#define MQTT_TOPIC "weather/"
#define DEVICE_ID "esp32_01"

bool tempType = false;

TempReader* dht;

WifiConnection* wifi;

MQTTConnection* mqtt;

unsigned long lastButtonUnitState = 0;
unsigned long lastButtonDevPress = 0;
const unsigned long debounceDelay = 500;
bool lastButtonState = HIGH;
bool buttonUnitState = HIGH;
bool buttonDevState = HIGH;

void switchtTemp();

void setup() {
  Serial.begin(115200);
  
  // Setup LEDs
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

  // Setup Buttons
  pinMode(BUTTON_LED, INPUT_PULLUP);
  pinMode(BUTTON_DEV, INPUT_PULLUP);

  // Setup DHT
  dht = new TempReader(DHT_Pin, DHT_Type);

  // Connect to WiFi
  wifi = new WifiConnection(SSID, PASS);

  // Connect to MQTT
  mqtt = new MQTTConnection(MQTT_HOST, MQTT_PORT, MQTT_TOPIC);

  if (dht->getUnit() == "C") {
    digitalWrite(RED_LED, HIGH);
    digitalWrite(GREEN_LED, LOW);
  } else {
    digitalWrite(RED_LED, LOW);
    digitalWrite(GREEN_LED, HIGH);
  }
}

void loop() {

  mqtt->loop();

  buttonUnitState = digitalRead(BUTTON_LED);
  buttonDevState = digitalRead(BUTTON_DEV);

  if (buttonDevState == LOW && lastButtonDevPress == HIGH) {
    unsigned long currentTime = millis();
    if (currentTime - lastButtonDevPress >= debounceDelay) {
      lastButtonDevPress = currentTime;
      
      dht->switchMode();
    }
  }

  if (buttonUnitState == LOW && lastButtonUnitState == HIGH) {
    unsigned long currentTime = millis();
    if (currentTime - lastButtonUnitState >= debounceDelay) {
      lastButtonUnitState = currentTime;
      
      dht->switchUnit();
      
      // Switch LEDs: red = Celsius, green = Fahrenheit
      if (dht->getUnit() == "C") {
        digitalWrite(RED_LED, HIGH);
        digitalWrite(GREEN_LED, LOW);
      } else {
        digitalWrite(RED_LED, LOW);
        digitalWrite(GREEN_LED, HIGH);
      }
    }
  }

  lastButtonUnitState = buttonUnitState;
  lastButtonDevPress = buttonDevState;

  const float temp = dht->getTemp();
  const String unit = dht->getUnit();

  StaticJsonDocument<256> doc;
  doc["device_id"] = DEVICE_ID;
  doc["ts"] = millis();
  
  JsonObject humidity = doc.createNestedObject("humidity");
  humidity["unit"] = "%";
  humidity["value"] = 48.1;
  
  JsonObject temperature = doc.createNestedObject("temperature");
  temperature["unit"] = unit;
  temperature["value"] = temp;

  mqtt->sendMessage(doc);

  delay(2000);
}