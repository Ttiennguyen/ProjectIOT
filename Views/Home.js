import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [showGarden1, setShowGarden1] = useState(false);
  const [showGarden2, setShowGarden2] = useState(false);
  const [showInforDevice, setShowInforDevice] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const navigation = useNavigation();

  const handleButton = () => {
    setShowGarden1(true);
    navigation.navigate("Garden1");
  };

  const handleButton2 = () => {
    setShowGarden2(true);
    navigation.navigate("Garden2");
  };

  const handleButton3 = () => {
    setShowInforDevice(true);
    navigation.navigate("InforDevice");
  };

  const handleButton4 = () => {
    setShowAboutUs(true);
    navigation.navigate("AboutUs");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtTitle}>Smart Garden</Text>
      </View>

      <View style={styles.main}>
        <Pressable style={styles.btnOn} onPress={handleButton2}>
          <Text style={styles.btnText}> Garden  </Text>
        </Pressable>
      </View>

      <View style={styles.main}>
        <Pressable style={styles.btnOn} onPress={handleButton}>
          <Text style={styles.btnText}> Device Connection Diagram </Text>
        </Pressable>
      </View>


      <View style={styles.main}>
        <Pressable style={styles.btnOn} onPress={handleButton3}>
          <Text style={styles.btnText}> Device Information </Text>
        </Pressable>
      </View>

      <View style={styles.main}>
        <Pressable style={styles.btnOn} onPress={handleButton4}>
          <Text style={styles.btnText}> About Us </Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Phát triển ứng dụng IOT </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Màu nền của trang
  },
  header: {
    marginTop: 50,
    marginBottom: 30,
  },
  txtTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50", // Màu tiêu đề
  },
  main: {
    marginVertical: 10,
  },
  btnOn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
  },
  footerText: {
    color: "#4CAF50", // Màu chữ của footer
    fontSize: 16,
  },
});

export default Home;
