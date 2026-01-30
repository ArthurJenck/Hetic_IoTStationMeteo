# Topic & Payload

Prefix: `weather/<deviceId>/`

| Topic     | Sens       | Émis par      | Payload      |
| --------- | ---------- | ------------- | ------------ |
| `weather` | mesures    | ESP32 & DHT22 | JSON weather |
| `status`  | status     | ESP32         | JSON status  |
| `unite`   | unite type | WEB CLIENT    | JSON unite   |
| `mode`    | data mode  | WEB CLIENT    | JSON mode    |
