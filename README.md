# Hetic_IoTStationMeteo

IoT school project. The goal is to create a independant minimalist weather station.

### Team:

**_Arnaud Fischer - Arthure Jenck - Alexis Gontier - Louis Dondey - Maxime Bidan_**

## Bridge

### Run local:

#### Normal mode (use mqtt)

```bash
cd bridge
node server.js
```

#### Test mode

_broadcast fake data for the web client in case mqtt don't works_

```bash
cd bridge
node server.js --test
```
