import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from 'constants/Icons';
import { ThemeManager } from 'Theme';
import tw from 'twrnc';

const theme = ThemeManager.getTheme();

export function CustomModal ({ modalInfo, onClose }) {
  const { type, title, body, visible, errors } = modalInfo;
  const sizeIcon = 25;

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <FontAwesome name="check-circle" size={sizeIcon} color="#28a745" />;
      case 'warning':
        return <MaterialCommunityIcons name="alert-circle" size={sizeIcon} color="#ffc107" />;
      case 'error':
        return <MaterialCommunityIcons name="alert-circle" size={sizeIcon} color="#ffc107" />;
      case 'info':
        return <MaterialCommunityIcons name="information" size={sizeIcon} color="#17a2b8" />;
      default:
        return null;
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>
                <MaterialCommunityIcons name="close-circle" size={50} color={theme.colors.primary} />
              </Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <View style={tw`flex flex-row items-center`}>
                <View style={styles.iconContainer}>{renderIcon()}</View>
                <Text style={styles.modalTitle}>{title}</Text>
              </View>
              <View>
                <Text style={styles.modalBody}>{body}</Text>
                {type === 'error' && (
                  <View>
                    {Object.keys(errors).map((fieldName, index) => (
                      <Text key={index} style={styles.errorText}>
                        {errors[fieldName][0]}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    elevation: 5,
    flexDirection: 'row',
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    shadowColor: '#444',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 100,
    zIndex: 3,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalBody: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'left', // Alineación a la izquierda
    marginLeft: 20, // Margen izquierdo para la alineación
  },
});