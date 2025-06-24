import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

const NavBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let icon;
        if (route.name === 'Main') {
          icon = (
            <View style={styles.centerNavButton}>
              <LinearGradient
                colors={['#4CD4C0', '#4A90E2']}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <Image
                source={require('../../assets/images/qr-icon.png')}
                style={[styles.navIcon, { tintColor: '#FFFFFF' }]}
              />
            </View>
          );
        } else if (route.name === 'Configuration') {
          icon = (
            <Image
              source={require('../../assets/images/settings-menu.png')}
              style={[styles.navIcon, { tintColor: isFocused ? '#24252A' : '#C7C5C5' }]}
            />
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.navItem, route.name === 'Main' && styles.centerNavItem]}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    height: 90,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerNavItem: {
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  centerNavButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  navIcon: {
    width: 20,
    height: 20,
  },
});

export default NavBar;
