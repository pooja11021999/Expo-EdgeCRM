// import { Drawer } from "expo-router/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function CustomDrawer() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer>
//         <Drawer.Screen
//           name="calendar/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Calendar",
//             title: "Calendar",
//           }}
//         />
//         <Drawer.Screen
//           name="dashboard" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Dashboard",
//             title: "Dashboard",
//           }}
//         />
//         <Drawer.Screen
//           name="company/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Company",
//             title: "Company",
//           }}
//         />
//         <Drawer.Screen
//           name="contact-person/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Contact Person",
//             title: "Contact Person",
//           }}
//         />
//         <Drawer.Screen
//           name="lead/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Lead",
//             title: "Lead",
//           }}
//         />
//         <Drawer.Screen
//           name="opportunity/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Opportunity",
//             title: "Opportunity",
//           }}
//         />
//         <Drawer.Screen
//           name="repository/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Repository",
//             title: "Repository",
//           }}
//         />
//         <Drawer.Screen
//           name="product/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Product",
//             title: "Product",
//           }}
//         />
//         <Drawer.Screen
//           name="case/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Case",
//             title: "Case",
//           }}
//         />
//         <Drawer.Screen
//           name="contract/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Contract",
//             title: "Contract",
//           }}
//         />
//         <Drawer.Screen
//           name="task/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Task",
//             title: "Task",
//           }}
//         />
//         <Drawer.Screen
//           name="expense/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Expense",
//             title: "Expense",
//           }}
//         />
//         <Drawer.Screen
//           name="punch-in-out" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Punch In-Out",
//             title: "Punch In-Out",
//           }}
//         />
//         <Drawer.Screen
//           name="feeds" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Feeds",
//             title: "Feeds",
//           }}
//         />
//         <Drawer.Screen
//           name="card-scan/index" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "edgeCRM Card Scan",
//             title: "edgeCRM Card Scan",
//           }}
//         />
//         <Drawer.Screen
//           name="leader-board" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Leaderboard",
//             title: "Leaderboard",
//           }}
//         />
//         <Drawer.Screen
//           name="leaves" // This is the name of the page and must match the url from root
//           options={{
//             drawerLabel: "Leaves",
//             title: "Leaves",
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }

import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import DrawerWithProfile from "./DrawerWithProfile"; // Import the CustomDrawer component
import CalendarScreen from "@/app/(app)/calendar/index";
import DashboardScreen from "@/app/(app)/dashboard";
import CompanyScreen from "@/app/(app)/company/index";
import ContactPersonScreen from "@/app/(app)/contact-person/index";
import LeadScreen from "@/app/(app)/lead/index";
import OpportunityScreen from "@/app/(app)/opportunity/index";
import RepositoryScreen from "@/app/(app)/repository/index";
import ProductScreen from "@/app/(app)/product/index";
import CaseScreen from "@/app/(app)/case/index";
import ContractScreen from "@/app/(app)/contract/index";
import TaskScreen from "@/app/(app)/task/index";
import ExpenseScreen from "@/app/(app)/expense/index";
import PunchInOutScreen from "@/app/(app)/punch-in-out";
import FeedsScreen from "@/app/(app)/feeds";
import EdgeCRMCardScanScreen from "@/app/(app)/card-scan/index";
import LeaderboardScreen from "@/app/(app)/leader-board";
import LeavesScreen from "@/app/(app)/leaves";
import drawerConfig from "@/config/drawerConfig.json";
import { useTheme } from "@react-navigation/native";

const componentMap = {
  CalendarScreen,
  DashboardScreen,
  CompanyScreen,
  ContactPersonScreen,
  LeadScreen,
  OpportunityScreen,
  RepositoryScreen,
  ProductScreen,
  CaseScreen,
  ContractScreen,
  TaskScreen,
  ExpenseScreen,
  PunchInOutScreen,
  FeedsScreen,
  EdgeCRMCardScanScreen,
  LeaderboardScreen,
  LeavesScreen,
};

const Drawer = createDrawerNavigator();

export default function App() {
  const { colors } = useTheme();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null; // You can add a loader here if needed
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerWithProfile {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.background, // Matching the green background
        },
        drawerLabelStyle: {
          // White text color for drawer items
          fontSize: 16,
          fontFamily: "Poppins_400Regular",
        },
        drawerActiveTintColor: colors.tintText,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.tint, // Highlighted item background
      }}
    >
      {drawerConfig.screens.map((screen, index) => {
        const ScreenComponent = componentMap[screen.componentName];
        return (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={ScreenComponent}
            options={{ drawerLabel: screen.label, title: screen.title }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
