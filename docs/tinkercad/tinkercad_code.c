// Define LEDs
#define RED_LED 4
#define GREEN_LED 3

#define BUTTON_PIN 2

#define TMP_PIN A0

bool previousButtonState = 1;
bool showCelsius = 1;
bool showFarenheit = 0;

void switchtTemp();

void setup() {
  Serial.begin(115200);
  
  // Setup led
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  
  // Setup button
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void loop() {
  int TMPValue = analogRead(TMP_PIN);
  // Read temp according to voltage (related to TMP)
  double Voltage = (TMPValue / 1023.0) * 5000;
  double tempC = (Voltage - 500) * 0.1;
  double tempF = (tempC * 1.8) + 32;
  
  bool buttonState = digitalRead(BUTTON_PIN);
  
  if (buttonState != previousButtonState) {
    if (buttonState == HIGH) {
      // Toggle temp mode
      showCelsius = !showCelsius;
      showFarenheit = !showFarenheit;
      
      // Turn Leds off
      digitalWrite(RED_LED, LOW);
      digitalWrite(GREEN_LED, LOW);
    }
    
  	previousButtonState = buttonState;
  }
  
  // display celsius temperature + turning led on
  if (showCelsius) {
    Serial.println(tempC);
    digitalWrite(RED_LED, HIGH);
  }
  
  // display farenheit temperature + turning led on
  if (showFarenheit) {
    Serial.println(tempF);
    digitalWrite(GREEN_LED, HIGH);
  }
}
