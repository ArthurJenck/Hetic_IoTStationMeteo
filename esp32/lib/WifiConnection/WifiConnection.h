#include <Arduino.h>
#include <WiFi.h>

class WifiConnection {
    public :
        WifiConnection(const char* SSID, const char* PASS);
    
    private :
        String _SSID;
        String _PASS;
};