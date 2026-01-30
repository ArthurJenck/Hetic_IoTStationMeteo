#include <Arduino.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

class MQTTConnection {
    public :
        MQTTConnection(const char* MQTT_HOST, const int MQTT_PORT, const char* MQTT_TOPIC);
        void sendMessage(const StaticJsonDocument<256> doc);
        void loop();

    private :
        String _MQTT_HOST;
        String _MQTT_TOPIC;
        int _MQTT_PORT; 
        
};