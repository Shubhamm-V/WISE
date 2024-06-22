import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { Platform } from "react-native";

export const signInWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId:
      "999945649944-8he22f9ddebl6n1qbet3uc8lr5hgatdu.apps.googleusercontent.com",
  });
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    console.log("ID Token : ", idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = auth().signInWithCredential(googleCredential);
    console.log("RESS : ", res);
  } catch (error: any) {
    console.log("Error : ", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

// Somewhere in your code
export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log("INFFOOO", userInfo);
  } catch (error) {
    // if (isErrorWithCode(error)) {
    //   switch (error.code) {
    //     case statusCodes.SIGN_IN_CANCELLED:
    //       // user cancelled the login flow
    //       break;
    //     case statusCodes.IN_PROGRESS:
    //       // operation (eg. sign in) already in progress
    //       break;
    //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //       // play services not available or outdated
    //       break;
    //     default:
    //     // some other error happened
    //   }
    // } else {
    //   // an error that's not related to google sign in occurred
    // }
  }
};
