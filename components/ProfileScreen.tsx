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
import { Formik } from "formik";
import { useAuth } from "@/app/context/AuthContext";

const ProfileScreen = () =>{
    return (
        <View>
          <Text>TESTING</Text>
        </View>
      );
}

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
  
  export default ProfileScreen;
  