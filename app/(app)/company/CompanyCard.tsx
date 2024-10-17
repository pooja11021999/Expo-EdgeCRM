import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import Nomenclature from "@/Nomenclature";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

interface Company {
  companyName?: string;
  city?: string;
  status?: string;
}

interface CompanyCardProps {
  item: any;
  getDetails: (item: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ item, getDetails }) => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={() => getDetails(item)}>
      <View>
        <Text style={styles.cardKeyStyle}>
          {item?.name || `No ${Nomenclature.Account} Name`}
        </Text>
        <Text style={styles.cardValueStyle}>
          {item?.city_name ? item?.city_name : "No City Name"}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusStyle}>{item?.account_status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CompanyCard;

export const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: "row",
    paddingVertical: verticalScale(12),
    justifyContent: "space-between",
    paddingHorizontal: scale(17),
    borderBottomColor: ColorPalette.lightGray,
    borderBottomWidth: scale(1),
  },
  cardKeyStyle: {
    fontWeight: "500",
    ...textStyle(),
  },
  cardValueStyle: textStyle(ColorPalette.darkGray, scale(14)),
  statusStyle: textStyle(ColorPalette.darkGray, scale(14)),
  statusContainer: {
    justifyContent: "center",
  },
});
