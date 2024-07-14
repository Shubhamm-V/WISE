import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "@/src/constants/colors";

interface DropdownProps {
  options: string[];
  onSelect: (item: string, index: number) => void;
  placeholder: string;
  isEditing?: boolean;
  height?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder,
  isEditing,
  height,
}) => {
  const setItem = (item: string, index: number) => {
    onSelect(item, index);
  };

  return (
    <SelectDropdown
      data={options}
      disabled={!isEditing}
      onSelect={(selectedItem, index) => {
        setItem(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View
            style={[
              styles.dropdownButtonStyle,
              { height: height ? height : 50 },
            ]}
          >
            <Text
              style={[
                styles.dropdownButtonTxtStyle,
                { color: !isEditing ? "lightgray" : COLORS.dark },
              ]}
            >
              {(selectedItem && selectedItem) || placeholder || "Select"}
            </Text>
            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={[
                styles.dropdownButtonArrowStyle,
                { color: !isEditing ? "lightgray" : COLORS.dark },
              ]}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.dark,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: COLORS.light,
    marginTop: -25,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.dark,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
