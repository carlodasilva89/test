// /src/components/LoginLayout.js

import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ThemeManager } from 'Theme'; // Importa el ThemeManager
import SideMenu from 'components/SideMenu';
import tw from 'twrnc';
import { SideMenu } from 'components'
import { Ionicons } from 'constants/Icons';

const LoginLayout = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = ThemeManager.getTheme(); // Obtén el tema actual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <SafeAreaView>
        <View style={[tw`flex-1 h-full`, { backgroundColor: theme.colors.background }]}>
          <View style={tw`absolute top-0`}>
            <Ionicons
              onPress={() => props.navigation.goBack()}
              style={tw`mt-4`}
              name="arrow-back-circle-outline"
              size={50}
              color={theme.colors.text}
            />
          </View>
          <View style={[tw`flex-row justify-between items-center p-10`, { backgroundColor: theme.colors.primary }]}>
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          </View>
          <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: theme.colors.text }]}>
            {props.children}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginLayout;