# Topic & Payload

Prefix: `weather/<deviceId>/`

| Topic  | Sens | Émis par | Payload |
| ------------- | ------------- | ------------- | ------------ |
|`telemetry` | mesures | ESP32 | JSON telemetry
|`temp` | mesures | DHT22 | JSON temperature
|`humi` | mesures | DHT22 | JSON humidity
|`status` | status | ESP32 | JSON status
