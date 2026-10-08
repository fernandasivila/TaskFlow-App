import { View } from "react-native";
import { theme } from "../theme/theme";

export default function HomeScreen() {
  return (
    <View style={theme.container}>
      <Welcome />
    </View>
  );
}
