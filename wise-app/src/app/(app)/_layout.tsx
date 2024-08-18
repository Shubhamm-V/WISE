import { StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { COLORS } from "@/src/constants/colors";
import { TABS } from "@/src/constants/tabs";

const AppLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={({ navigation }) => {
        return {
          tabBarActiveTintColor: COLORS.primary,
          headerShown: false,
          tabBarStyle: {
            height: 54,
            paddingTop: 5,
            paddingBottom: 6,
          },
          tabBarLabel: navigation.isFocused() ? "●" : "",
        };
      }}
    >
      {TABS.map((tab, ind) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarInactiveTintColor: COLORS.dark,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                size={ind == 3 ? 26 : 24}
                name={focused ? tab.focusIcon : tab.icon}
                style={{ marginTop: ind == 3 ? -1 : 0 }}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default AppLayout;
