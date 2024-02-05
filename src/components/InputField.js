// src/components/InputField.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ThemeManager } from 'Theme';

const InputField = ({
    iconComponent, 
    placeholder, 
    secureTextEntry, 
    onChangeText, 
    value, 
    hasError // Propiedad para manejar errores
}) => {
    const theme = ThemeManager.getTheme();

    // Estilo condicional para el contenedor
    const containerStyle = hasError ? styles.containerError : styles.inputContainer;

    return (
        <View style={[containerStyle, { borderColor: hasError ? 'red' : theme.colors.primary }]}>
            {iconComponent}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    input: {
        flex: 1,
        height: 60,
        borderRadius: 5,
        paddingLeft: 20,
    },
    containerError: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderWidth: 2, // Aumentar el ancho del borde para mayor visibilidad
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        borderColor: 'red', // Color rojo más intenso
        shadowColor: 'red', // Sombra roja
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4, // Para Android
    },
});

export default InputField;
