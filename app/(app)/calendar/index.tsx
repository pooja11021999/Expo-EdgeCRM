import { MenuHeader } from "@/components";
import { Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

interface IndexProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}

export default function Index({ navigation }: IndexProps) {
  return (
    <View style={{ flex: 1 }}>
      <MenuHeader title="Calendar" leftButton="menu" navigation={navigation} />
    </View>
  );
}
