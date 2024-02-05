// /src/components/HomeLayout.js

import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from 'constants/Icons';
import { SideMenu, Header, TabBar } from 'components'
import { ThemeManager } from 'Theme';

const HomeLayout = (props) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = ThemeManager.getTheme(); // Obtén el tema actual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const tabs = [
    {
      name: 'Home',
      customIcon: <FontAwesome style={{ marginTop: 3, marginLeft: 3 }} name="home" size={25} />,
      screen: { name: 'Home' }, // Asegúrate de tener el nombre correcto de la pantalla
      actionType: "redirect",
    },
    {
      name: 'My Account',
      customIcon: <MaterialCommunityIcons style={{ marginTop: 3, marginLeft: 3 }} name="account-circle-outline" size={25} />,
      screen: { name: 'MyAccount' }, // Asegúrate de tener el nombre correcto de la pantalla
      actionType: "redirect",
    },
    {
      name: 'Offers',
      customIcon: <MaterialIcons style={{ marginTop: 3, marginLeft: 3 }} name="local-offer" size={25} />,
      screen: { name: 'Offers' }, // Asegúrate de tener el nombre correcto de la pantalla
      actionType: "redirect",
    },
    {
      name: 'FAQ',
      customIcon: <MaterialIcons style={{ marginTop: 3, marginLeft: 3 }} name="help-outline" size={25} />,
      screen: { name: 'FAQ' }, // Asegúrate de tener el nombre correcto de la pantalla
      actionType: "redirect",
    },
  ];

  const onPressTab = useCallback((tab) => {
    setActiveTab(tab.name);
    props.navigation.navigate(tab.screen.name, tab.screen.params);
  }, [props.navigation]);

  useEffect(() => {
    console.log('Active Tab:', activeTab);
  }, [activeTab]);


  const links = [
    {
      name: 'Home',
      customIcon: <FontAwesome style={{ marginTop: 3, marginLeft: 3 }} name="home" size={30} />,
      screen: { name: 'Home' },
      actionType: 'redirect',
    },
    {
      name: 'My Account',
      customIcon: <MaterialCommunityIcons style={{ marginTop: 3, marginLeft: 3 }} name="account-circle-outline" size={30} />,
      screen: { name: 'MyAccount' },
      actionType: 'redirect',
    },
    {
      name: 'Offers',
      customIcon: <MaterialIcons style={{ marginTop: 3, marginLeft: 3 }} name="local-offer" size={30} />,
      screen: { name: 'Offers' },
      actionType: 'redirect',
    },
    {
      name: 'FAQ',
      customIcon: <MaterialIcons style={{ marginTop: 3, marginLeft: 3 }} name="help-outline" size={30} />,
      screen: { name: 'FAQ' },
      actionType: 'redirect',
    },
    {
      name: "Cerrar sesión",
      action: "logout", // Puedes usar un valor como "logout" para identificar la acción de logout
      actionType: 'logout', // Puedes usar un valor como "logout" para identificar el tipo de acción
      screen: { name: 'Logout' }, 
      customIcon: <MaterialIcons style={{ marginTop: 3, marginLeft: 3 }} name="exit-to-app" size={30} />,
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <Header
        navigation={props.navigation}
        title={"CuponesApp"}
        toggleMenu={toggleMenu}
        theme={theme}
      />
      <View style={styles.container}>
        {/* Tu contenido */}
      </View>
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        {props.children}
      </View>
      <SideMenu
        navigation={props.navigation}
        user_name="User Name"
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLinkPress={(action) => {
          console.log('Link pressed:', action);
          setIsMenuOpen(false);
        }}
        links={links}
      />
      <TabBar
        navigation={props.navigation}
        tabs={tabs}
        activeTab={activeTab}
        onPressTab={(tab) => onPressTab(tab)}
      />
    </SafeAreaView>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});