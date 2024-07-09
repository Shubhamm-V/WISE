import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomText from "../custom-widgets/CustomText";
import { COLORS } from "@/src/constants/colors";
import { after } from "node:test";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const data = [
  { label: "Normal", index: "1", icon: "emoticon-neutral" },
  { label: "Happy", index: "2", icon: "emoticon-happy" },
  { label: "Sad", index: "3", icon: "emoticon-sad" },
  { label: "Angry", index: "4", icon: "emoticon-angry" },
  { label: "Mood Swing", index: "5", icon: "emoticon-confused" },
];

const FeelingData = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const handleSelected = (value: string) => {
    if (!selected.includes(value)) setSelected((prev) => [...prev, value]);
    else {
      const afterRemove = selected.filter((label) => label !== value);
      setSelected(afterRemove);
    }
  };

  return (
    <View style={{ padding: "2%" }}>
      <CustomText
        label="Feelings"
        customStyle={{ fontSize: 19, fontFamily: "DMSansBold" }}
      />
      <View style={styles.feelingContainer}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((value, ind) => {
            return (
              <TouchableOpacity
                onPress={() => handleSelected(value.label)}
                key={ind}
              >
                <View
                  style={[
                    styles.feelings,
                    {
                      backgroundColor: selected.includes(value.label)
                        ? "#CDEEF6"
                        : "transparent",
                      marginLeft: ind === 0 ? -11 : 10,
                      marginRight: ind == 4 ? 0 : 10,
                    },
                  ]}
                >
                  <Icon name={value.icon} size={28} color={COLORS.primary} />
                </View>
                <CustomText
                  label={value.label}
                  customStyle={{
                    fontSize: 10,
                    textAlign: "center",
                    lineHeight: 19,
                    marginLeft: ind === 0 ? -10 : 10,
                    marginRight: ind == 4 ? 0 : 10,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FeelingData;

const styles = StyleSheet.create({
  feelingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  feelings: {
    borderRadius: 150,
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: "#CDEEF6",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
