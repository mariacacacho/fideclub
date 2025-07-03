import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ConfigurationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList
>;

const ConfigurationScreen = () => {
  const navigation = useNavigation<ConfigurationScreenNavigationProp>();
  const [showProCard, setShowProCard] = useState(true);

  const handleLogout = () => {
    navigation.navigate("SignIn");
  }

  const handleHideProCard = () => {
    setShowProCard(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Configuración</Text>
        
        {showProCard && (
          <View style={styles.proCard}>
            <Image source={require('../../assets/images/crown-subs.png')} style={styles.crownIcon} />
            <Text style={styles.proTitle}>Puedes hacer mucho más con Pro</Text>
            <Text style={styles.proSubtitle}>Prueba Pro por 7 días gratis ahora mismo</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonOutline} onPress={handleHideProCard}>
                <Text style={styles.buttonOutlineText}>Ocultar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFilled}>
                <Text style={styles.buttonFilledText}>Probar Pro</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[styles.section, !showProCard && styles.sectionWithMargin]}>
          <Text style={styles.sectionTitle}>Personal</Text>
          <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Image source={require('../../assets/images/user-config.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Editar Perfil</Text>
            <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Image source={require('../../assets/images/bussiness-config.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Editar negocio</Text>
            <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suscripción</Text>
          <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Image source={require('../../assets/images/subscription-config.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Suscripción</Text>
                        <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>Free</Text>
            </View>
            <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Image source={require('../../assets/images/card-config.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Métodos de pago</Text>
            <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Otras acciones</Text>
          <TouchableOpacity style={styles.logoutOption} onPress={handleLogout}>
            <Image source={require('../../assets/images/logout-config.png')} style={styles.optionIcon} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Esta aplicación es propiedad de FideClub.</Text>
        <Text style={styles.footerVersion}>Versión 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionWithMargin: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 20,
  },
  proCard: {
    backgroundColor: '#3BCCCE',
    borderRadius: 10,
    paddingBottom: 20,
    margin: 20,
    alignItems: 'center',
  },
  crownIcon: {
    width: 120,
    height: 120,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  proSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonFilled: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonFilledText: {
    color: '#24252A',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#919191',
    marginLeft: 20,
    marginBottom: 10,
  },
  optionsContainer: {
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#E0E0E0',

  },
  optionIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  arrowIcon: {
    width: 14,
    height: 14,
  },
  proBadge: {
    backgroundColor: '#80C7A5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  proBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  logoutText: {
    color: '#993333',
    fontSize: 16,

  },
  footer: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,

  },
  footerVersion: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ConfigurationScreen;
