import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import { Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

interface SearchBarProps {
  placeholder: string;
  handleSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, handleSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearchTextChange = (text: string) => {
    setQuery(text);
    handleSearch(text);
  };

  return (
    <View style={styles.main}>
      <Octicons
        name="search"
        color={ColorPalette.black}
        size={scale(18)}
        style={styles.searchBtnStyle}
      />
      <View style={styles.textInputStyle}>
        <TextInput
          placeholder={placeholder}
          style={textStyle()}
          value={query}
          onChangeText={handleSearchTextChange}
        />
      </View>
    </View>
  );
};

export default SearchBar;

export const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    alignItems: "center",
    backgroundColor: ColorPalette.white,
  },
  searchBtnStyle: {
    marginRight: scale(8),
  },
  textInputStyle: {
    flex: 1,
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(5),
    fontFamily: "Roboto_400Regular",
  },
});
