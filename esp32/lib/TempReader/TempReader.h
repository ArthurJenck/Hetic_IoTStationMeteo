#include <Arduino.h>
#include <DHT.h>

class TempReader {
    public :
        TempReader(const int DHT_Pin, const int DHT_Type, bool DHT_Unit = false, bool Dev_Mode = false);
        float getTemp();
        String getUnit();
        void switchUnit();
        void switchMode();
        ~TempReader();

    private :
        const int _DHT_Pin;
        const int _DHT_Type;
        bool _DHT_Unit;
        bool _Dev_Mode;
        DHT* _dht;
};