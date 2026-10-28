import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/theme";
import { TaskForm } from "../components/TaskForm";

export default function AddTaskScreen() {
  return (
    <View style={theme.container}>
        <Text style={styles.title}>Agregar nueva tarea</Text>
        <TaskForm/>
    </View>
  )
}

const styles=StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20
    }
})