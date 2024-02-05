import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeManager } from 'Theme'; // Importa el ThemeManager
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';

export function TabBar ({ tabs, navigation }) {
    const theme = ThemeManager.getTheme(); // Obtén el tema actual
    const route = useRoute();
    const currentScreen = route.name;

    const onPressTab = useCallback((screen) => {
        navigation.navigate(screen);
    }, [navigation]);

    return (
        <View style={[styles.tabBar, { backgroundColor: theme.colors.backgroundSecondary }, tw`border-t-[1px] border-gray-200`]}>
            {tabs.map((tab) => {
                const IconComponent = tab.customIcon; // Accede al componente de icono personalizado
                const isTabActive = currentScreen === tab.screen.name;

                return (
                    <TouchableOpacity
                        key={tab.screen.name}
                        style={styles.tabItem}
                        onPress={() => onPressTab(tab.screen.name)}
                    >
                        {IconComponent && React.cloneElement(IconComponent, {
                            style: {
                                ...IconComponent.props.style,
                                color: isTabActive ? theme.colors.primary : theme.colors.gray
                            }
                        })}
                        <Text style={{ color: isTabActive ? theme.colors.primary : theme.colors.gray, marginTop: 4 }}>
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 60,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
