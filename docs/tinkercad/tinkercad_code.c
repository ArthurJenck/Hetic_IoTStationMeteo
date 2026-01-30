// Define LEDs
#define RED_LED 4
#define GREEN_LED 3

#define TEMP_TOGGLE_PIN 2
#define SIM_MODE_PIN 5

#define TMP_PIN A0

bool previousTempToggleButton = HIGH;
bool showFarenheit = false;

bool previousSimModeButton = HIGH;
bool simModeForced = false;

bool sensorValid(double tempC) {
  return tempC > -40 && tempC < 125;
}

void setup() {
  Serial.begin(115200);
  
  // Setup led
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  
  // Setup button
  pinMode(TEMP_TOGGLE_PIN, INPUT_PULLUP);
  pinMode(SIM_MODE_PIN, INPUT_PULLUP);
}

void loop() {
  // Toggle temp unit when button clicked
  bool tempToggleButton = digitalRead(TEMP_TOGGLE_PIN);
  if (previousTempToggleButton == HIGH && tempToggleButton == LOW) {
    showFarenheit = !showFarenheit;
  }
  previousTempToggleButton = tempToggleButton;
  
  // Toggle simulation mode when button clicked
  bool simModeButton = digitalRead(SIM_MODE_PIN);
  if (previousSimModeButton == HIGH && simModeButton == LOW) {
    simModeForced = !simModeForced;
  }
  previousSimModeButton = simModeButton;
  
  int TMPValue = analogRead(TMP_PIN);
  // Read temp according to voltage (related to TMP)
  double voltage = (TMPValue / 1023.0) * 5000;
  double tempC = (voltage - 500) * 0.1;
  
  bool isValidSensor = sensorValid(tempC);
  
  bool simMode = simModeForced || !isValidSensor;
  
  // Turn Leds off
  digitalWrite(RED_LED, LOW);
  digitalWrite(GREEN_LED, LOW);
  
  // display temperature + turning led on
  if (showFarenheit) {
    if (simMode) {
      Serial.println(77);
    } else {
      double tempF = (tempC * 1.8) + 32;
      Serial.println(tempF);
      digitalWrite(GREEN_LED, HIGH);
    }  
  } else {
    if (simMode) {
      Serial.println(25);
    } else {
      Serial.println(tempC);
      digitalWrite(RED_LED, HIGH);  
    }  
  }
}
