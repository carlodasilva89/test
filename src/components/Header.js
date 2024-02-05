// /src/components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ThemeManager } from 'Theme'; // Importa el ThemeManager
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux'
import {AntDesign, Ionicons } from 'constants/Icons';

export function Header (props) {
    const theme = ThemeManager.getTheme(); // Obtén el tema actual
    const { isAuth } = useSelector((state) => state.user)
    const handleToggleMenu = () => {
        props.toggleMenu();
    };

    return (
        <View style={[tw`flex-row justify-between items-center px-4 py-1 shadow-md`, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <TouchableOpacity style={tw`p-2`} onPress={handleToggleMenu}>
                <Ionicons name="menu" size={30} color={theme.colors.gray} />
            </TouchableOpacity>
            <View style={tw`flex-row items-center`}>
                <Image
                    style={tw`h-10 w-40`}
                    source={require('../assets/images/icons/logo_app3.png')}
                />
            </View>
            {!isAuth &&
                <TouchableOpacity style={tw`p-2`} onPress={() => props.navigation.navigate('Login')}>
                    <AntDesign name="login" size={30} color={theme.colors.gray} />
                </TouchableOpacity>
            }
            {isAuth &&
                <View style={tw`p-2`}>

                </View>
            }
        </View>
    );
};