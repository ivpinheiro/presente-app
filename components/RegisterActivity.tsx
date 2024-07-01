import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik } from "formik";
import CustomCheckbox from "./CustomCheckbox"; // Adjust the path as necessary
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RegisterDisciplineScreen: React.FC = () => {
  const [initialDays, setDays] = useState([
    { day: "Segunda-feira", isChecked: false, startTime: "", endTime: "" },
    { day: "Terça-feira", isChecked: false, startTime: "", endTime: "" },
    { day: "Quarta-feira", isChecked: false, startTime: "", endTime: "" },
    { day: "Quinta-feira", isChecked: false, startTime: "", endTime: "" },
    { day: "Sexta-feira", isChecked: false, startTime: "", endTime: "" },
    { day: "Sábado", isChecked: false, startTime: "", endTime: "" },
    { day: "Domingo", isChecked: false, startTime: "", endTime: "" },
  ]);

  const addDayAtPosition = (
    position: number,
    newDay: {
      day: string;
      isChecked: boolean;
      startTime: string;
      endTime: string;
    },
    setFieldValue: any
  ) => {
    const newDays = [...initialDays];
    newDays.splice(position, 0, newDay);
    setDays(newDays);
    setFieldValue("days", newDays);
  };

  const removeDayAtPosition = (position: number, setFieldValue: any) => {
    const newDays = [...initialDays];
    newDays.splice(position, 1);
    setDays(newDays);
    setFieldValue("days", newDays);
  };
  const mapWeek = [
    { day: "Segunda-feira", number: 1 },
    { day: "Terça-feira", number: 2 },
    { day: "Quarta-feira", number: 3 },
    { day: "Quinta-feira", number: 4 },
    { day: "Sexta-feira", number: 5 },
    { day: "Sábado", number: 6 },
    { day: "Domingo", number: 7 },
  ];
  const handleRegister = (values: { disciplineName: string; days: any[] }) => {
    const activitiesWeek = values.days
      .filter((item) => item.isChecked)
      .map((item) => {
        const dayMapping = mapWeek.find((dayMap) => dayMap.day === item.day);
        if (dayMapping) {
          return {
            dayWeek: dayMapping.number,
            activityTime: [{ start: item.startTime, end: item.endTime }],
          };
        }
      })
      .filter(Boolean);
    activitiesWeek.forEach((item: any) => {
      console.log(item);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#5859e9", "#52337c"]}
        style={styles.banner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Link href="/(tabs)/home" asChild>
          <Pressable style={styles.backButtonContainer}>
            <Ionicons
              name="arrow-back-sharp"
              size={24}
              color="black"
              style={styles.backButton}
            />
          </Pressable>
        </Link>
        <View style={styles.containerLogo}>
          <FontAwesome5 name="calendar-check" size={54} color="white" />
          <Text style={styles.bannerText}>Cadastrar Disciplina</Text>
        </View>
      </LinearGradient>
      <Formik
        initialValues={{ disciplineName: "", days: initialDays }}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <ScrollView contentContainerStyle={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Nome da disciplina"
              placeholderTextColor="#888"
              onChangeText={handleChange("disciplineName")}
              onBlur={handleBlur("disciplineName")}
              value={values.disciplineName}
            />
            {values.days.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <CustomCheckbox
                  isChecked={day.isChecked}
                  onPress={() =>
                    setFieldValue(`days[${index}].isChecked`, !day.isChecked)
                  }
                />
                <Text style={styles.dayText}>{day.day}</Text>
                <TextInput
                  style={[
                    styles.timeInput,
                    !day.isChecked && styles.disabledInput,
                  ]}
                  placeholder="Início"
                  placeholderTextColor="#888"
                  onChangeText={handleChange(`days[${index}].startTime`)}
                  onBlur={handleBlur(`days[${index}].startTime`)}
                  value={day.startTime}
                  editable={day.isChecked}
                />
                <TextInput
                  style={[
                    styles.timeInput,
                    !day.isChecked && styles.disabledInput,
                  ]}
                  placeholder="Fim"
                  placeholderTextColor="#888"
                  onChangeText={handleChange(`days[${index}].endTime`)}
                  onBlur={handleBlur(`days[${index}].endTime`)}
                  value={day.endTime}
                  editable={day.isChecked}
                />
                <TouchableOpacity
                  onPress={() =>
                    addDayAtPosition(index + 1, day, setFieldValue)
                  }
                  style={styles.buttonContainerAdd}
                >
                  <LinearGradient
                    colors={["#5859e9", "#52337c"]}
                    style={styles.buttonGradientAdd}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeDayAtPosition(index, setFieldValue)}
                  style={styles.buttonContainerRemove}
                >
                  <LinearGradient
                    colors={["red", "red"]}
                    style={styles.buttonGradientRemove}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={["#5859e9", "#52337c"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButtonContainer: {
    alignSelf: "flex-start",
    padding: 5,
  },
  backButton: {
    color: "white",
    width: "100%",
    fontSize: 32,
  },
  banner: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bannerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  dayText: {
    flex: 2,
    fontSize: 16,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#f9f9f9",
  },
  disabledInput: {
    backgroundColor: "#e0e0e0",
  },
  buttonGradientRemove: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    height: 50,
    width: "100%",
  },
  buttonContainerRemove: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    padding: 5,
  },
  buttonGradientAdd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    height: 50,
    width: "100%",
  },
  buttonContainerAdd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    padding: 5,
  },
  buttonContainer: {
    width: "100%",
  },
  buttonGradient: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    height: 50,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RegisterDisciplineScreen;
