import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

import CompanyScreen from "./CompanyScreen";

type CompanyStackParamList = {
  CompanyScreen: undefined;
  CompanyDetailsScreen: undefined;
  CompanyDetailsForm: undefined;
  EditCompanyDetailsForm: undefined;
};

const Stack = createNativeStackNavigator<CompanyStackParamList>();

const CompanyNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="CompanyScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="CompanyScreen"
        component={CompanyScreen}
        options={() => ({
          title: "Company",
          headerStyle: styles.companyListHeader,
          headerTitleStyle: styles.companyListHeaderTitle,
          headerShown: false,
        })}
      />
      {/* 
      <Stack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CompanyDetailsForm"
        component={CompanyDetailsForm}
        options={{
          headerShown: false,
          headerTitleStyle: styles.companyDetailsScreenStyle,
          header: () => (
            <AntDesign name="arrowleft" size={scale(21)} color={ColorPalette.white} />
          ),
          title: "",
          headerRight: () => (
            <TouchableOpacity>
              <Text style={styles.rightHeaderOfForm}>Save</Text>
            </TouchableOpacity>
          ),
          headerStyle: styles.companyDetailsHeaderStyle,
        }}
      />

      <Stack.Screen
        name="EditCompanyDetailsForm"
        component={CompanyDetailsForm}
        options={{
          headerShown: false,
          headerTitleStyle: styles.companyDetailsScreenStyle,
          header: () => (
            <AntDesign
              name="arrowleft"
              size={scale(21)}
              color={ColorPalette.white}
              style={{ alignSelf: "center" }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Text style={styles.rightHeaderOfForm}>Save</Text>
            </TouchableOpacity>
          ),
          title: "",
          headerStyle: styles.companyDetailsHeaderStyle,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default CompanyNavigator;

export const styles = StyleSheet.create({
  filterIcon: {
    marginLeft: scale(20),
  },
  rightHeaderOfCompanyList: {
    flexDirection: "row",
    paddingRight: scale(10),
  },
  leftHeaderOfCompanyList: {
    paddingLeft: scale(10),
  },
  companyListHeader: {
    backgroundColor: ColorPalette.navyBlue,
  },
  companyListHeaderTitle: {
    color: ColorPalette.white,
    fontFamily: "Roboto_400Regular",
    fontSize: scale(17),
  },
  companyDetailsScreenStyle: {
    fontSize: scale(17),
    color: ColorPalette.white,
  },
  companyDetailsHeaderStyle: {
    backgroundColor: ColorPalette.navyBlue,
  },
  rightHeaderOfForm: {
    marginRight: scale(15),
    alignSelf: "center",
    ...textStyle(ColorPalette.white),
  },
});
