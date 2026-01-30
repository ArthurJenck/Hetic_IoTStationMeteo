// Define LEDs
#define RED_LED 4
#define GREEN_LED 3

#define TMP_PIN A0

void switchtTemp();

void setup() {
  Serial.begin(115200);
  
  // Setup led
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
}

void loop() {
  int TMPValue = analogRead(TMP_PIN);
  double Voltage = (TMPValue / 1023.0) * 5000;
  double tempC = (Voltage - 500) * 0.1;
  
  Serial.println(tempC);
  delay(1000);
}