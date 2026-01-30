#include <Arduino.h>
#include <TempReader.h>

TempReader::TempReader(const int DHT_Pin, const int DHT_Type, bool DHT_Unit, bool Dev_Mode)
    : _DHT_Pin(DHT_Pin), _DHT_Type(DHT_Type), _DHT_Unit(DHT_Unit) ,_Dev_Mode(Dev_Mode) {
        Serial.println("Initialization of captor...");
    
        _dht = new DHT(_DHT_Pin, _DHT_Type);
        _dht->begin();
        
        Serial.println("Waiting for captor...");
        delay(2000);
        
        float testTemp = _dht->readTemperature();
        
        Serial.println("Config:");
        Serial.printf("DHT Pin: %d\n", _DHT_Pin);
        Serial.printf("DHT Type: %d\n", _DHT_Type);
        Serial.printf("Unit: %s\n", _DHT_Unit ? "F" : "C");
        Serial.printf("Dev Mode: %s\n", _Dev_Mode ? "true" : "false");
    }

float TempReader::getTemp() {
    float temp;

    if (_Dev_Mode) {
        // Change to better simulated values
        return 30;
    } else {
        return _dht->readTemperature(_DHT_Unit);
    }
}

String TempReader::getUnit() {
    return _DHT_Unit ? "F" : "C";
}

void TempReader::switchMode() {
    _Dev_Mode = !_Dev_Mode;
    Serial.printf("Dev mode : %s", _Dev_Mode ? "true" : "false");
}

void TempReader::switchUnit() {
    _DHT_Unit = !_DHT_Unit;
    Serial.printf("Unit : %s", _DHT_Unit ? "F" : "C");
}

TempReader::~TempReader() {
    delete _dht;
}