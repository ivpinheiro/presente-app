import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from "expo-router";

const { width } = Dimensions.get("window");

const DetailsScreen: React.FC = () => {
  

  return (
    <Text>teste</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
    marginTop: 90,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
    color: "#242760",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  pickerGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#8183AF",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    flex: 1,
    height: 50,
    borderBottomWidth: 0,
    backgroundColor: "#8183AF",
  },
  activityPicker: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#8183AF",
    marginBottom: 20,
  },
  confirmButton: {
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  percentageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  percentageText: {
    fontSize: 42,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    color: "#242760",
    fontSize: 80,
  },
  detailsButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  detailsButton: {
    width: width - 40,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  detailsButtonInner: {
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
});

export default DetailsScreen;
