import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, Image, Pressable } from "react-native";
import { getAuth } from "firebase/auth";
import { useRouter } from "expo-router";
import CustomText from "../components/custom-widgets/CustomText";
import { COLORS } from "../constants/colors";

const EmailVerificationScreen = () => {
  const [checking, setChecking] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  const checkEmailVerified = async () => {
    const user: any = auth.currentUser;
    await user.reload(); // Refresh user data
    return user.emailVerified;
  };

  const checkVerificationStatus = async () => {
    setChecking(true);
    const isVerified = await checkEmailVerified();

    if (isVerified) {
      router.replace("/home"); // Redirect to home screen
    } else {
    }
    setChecking(false);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await checkVerificationStatus();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={require("../../assets/images/illustrations/email-verification.png")}
        style={{ height: 170, width: 170 }}
      />
      <CustomText
        label=" Please verify your email. Check your inbox and click on the verification link."
        customStyle={{ textAlign: "center", paddingVertical: 20 }}
      />
      <Pressable
        onPress={async () => {
          const isVerified = await checkEmailVerified();
          if (isVerified) Alert.alert("Email is Verified");
          else Alert.alert("Email is not verified yet");
        }}
      >
        <CustomText
          label="Check Verification Status"
          customStyle={{
            color: COLORS.primary,
            textDecorationLine: "underline",
            fontSize: 15,
          }}
        />
      </Pressable>
    </View>
  );
};

export default EmailVerificationScreen;
