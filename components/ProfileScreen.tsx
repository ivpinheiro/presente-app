import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik } from "formik";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/app/context/api";

const ProfileScreen = () =>{
    const [email, setEmail] = useState('cora.almeida@gmail.com');
    const [name, setName] = useState('Cora Almeida');
    const [password, setPassword] = useState('*******');
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isNameEditable, setIsNameEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const handleEmailChange = (newEmail: string) => {
      setEmail(newEmail);
      setIsButtonVisible(true);
    };
  
    const handleNameChange = (newName: string) => {
      setName(newName);
      setIsButtonVisible(true);
    };
  
    const handlePasswordChange = (newPassword: string) => {
      setPassword(newPassword);
      setIsButtonVisible(true);
    };
  
    const handleConfirmChanges = () => {
      // Substitui por chamada a API
      console.log("Alterações confirmadas:");
      console.log("Email:", email);
      console.log("Nome:", name);
      console.log("Senha:", password);
  
      // Atualizar estados para não editáveis
      setIsEmailEditable(false);
      setIsNameEditable(false);
      setIsPasswordEditable(false);
  
      // Ocultar botão de confirmação
      setIsButtonVisible(false);
    };

    return (
      <View style={styles.container}>
      <LinearGradient
        colors={["#5859e9", "#52337c"]}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.circularContainer}>
          <FontAwesome5 name="user" size={50} color="black" />
        </View>
      </LinearGradient>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>e-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            editable={isEmailEditable}
            placeholder="cora.almeida@gmail.com"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome</Text>
            <TouchableOpacity onPress={() => setIsNameEditable(!isNameEditable)}>
              <FontAwesome5 name="pen" size={15} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            editable={isNameEditable}
            placeholder="Cora Almeida"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Senha</Text>
            <TouchableOpacity onPress={() => setIsPasswordEditable(!isPasswordEditable)}>
              <FontAwesome5 name="pen" size={15} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            editable={isPasswordEditable}
            placeholder="*******"
            secureTextEntry
          />
        </View>
      </View>
      {isButtonVisible && (
        <LinearGradient
          colors={["#5859e9", "#52337c"]}
          style={styles.confirmButton}
        >
          <TouchableOpacity style={styles.confirmButtonInner} onPress={handleConfirmChanges}>
            <Text style={styles.confirmButtonText}>Confirmar Alterações</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 0,
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
      top: 0,
      left: 0,
      right: 0,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      },
      circularContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 120,
        height: 120,
        marginTop: -20, 
        marginLeft: -60,
        borderRadius: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: {
      marginRight: 8,
    },
    confirmButton: {
      position: 'absolute',
      bottom: 20,
      left: 40,
      right: 40,
      padding: 2,
      borderRadius: 10,
      overflow: "hidden",
    },
    confirmButtonInner: {
      alignItems: 'center',
      padding: 15,
    },
    confirmButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 40,
      gap: 60,
    },
  });
  
  export default ProfileScreen;
  