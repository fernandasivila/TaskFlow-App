import { useState } from "react"
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import { COLORS } from "../constants/colors"

const categories = ['Trabajo', 'Estudio', 'Personal']
const formInitialState = {
    title: '',
    description: '',
    category: 'Trabajo'
}

const formFocusedInitialState = {
    title: false,
    description: false
}

const errorsInitialState = {
    title: '',
    description: ''
}


export const TaskForm = () => {
    const [formData, setFormData] = useState(formInitialState)
    const [focusedField, setFocusedField] = useState(null)
    const [errors, setErrors] = useState(errorsInitialState)

    const isButtonDisabled = Boolean(errors.title || errors.description) || formData.title.trim().length === 0 ||
                            formData.description.trim().length === 0;

    const handleChange = (name, value) => {
        setFormData(prev =>
            ({
                ...prev,
                [name]: value
            })
        )

        let errorMessage = ''
        const trimmed = value.trim()
        
        if(name == 'title'){
            if(trimmed.length > 0 && trimmed.length <= 5){
                errorMessage = 'El titulo debe tener como minimo 5 caracteres'
            }
        }

        if(name == 'description'){
            if(trimmed.length > 0 && trimmed.length <= 10){
                errorMessage = 'La descripcion debe tener como minimo 10 caracteres'
        }}

        setErrors(prev =>
            ({
                ...prev,
                [name]: errorMessage
            })
        )
    }

    const handleBlur = (field) => {
        setFocusedField(null)
        console.log(formData.title.trim());
        

        if(field == 'title' && formData.title.trim().length == 0){
            setErrors((prev) => ({
                ...prev,
                title: 'El titulo es obligatorio'
            }
            ))
        }

        if(field == 'description' && formData.description.trim().length == 0){
            setErrors(prev => ({
                ...prev,
                description: 'La descripcion es obligatoria'
            }
            ))
        }
    }

    const handleAddTask = () => {

        const isTitleEmpty = formData.title.length == 0
        const isDescriptionEmpty = formData.description.length == 0

        if (isTitleEmpty || isDescriptionEmpty){
            setErrors(prev => ({
                description: isDescriptionEmpty? 'La descripcion es obligatoria' : '',
                title: isTitleEmpty? 'El titulo es obligatorio' : ''
            }))
            return;
        }

        if(errors.title || errors.description){
            return;
        }
        

        const task = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            createdAt: new Date()
        }

        console.log('Task created:', task);
        Alert.alert('Exito', 'Tarea capturada localmente.')

        setFormData(formInitialState)
        setErrors(errorsInitialState)
        setFocusedField(null)        
    }

  return (
    <KeyboardAvoidingView 
        behavior={Platform == 'ios' ? 'padding' : undefined}
        style={styles.container}
        >
        <Text style={styles.label}>Titulo</Text>
        <TextInput
            style={[
                styles.input,
                focusedField == 'title' && styles.focused,
                Boolean(errors.title) && styles.inputError
            ]}
            value={formData.title}
            onChangeText={(value) => handleChange('title', value)}
            onFocus={() => setFocusedField('title')}
            onBlur={() => handleBlur('title')}
            placeholder="Titulo"
            autoCapitalize="sentences"
            keyboardType="default"
            autoCorrect={true}
        />

        {errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

        <Text style={styles.label}>Descripcion</Text>
        <TextInput
            style={[
                styles.input, 
                styles.multiline,
                focusedField == 'description' && styles.focused,
                Boolean(errors.description) && styles.inputError
            ]}
            value={formData.description}
            onChangeText={(value) => handleChange('description',value)}
            onFocus={() => setFocusedField('description')}
            onBlur={() => handleBlur('description')}
            placeholder="Descripcion"
            placeholderTextColor= {COLORS.textLight}
            multiline
            numberOfLines={7}
            autoCapitalize="sentences"
        />

        {errors.description? <Text style={styles.error}>{errors.description}</Text> : null}

        <View style={styles.categories}>
            {
                categories.map((item) => {
                    const isSelected = formData.category == item
                    return (
                    <TouchableOpacity
                        key={item}
                        style={[styles.category,isSelected && styles.selectedCategory]}
                        onPress={() => handleChange('category',item)}
                        >
                        <Text
                            style={[styles.categoryText, isSelected && styles.selectedCategoryText]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )})
            }
        </View>
        
        <TouchableOpacity 
            style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
            onPress={handleAddTask}
            disabled={isButtonDisabled}
            activeOpacity={0.8}
            >
            <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        width: '100%',
        gap: 10
    },
    label:{
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text
    },
    input:{
        backgroundColor: '#ffffff',
        borderColor: COLORS.border,
        borderWidth: 1.5,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        elevation: 8,
        color: COLORS.inputText
    },
    multiline:{
        textAlignVertical: 'top',
        minHeight: 150
    },
    focused:{
        borderColor: COLORS.secondary,
        shadowColor: COLORS.secondary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3
    },
    inputError: {
        borderColor: COLORS.error
    },
    error:{
        color: COLORS.error,
        fontSize: 13,
        marginTop: -4
    },
    categories:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap:8,
        marginTop: 6
    },
    category:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 10,
    },
    selectedCategory:{
        backgroundColor: '#96e8ba',
        borderColor: '#6cb48b'
    },
    categoryText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
    },
    selectedCategoryText: {
        color: "#065f46",
        fontWeight: "700",
    },
    button:{
        backgroundColor: COLORS.secondary,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 14,
        borderRadius: 12
    },
    buttonText:{
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
    buttonDisabled:{
        opacity: 0.5
    }
})