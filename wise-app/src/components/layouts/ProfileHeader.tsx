import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/src/constants/colors";
import CustomText from "../custom-widgets/CustomText";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "@/src/context/authContext";
import { Avatar } from "@rneui/base";
import { router } from "expo-router";
const ProfileHeader = () => {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <LinearGradient
      colors={["#E0F7FA", COLORS.light]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <View style={styles.header}>
        <View style={styles.upperPart}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View>
              <Icon style={styles.logout} name="log-out-outline" size={30} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.leftHeader}>
          <TouchableOpacity>
            <Image
              style={styles.profileImage}
              source={require("../../../assets/images/illustrations/profile1.png")}
            />
          </TouchableOpacity>
          <View>
            <CustomText label={user?.name} customStyle={styles.nameTextStyle} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
  },
  leftHeader: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logout: {
    color: COLORS.dark,
  },
  nameTextStyle: {
    color: COLORS.dark,
    fontFamily: "DMSansRegular",
    fontSize: 18,
    marginTop: 10,
    lineHeight: 20,
  },
  upperPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  emailTextStyle: { color: COLORS.dark },

  profileImage: {
    borderRadius: 100,
    height: 70,
    width: 70,
    borderColor: "#75AABF",
    borderWidth: 1,
  },
});
