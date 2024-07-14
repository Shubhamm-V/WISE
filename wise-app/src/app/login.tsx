import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";
import { Input } from "@rneui/themed";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { COLORS } from "@/src/constants/colors";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import { db } from "@/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
//context API

import { object, string } from "yup";

// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { useAuth } from "../context/authContext";
import { isLoading } from "expo-font";
import Loading from "../components/custom-widgets/Loading";

let loginSchema = object({
  email: string()
    .email("Please enter valid email address")
    .required("Please enter email address"),
  password: string()
    .min(8, "Password length must be minimum 8 ")
    .max(16, "Password length must be less than 16")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .required("Password is required"),
});

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const [initializing, setInitializing] = useState(true);
  const { setUser, setIsAuthenticated, user, setIsGoogleLogin } = useAuth();
  const [language, setLanguage] = useState("English");
  const [choosedLanguage, setchoosedLanguage] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  GoogleSignin.configure({
    webClientId:
      "999945649944-8he22f9ddebl6n1qbet3uc8lr5hgatdu.apps.googleusercontent.com",
  });

  const updateUserData = async (userId: any) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, name: data?.name, userId: data?.userId });
    }
  };

  function onAuthStateChanged(user: any) {
    if (user) {
      const { uid } = user;
      updateUserData(uid);
      setIsGoogleLogin(true);
      setIsAuthenticated(true);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  ``;
  if (initializing) return null;

  const setUserData = async (name: string, email: string, uid: string) => {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      userId: uid,
    });
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

  const handleLoginSubmit = async (values: User) => {
    setLoading(true);
    const { email, password } = values;
    const response: any = await login(email, password);
    setLoading(false);
    if (!response.success) {
      let { msg } = response;
      console.log(response.message);
      if (msg && !msg.includes("(auth/invalid-credential)"))
        Alert.alert("Invalid email or passwords");
    }
  };

  if (!choosedLanguage) {
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          width: "100%",
          height: "100%",
        }}
        contentContainerStyle={styles.container}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            handleLoginSubmit(values);
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
                <CustomText label="Welcome Back" customStyle={styles.header} />
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
                <CustomButton
                  label="Login"
                  customStyle={styles.buttonStyle}
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
                    styles.buttonStyle,
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
                      name="logo-google"
                      size={40}
                    />
                  }
                />
                <View style={styles.loginFooter}>
                  <CustomText
                    label="You don't have account yet?"
                    customStyle={{ color: COLORS.text }}
                  />
                  <TouchableOpacity onPress={() => router.push("/signup")}>
                    <CustomText
                      label="Sign Up"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
  buttonStyle: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  inputText: {
    color: COLORS.text,
    paddingLeft: "5.5%",
  },
  loginFooter: {
    gap: 5,
    paddingVertical: 8,
    flexDirection: "row",
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    paddingVertical: 40,
    color: COLORS.title,
    fontFamily: "DMSansSemiBold",
  },
  errorText: {
    fontSize: 13,
    marginTop: -25,
    marginLeft: "4.9%",
    marginBottom: 20,
    color: COLORS.error,
  },
});

export default Login;
