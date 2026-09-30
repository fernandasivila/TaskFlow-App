import { StyleSheet, View, Text } from 'react-native';

export const Welcome = () => {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>TaskFlow</Text>
        <Text style={styles.subtitle}>Checkpoint 1: Estructura Base</Text>
    </View>
);
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#6e6c6c',
        fontSize: 20,
    },
});