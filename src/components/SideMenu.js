import React, { useEffect, useMemo } from 'react';
import {Text,TouchableOpacity,StyleSheet,TouchableWithoutFeedback,View} from 'react-native';
import { ThemeManager } from 'Theme';
import Animated, {useSharedValue,withTiming,useAnimatedStyle,Easing} from 'react-native-reanimated';
import tw from 'twrnc';
import { logoutUser } from 'store/slices/user';
import { useDispatch } from 'react-redux';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from 'constants/Icons';

const theme = ThemeManager.getTheme();

export function SideMenu ({ isMenuOpen, onClose, user_name, children, onLinkPress, links, navigation }) {
    const menuPosition = useSharedValue(-300);
    const overlayOpacity = useSharedValue(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const duration = 150; // Ajusta la duración según tus preferencias

        menuPosition.value = withTiming(isMenuOpen ? 0 : -300, {
            duration,
            easing: Easing.inOut(Easing.ease),
        });
        overlayOpacity.value = withTiming(isMenuOpen ? 0.8 : 0, {
            duration,
            easing: Easing.inOut(Easing.ease),
        });
    }, [isMenuOpen]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: menuPosition.value }],
        };
    });

    const overlayStyle = useAnimatedStyle(() => {
        return {
            opacity: overlayOpacity.value,
        };
    });

    const pressClick = (screen, actionType) => {
        onClose(); // Cierra el menú después de hacer clic en un enlace
        if (actionType === 'redirect') {
            navigation.navigate(screen);
        } else if (actionType === 'logout') {
            console.log(actionType)
            dispatch(logoutUser())
        }
    };

    const handleLinkClick = (action, actionType) => {
        if (actionType === 'redirect') {
            onLinkPress(action);
        } else if (actionType === 'logout') {
            dispatch(logoutUser())
            // Realiza la acción de logout aquí, por ejemplo, llamando a una función de logout
            // Puedes utilizar la función `onLogout` para esto si la tienes
            /*
            if (typeof onLogout === 'function') {
                onLogout();
            }
            */
        }
        onClose(); // Cierra el menú después de hacer clic en un enlace
    };

    const linkItems = useMemo(() => links.map((link, index) => (
        <TouchableOpacity key={index} onPress={() => pressClick(link.screen.name, link.actionType)} style={[styles.linkItemContainer, tw`border-b-[1px] border-b-gray-200`]}>
            <View style={styles.linkItemContent}>
                {React.cloneElement(link.customIcon, { color: theme.colors.primary })}
                <Text style={{ color: theme.colors.text, marginLeft: 8 }}>{link.name}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
    )), [links, theme.colors, pressClick]);

    return (
        <>
            {isMenuOpen && (
                <TouchableWithoutFeedback onPress={() => handleLinkClick('', '')}>
                    <Animated.View style={[styles.overlay, overlayStyle]} />
                </TouchableWithoutFeedback>
            )}
            <Animated.View style={[styles.sideMenu, animatedStyle, { backgroundColor: theme.colors.background }]}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}><MaterialCommunityIcons name="close-circle" size={50} color={theme.colors.primary} /></Text>
                </TouchableOpacity>
                {user_name && (
                    <View style={tw`flex flex-row`}>
                        <FontAwesome style={tw`mt-3 ml-3`} name="user-circle-o" size={57} color={theme.colors.gray} />
                        <View style={tw`mt-7 ml-2`}>
                            <Text style={[tw`text-lg font-mono antialiased`, { color: theme.colors.text }]}>{user_name}</Text>
                        </View>
                    </View>
                )}
                <View style={[tw`p-2`, { backgroundColor: theme.colors.background }]}>
                    {linkItems}
                </View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Ajusta la transparencia aquí
        zIndex: 1,
    },
    sideMenu: {
        width: 300,
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 2,
        borderTopEndRadius: 20,
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
    linkItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        marginLeft: 16,
    },
    linkItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
