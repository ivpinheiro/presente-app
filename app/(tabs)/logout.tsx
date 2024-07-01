import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "@/app/context/AuthContext";

const LoginScreen = () => {
  const { onLogout } = useAuth();

  const logout = async () => {
    try {
      await onLogout!();
    } catch (error) {
      alert("An error occurred during login");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#5859e9", "#52337c"]}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.containerLogo}>
          <FontAwesome5 name="calendar-check" size={54} color="white" />
          <Text style={styles.bannerText}>presente!</Text>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => logout()}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={["#5859e9", "#52337c"]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  banner: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bannerText: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonGradient: {
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    height: 60,
    width: "50%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LoginScreen;
