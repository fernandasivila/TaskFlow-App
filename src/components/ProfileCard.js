import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

export function ProfileCard({ name, role, image }) {
    return (
        <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
        </View>
        </View>
    );
    }

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
    },
    info: {
        flex: 1,
        marginLeft: 16,
    },
    image: {
        height: 64,
        width: 64,
        borderRadius: 32,
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: COLORS.text,
    },
    role: {
        color: COLORS.textLight,
    },
});
