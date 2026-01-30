# Hetic_IoTStationMeteo

IoT school project. The goal is to create a independant minimalist weather station.

### Team:

- Arnaud Fischer
- Arthur Jenck
- Alexis Gontier
- Louis Dondey
- Maxime Bidan

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

## Suggested steps

### 1. Préparation (sans matériel)

- [x] Définir le schéma de câblage
- [x] Choisir les pins GPIO
- [x] Définir le format JSON des messages
- [x] Définir les topics MQTT

### 2. Code ESP32 — Mode simulation

- [ ] Implémenter la génération de données fictives
- [ ] Implémenter le bouton avec debounce
- [ ] Implémenter les LEDs indicatrices
- [x] Tester sur TinkerCAD

### 3. Communication MQTT

- [ ] Connexion WiFi
- [ ] Connexion au broker MQTT
- [ ] Publication des données
- [ ] (Bonus) Réception des commandes

### 4. Interface web

- [x] Bridge MQTT → WebSocket
- [x] Page HTML avec affichage temps réel
- [ ] (Bonus) Bouton pour changer l'unité

### 5. Intégration DHT22

- [x] Emprunter un capteur
- [ ] Adapter le code pour lecture réelle
- [ ] Valider le fonctionnement complet

### 6. Parcours B uniquement

- [ ] Installer Mosquitto sur le Pi
- [ ] Configurer le Pi en Access Point
- [ ] Déployer le serveur web
- [ ] Tester en mode autonome
