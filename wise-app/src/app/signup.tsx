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
import auth from "@react-native-firebase/auth";
import { db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Loading from "../components/custom-widgets/Loading";

let signupSchema = object({
  name: string()
    .matches(/\S/, "Name cannot be only spaces")
    .required("Full name is required"),
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
  const [initializing, setInitializing] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { signup, setUser, setIsAuthenticated, user, setIsGoogleLogin } =
    useAuth();

  GoogleSignin.configure({
    webClientId:
      "999945649944-8he22f9ddebl6n1qbet3uc8lr5hgatdu.apps.googleusercontent.com",
  });

  function onAuthStateChanged(user: any) {
    if (user) {
      const { displayName: name, email, uid } = user;
      setUser({ ...user, name, email, uid });
      setIsGoogleLogin(true);
      setIsAuthenticated(true);
    }
    if (initializing) setInitializing(false);
  }

  const setUserData = async (name: string, email: string, uid: string) => {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      userId: uid,
    });
  };

  const updateUserData = async (userId: any) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, name: data?.name, userId: data?.userId });
    }
  };
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((response: any) => {
        const { displayName: name, email, uid } = response.user;
        if (response?.additionalUserInfo?.isNewUser === true) {
          setUserData(name, email, uid);
          setUser({ ...user, name, userId: uid });
        } else {
          updateUserData(uid);
        }
        setIsAuthenticated(true);
        setIsGoogleLogin(true);
      })
      .catch((error) => console.log("ERRRORRR :: ", error));
  }

  const handleSignupSubmit = async (values: User) => {
    setLoading(true);
    const { email, password, name } = values;
    let response: any = await signup(email, password, name);
    setLoading(false);
    console.log("Got Signup  Result ", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  if (loading) return <Loading />;

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
                onPress={onGoogleButtonPress}
                customStyle={[
                  {
                    borderWidth: 1,
                    borderColor: COLORS.primary,
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
