import React, { useContext, useEffect, useState } from "react";
import { Input } from "@rneui/themed";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/Ionicons";

import { object, string, ref } from "yup";

import { router } from "expo-router";
import { useAuth } from "../context/authContext";

let signupSchema = object({
  name: string()
    .matches(/\S/, "Name cannot be only spaces")
    .required("Name is required"),
  email: string()
    .email("Please enter valid email address")
    .required("Please enter email address"),
  password: string()
    .min(8, "Password length must be minimum 8")
    .max(16, "Password length must be less than 16")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("Password is required"),
  confirmPassword: string()
    .min(8, "Password length must be minimum 8")
    .max(16, "Password length must be less than 16")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .oneOf([ref("password"), ""], "Passwords and confirm password must be same")
    .required("Confirm Password is required"),
});

type User = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [initializing, setInitializing] = useState(true);
  const { signup } = useAuth();
  // const dispatch = useDispatch();

  // const onGoogleButtonPress = async () => {
  //   try {
  //     // Check if your device supports Google Play
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     // Get the users ID token
  //     const {idToken} = await GoogleSignin.signIn();

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     // Sign-in the user with the credential
  //     return auth().signInWithCredential(googleCredential);
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  // function onAuthStateChanged(user: any) {
  //   if (user) {
  //     const {displayName: name, email, photoURL} = user;
  //     dispatch(
  //       setGoogleLoginUser({name, email, photoURL, isGoogleLoggedIn: true}),
  //     );
  //     setIsLoggedIn(true);

  //     if (initializing) setInitializing(false);
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  const handleSignupSubmit = async (values: User) => {
    const { email, password, name } = values;
    let response: any = await signup(email, password, name);
    console.log("Got Signup  Result ", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          handleSignupSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          /* and other goodies */
        }) => (
          <>
            <View style={[styles.container]}>
              <CustomText
                label="Create An Account"
                customStyle={styles.header}
              />
              <View style={{ width: "100%" }}>
                <CustomText label="Full Name" customStyle={styles.inputText} />
                <Input
                  placeholder="Enter full name"
                  value={values.name}
                  inputContainerStyle={styles.inputStyle}
                  onChangeText={handleChange("name")}
                />
                {touched.name && errors.name && (
                  <CustomText
                    customStyle={styles.errorText}
                    label={errors.name}
                  />
                )}
              </View>

              <View style={{ width: "100%" }}>
                <CustomText label="Email" customStyle={styles.inputText} />
                <Input
                  placeholder="Enter email"
                  value={values.email}
                  inputContainerStyle={styles.inputStyle}
                  style={{ borderBottomWidth: 0 }}
                  onChangeText={handleChange("email")}
                />
                {touched.email && errors.email && (
                  <CustomText
                    customStyle={styles.errorText}
                    label={errors.email}
                  />
                )}
              </View>
              <View style={{ width: "100%" }}>
                <CustomText label="Password" customStyle={styles.inputText} />

                <Input
                  placeholder="Enter password"
                  value={values.password}
                  inputContainerStyle={styles.inputStyle}
                  onChangeText={handleChange("password")}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <CustomText
                    customStyle={styles.errorText}
                    label={errors.password}
                  />
                )}
              </View>
              <View style={{ width: "100%" }}>
                <CustomText
                  label="Confirm Password"
                  customStyle={styles.inputText}
                />

                <Input
                  placeholder="Enter confirm password"
                  value={values.confirmPassword}
                  inputContainerStyle={styles.inputStyle}
                  onChangeText={handleChange("confirmPassword")}
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <CustomText
                    customStyle={styles.errorText}
                    label={errors.confirmPassword}
                  />
                )}
              </View>

              <CustomButton
                label="Sign Up"
                customTextStyle={{
                  fontFamily: "DMSansSemiBold",
                  color: "#fff",
                }}
                onPress={() => handleSubmit()}
              />
              <CustomButton
                label="Log in with Google"
                // onPress={() =>
                //   onGoogleButtonPress().then(() =>
                //     console.log("Signed in with Google!")
                //   )
                // }
                customStyle={[
                  {
                    borderWidth: 1,
                    borderColor: "#2EB5FA",
                    backgroundColor: COLORS.light,
                  },
                ]}
                customTextStyle={{
                  color: COLORS.primary,
                  fontFamily: "DMSansSemiBold",
                }}
                icon={
                  <Icon
                    style={{ fontSize: 20, color: COLORS.primary }}
                    // onPress={onGoogleButtonPress}
                    name="logo-google"
                    size={40}
                  />
                }
              />
              <View style={styles.signupFooter}>
                <CustomText
                  label="Already have an account?"
                  customStyle={{ color: COLORS.text }}
                />
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <CustomText
                    label="Sign In"
                    customStyle={{
                      color: COLORS.primary,
                      textDecorationLine: "underline",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    padding: 5,
    height: 50,
    fontSize: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#cdcccc",
    marginHorizontal: "2%",
    backgroundColor: COLORS.white,
  },
  inputText: {
    color: COLORS.text,
    paddingLeft: "4.8%",
    paddingBottom: 5,
  },
  signupFooter: {
    gap: 5,
    paddingVertical: 8,
    marginBottom: 20,
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    paddingVertical: 40,
    color: COLORS.title,
    fontFamily: "DMSansBlack",
  },
  errorText: {
    fontSize: 13,
    marginTop: -25,
    marginLeft: "4.9%",
    marginBottom: 20,
    color: COLORS.error,
  },
});

export default SignUp;
