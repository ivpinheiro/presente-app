import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik } from "formik";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async (values: any) => {
    const { email, password } = values;
    console.log(email + password);
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  // const resgister = async () => {
  //   const result = await onRegister!(email, password);
  //   if (result && result.error) {
  //     alert(result.msg);
  //   } else {
  //     login();
  //   }
  // };

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
      <Formik initialValues={{ email: "", password: "" }} onSubmit={login}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={["#5859e9", "#52337c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBorder}
              >
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, { textAlign: "center" }]}
                    placeholder="email"
                    placeholderTextColor="#888"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={["#5859e9", "#52337c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBorder}
              >
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, { textAlign: "center" }]}
                    placeholder="senha"
                    placeholderTextColor="#888"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                </View>
              </LinearGradient>
            </View>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <LinearGradient
                colors={["#5859e9", "#52337c"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    gap: 60,
  },
  label: {
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 30,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 10,
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
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
  buttonGradient: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    height: 60,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LoginScreen;
