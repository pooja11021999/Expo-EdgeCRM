/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const navyBlue = "#00467f";

export const Colors = {
  light: {
    text: "#11181C",
    drawerText: "#fff",
    drawerBackground: "#FFF",
    background: "#FFF",
    tint: tintColorLight,
    tintText: "#FFF",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primaryColor: navyBlue,
    primary: "rgb(0,70, 127)", // Primary color for light theme
    primaryDark: "#003866", // Dark variant for light theme
    primaryLight: "#003f72", // Light variant for light theme
    secondary: "#002a4c",
  },
  dark: {
    text: "#ECEDEE",
    drawerText: "##ECEDEE",
    drawerBackground: "#1f2021",
    background: "#151718",
    tint: tintColorDark,
    tintText: "#000",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primaryColor: navyBlue,
    primary: "rgb(0,70, 127)", // Primary color for dark theme
    primaryDark: "#003866", // Dark variant for dark theme
    primaryLight: "#003f72", // Light variant for dark theme
    secondary: "#002a4c",
  },
};

export const ColorPalette = {
  orange: "#fd9644",
  darkOrange: "#ed7d31",
  white: "#ffffff",
  black: "#000000",
  red: "#e53631",
  lightRed: "#FF4646",
  lightRedOverlay: "#FF464688",

  green: "#4fad4a",
  gray: "rgb(125, 125, 125)",
  lightGray: "rgb(200, 200, 200)",
  lighterGray: "rgb(220, 220, 220)",
  darkGray: "#555555",
  //   cyan: '#54c4d4',
  cyan: "#17a2b8",
  darkCyan: "#0f95ab",
  pink: "#e83e8c",
  brownishPink: "#7F0046",
  navyBlue: "rgb(0,70, 127)",
  navyBlueDark: "#003866",
  navyBlueLight: "#003f72",
  navyBlueFullDark: "#002a4c",
  darkNavyBlue: "#02286C",
  offlineColor: "#636e72",
  yellow: "#faff1d",
  lightBlue: "#ecf4f5",
  lightWhite: "#f9f9f9",
  mediumBlue: "#A9C8FF",
  whatsAppColor: "#2ed47a",
  callColor: "#109cf1",
  mailColor: "#72859d",
  blue: "#005ECC",
  gold: "#FFC107",
  darkYellow: "#D1B417",
  mediumYellow: "#D3B513",
  lightYellow: "#FFD90F",
  fullDarkYellow: "#C6AA15",
  blackYellow: "#9A8307",
  goldenDark: "#796705",
  navyBlueGradient: ["rgb(0,70, 127)", "#003f72"],
  goldenGradient: ["#FFDD26", "#736102"],
  yellowGradient: ["#FFD233", "#8C700F"],
  yellowMediumGradient: ["#C6AA15", "#5F5006"],
  blueGradient: ["#98E9E4", "#3B79B1"],
  cyanGradient: ["#33E7FF", "#0F6E8C"],
  purpleGradient: ["#B798E9", "#3B47B1"],
  yellowGreenGradient: ["#DEE200", "#74850B"],
  pinkGradient: ["#E998E3", "#B13B66"],
  redGradient: ["#E28800", "#85210B"],
  greenGradient: ["#98E9CC", "#5AB13B"],
  opacityBlack: "#00000055",
  lightBlack: "rgba(73, 73, 73, 1)",
};
