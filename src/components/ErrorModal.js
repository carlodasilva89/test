// ErrorModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeManager } from 'Theme'; // Importa el ThemeManager
import { MaterialIcons } from 'constants/Icons';

const theme = ThemeManager.getTheme(); // Obtén el tema actual

export function ErrorModal ({ visible, message, errors, onClose }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalBackdrop, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]} />
                <View style={[styles.modalView, { backgroundColor: theme.colors.background }]}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={30} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.modalText, { color: theme.colors.text }]}>{message}</Text>
                    {errors && (
                        <View style={styles.errorList}>
                            {Object.keys(errors).map((key, index) => (
                                <Text key={index} style={styles.errorItem}>
                                    {errors[key].map((errorMessage, subIndex) => (
                                        <Text key={subIndex}>• {errorMessage}{'\n'}</Text>
                                    ))}
                                </Text>
                            ))}
                        </View>
                    )}
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme.colors.primary, borderRadius: 5 }]} onPress={onClose}>
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    modalView: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    closeButton: {
        padding: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    errorList: {
        marginTop: 10,
    },
    errorItem: {
        color: 'red',
        marginBottom: 5,
    },
    modalButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
