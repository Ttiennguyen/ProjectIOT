import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue, set } from "firebase/database";
import { database } from './firebaseConfig';  

const Garden2 = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(null);
  const [relayStatus, setRelayStatus] = useState(null);
  const [relayMode, setRelayMode] = useState(null);

  useEffect(() => {
    const tempRef = ref(database, 'DHT11/temperature');
    const humidityRef = ref(database, 'DHT11/humidity');
    const soilMoistureRef = ref(database, 'SoilMoisture');
    const relayStatusRef = ref(database, 'Relay/status');
    const relayModeRef = ref(database, 'Relay/mode');

    onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Temperature data:', data);
      setTemperature(data);
    });

    onValue(humidityRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Humidity data:', data);
      setHumidity(data);
    });

    onValue(soilMoistureRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Soil Moisture data:', data);
      setSoilMoisture(data && data.value); // Assuming data is nested
    });

    onValue(relayStatusRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Relay Status data:', data);
      // Update relayStatus based on received data
      setRelayStatus(data === 'ON' ? true : false); // Convert 'ON' string to true, otherwise false
    });

    onValue(relayModeRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Relay Mode data:', data);
      setRelayMode(data); 
    });
  }, []);

  const toggleRelayStatus = () => {
    // Toggle relay status between 'On' and 'Off'
    const newStatus = relayStatus ? 'OFF' : 'ON';
    set(ref(database, 'Relay/status'), newStatus);
  };

  const toggleRelayMode = () => {
    // Toggle relay mode between 'AUTO' and 'MANUAL'
    const newMode = relayMode === 'AUTO' ? 'MANUAL' : 'AUTO';
    set(ref(database, 'Relay/mode'), newMode);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garden Monitor</Text>
      <Text style={styles.text}>Temperature: {temperature} °C</Text>
      <Text style={styles.text}>Humidity: {humidity} %</Text>
      <Text style={styles.text}>Soil Moisture: {soilMoisture} %</Text>
      <Text style={styles.text}>Relay Status: {relayStatus ? 'On' : 'Off'}</Text>
      <Button
        onPress={toggleRelayStatus}
        title={relayStatus ? 'Turn Off Relay' : 'Turn On Relay'}
      />
      <Button
        onPress={toggleRelayMode}
        title={relayMode === 'AUTO' ? 'Switch to MANUAL Mode' : 'Switch to AUTO Mode'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Garden2;
