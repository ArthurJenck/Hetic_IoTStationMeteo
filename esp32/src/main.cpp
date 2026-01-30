#include <Arduino.h>
#include <DHT.h>
#include <TempReader.h>
#include <WifiConnection.h>

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

bool tempType = false;

TempReader* dht;

WifiConnection* wifi;


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
  dht = new TempReader(DHT_Pin, DHT_Type);

  // Connect to WiFi
  wifi = new WifiConnection(SSID, PASS);
}

void loop() {
  const float temp = dht->getTemp();
  const String unit = dht->getUnit();

  Serial.print(temp);
  Serial.println(unit);

  delay(2000);
}

void switchTemp() {
  tempType = !tempType;
}