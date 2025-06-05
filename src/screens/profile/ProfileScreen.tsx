import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;


const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Image
            source={require("../../assets/images/arrow.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/image-user-girl.png')}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.profileName}>María Cacacho</Text>
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>Pro</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Image
                source={require('../../assets/images/edit.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Image
              source={require('../../assets/images/arrow-right.png')}
              style={styles.menuArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Image
                source={require('../../assets/images/subscription-icon.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.menuText}>Suscripción</Text>
            <Image
              source={require('../../assets/images/arrow-right.png')}
              style={styles.menuArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Image
                source={require('../../assets/images/card-icon.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.menuText}>Método de pago</Text>
            <Image
              source={require('../../assets/images/arrow-right.png')}
              style={styles.menuArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Image
                source={require('../../assets/images/logout-icon.png')}
                style={styles.menuIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.menuText}>Cerrar sesión</Text>
            <Image
              source={require('../../assets/images/arrow-right.png')}
              style={styles.menuArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Esta aplicación es propiedad de FideClub.
          </Text>
          <Text style={styles.footerText}>
            Derechos Reservados 2025.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
    backIcon: {
    width: 'auto',
    height: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginBottom: 30,
    backgroundColor: '#F4F4F4',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  proBadge: {
    backgroundColor: '#F26E21',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  proBadgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F26E21',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    width: 20,
    height: 20,
    tintColor: '#CCCCCC',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default ProfileScreen;
