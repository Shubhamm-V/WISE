import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { useAuth } from "@/src/context/authContext";

type Props = {};

const home = (props: Props) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View>
      <Text>home</Text>
      <CustomButton label="Logout" onPress={handleLogout} />
    </View>
  );
};

export default home;
