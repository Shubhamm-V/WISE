import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileHeader from "@/src/components/layouts/ProfileHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "@/src/components/custom-widgets/Dropdown";
import CustomText from "@/src/components/custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import { object, string, number } from "yup";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import CustomButton from "@/src/components/custom-widgets/CustomButton";
import { languageMap, LANGUAGES, STATES } from "@/src/constants/dropdown";
import { useAuth } from "@/src/context/authContext";
import { db } from "@/firebaseConfig";
import { getDoc, setDoc, doc } from "firebase/firestore";
import Loading from "@/src/components/custom-widgets/Loading";
import { useTranslation } from "react-i18next";

const detailsSchema = object({
  name: string()
    .matches(/\S/, "Name cannot be only spaces")
    .required("Full name is required"),
  age: number()
    .min(12, "You must be at least 18 years old")
    .max(100, "Please enter valid age")
    .typeError("Age must be a number"),
  phone: string().matches(/^[0-9]+$/, "Please enter a valid phone number"),
  city: string().min(2, "Please enter valid city name"),
});

interface PersonalInfo {
  name: string;
  phone: string;
  age: string;
  email: string;
  city: string;
}

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState<string>("Select a State");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("Select a Language");
  const [isEditing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<PersonalInfo>({
    name: "",
    phone: "",
    age: "",
    email: "",
    city: "",
  });
  const { user, setUser } = useAuth();

  const handleSelectLanguage = (item: string, index: number) => {
    setSelectedLanguage(item);
    i18n.changeLanguage(languageMap[item]);
  };

  const handleSelectState = (item: string, index: number) => {
    setSelectedState(item);
  };

  useEffect(() => {
    const getInfo = async () => {
      const docRef = doc(db, "users", user?.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        setInitialValues({
          ...initialValues,
          name: data?.name,
          email: data?.email,
          age: data.age ? data?.age?.toString() : "",
          city: data?.city ? data.city : "",
          phone: data.phone ? data?.phone.toString() : "",
        });
        if (data.state && data.state.length > 0) setSelectedState(data.state);
      }
    };
    setLoading(true);
    getInfo();
    setLoading(false);
  }, [loading]);

  const handleSave = async (values: PersonalInfo) => {
    setLoading(true);
    let state: string = selectedState !== "Select a State" ? selectedState : "";
    const { name, age, phone, city, email } = values;
    await setDoc(doc(db, "users", user.userId), {
      name,
      age,
      phone,
      city,
      state,
      email,
      userId: user.userId,
    });
    setUser({ ...user, name });
    setLoading(false);
    setEditing(false);
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView>
      <ScrollView>
        <ProfileHeader />
        <View>
          <CustomText label="Change Language" customStyle={[styles.title]} />
          <View style={{ paddingHorizontal: "2.5%" }}>
            <Dropdown
              isEditing={true}
              options={LANGUAGES}
              onSelect={handleSelectLanguage}
              placeholder={selectedLanguage}
            />
          </View>
        </View>
        <View>
          <View style={styles.editHeader}>
            <CustomText
              label="Personal Information"
              customStyle={styles.title}
            />
            <TouchableOpacity onPress={() => setEditing((prev) => !prev)}>
              <Icon
                name="create-outline"
                size={28}
                color={COLORS.primary}
                style={{ fontWeight: "bold", paddingRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={detailsSchema}
              onSubmit={(values) => handleSave(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <>
                  <View>
                    <View style={{ width: "100%" }}>
                      <CustomText
                        label="Full Name"
                        customStyle={styles.inputText}
                      />
                      <Input
                        disabled={!isEditing}
                        placeholder="Enter full name"
                        value={values.name}
                        inputContainerStyle={styles.inputStyle}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                      {touched.name && errors.name && (
                        <CustomText
                          customStyle={styles.errorText}
                          label={errors.name}
                        />
                      )}
                    </View>
                    <View style={{ width: "100%" }}>
                      <CustomText label="Age" customStyle={styles.inputText} />
                      <Input
                        placeholder="Enter your age"
                        disabled={!isEditing}
                        value={values.age}
                        keyboardType="numeric"
                        inputContainerStyle={styles.inputStyle}
                        onChangeText={handleChange("age")}
                        onBlur={handleBlur("age")}
                      />
                      {touched.age && errors.age && (
                        <CustomText
                          customStyle={styles.errorText}
                          label={errors.age}
                        />
                      )}
                    </View>

                    <View style={{ width: "100%" }}>
                      <CustomText
                        label="Phone"
                        customStyle={styles.inputText}
                      />
                      <Input
                        placeholder="Enter phone"
                        value={values.phone}
                        disabled={!isEditing}
                        keyboardType="numeric"
                        inputContainerStyle={styles.inputStyle}
                        style={{ borderBottomWidth: 0 }}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                      />
                      {touched.phone && errors.phone && (
                        <CustomText
                          customStyle={styles.errorText}
                          label={errors.phone}
                        />
                      )}
                    </View>
                    <View style={{ width: "100%" }}>
                      <CustomText label="City" customStyle={styles.inputText} />
                      <Input
                        placeholder="Enter city"
                        value={values.city}
                        disabled={!isEditing}
                        inputContainerStyle={styles.inputStyle}
                        onChangeText={handleChange("city")}
                        onBlur={handleBlur("city")}
                      />
                      {touched.city && errors.city && (
                        <CustomText
                          customStyle={styles.errorText}
                          label={errors.city}
                        />
                      )}
                    </View>
                    <View>
                      <CustomText
                        label="State"
                        customStyle={styles.inputText}
                      />
                      <View style={{ paddingHorizontal: "2.5%" }}>
                        <Dropdown
                          options={STATES}
                          isEditing={isEditing}
                          onSelect={handleSelectState}
                          placeholder={selectedState}
                        />
                      </View>
                    </View>
                    <View
                      style={{ paddingVertical: 20, paddingHorizontal: "2.5%" }}
                    >
                      <CustomButton
                        isDisabled={!isEditing}
                        label="Save Information"
                        customStyle={styles.saveButtonStyle}
                        customTextStyle={{
                          color: COLORS.primary,
                          fontFamily: "DMSansSemiBold",
                        }}
                        icon={
                          <Icon
                            style={{
                              fontSize: 23,
                              color: isEditing ? COLORS.primary : "lightgray",
                            }}
                            name="save-outline"
                            size={40}
                          />
                        }
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: "2.5%",
    fontFamily: "DMSansBold",
    paddingVertical: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  editHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputStyle: {
    padding: 5,
    height: 50,
    fontSize: 15,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#cdcccc",
    backgroundColor: COLORS.white,
  },
  inputText: {
    color: COLORS.text,
    paddingLeft: "3.1%",
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
  saveButtonStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.light,
  },
});
