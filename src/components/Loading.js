// Loading.js
import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Animated } from 'react-native';
import { ThemeManager } from 'Theme';
import { AntDesign } from 'constants/Icons';

const theme = ThemeManager.getTheme();

export function Loading ({ visible }) {
    const [rotation] = useState(new Animated.Value(0));

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );

        rotateAnimation.start();

        return () => rotateAnimation.stop();
    }, [rotation]);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <AntDesign name="loading1" size={50} color={theme.colors.primary} />
                    </Animated.View>
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
    modalView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


