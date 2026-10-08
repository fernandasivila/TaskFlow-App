import { StyleSheet, Text, View } from "react-native";
import { ProfileCard } from "../components/ProfileCard";
import { COLORS } from "../constants/colors";
import { theme } from "../theme/theme";

export default function ProfileScreen() {
  return (
    <View style={theme.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <ProfileCard
        name={"Fernanda Sivila"}
        role={"Programadora"}
        image={"https://i.pravatar.cc/300?img=32"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
});
