#include <Arduino.h>
#include <WiFi.h>
#include <WifiConnection.h>

WifiConnection::WifiConnection(const char* SSID, const char* PASS)
    : _SSID(SSID), _PASS(PASS) {
        
        // Start Connection
        Serial.println("\n[WiFi] Connection...");
        WiFi.mode(WIFI_STA);
        WiFi.begin(_SSID.c_str(), _PASS.c_str());

        int timeout = 0;
        while (WiFi.status() != WL_CONNECTED && timeout < 500) {
            delay(500);
            Serial.print(".");
            timeout++;
        }

        if(WiFi.status() == WL_CONNECTED) {
            Serial.println("[WiFi] OK - IP : " + WiFi.localIP().toString());
        }
    }
