import { View, Text } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const [iconColor, setIconColor] = useState("#3b5998");

  const changeIconColor = (newColor: string) => {
    setIconColor(newColor);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: "bold",
          color: "#F2F2F2",
          fontFamily: "InterRegular",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#5859e9", "#52337c"]}
            style={styles.tabBarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
          tabBarLabel: "Profile",
        }}
      />
      <Tabs.Screen
        name="manager"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="table-list" color={color} size={size} />
          ),
          tabBarLabel: "Manager",
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={size} />
          ),
          tabBarLabel: "Logout",
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  tabBarGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
