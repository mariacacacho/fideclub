import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CompanyDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CompanyDetails'
>;

type CompanyDetailsScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'CompanyDetails'
>['route'];

const CompanyDetailsScreen = () => {
  const navigation = useNavigation<CompanyDetailsScreenNavigationProp>();
  const route = useRoute<CompanyDetailsScreenRouteProp>();
  
  // Get parameters from route
  const { email, fullName, password, companyName } = route.params;
  
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [branchName, setBranchName] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const handleContinue = () => {
    // Navigate to the fidelity card screen with all collected information
    navigation.navigate('FidelityCard', {
      email,
      fullName,
      password,
      companyName,
      companyDetails: {
        address,
        phoneNumber,
        branchName,
        socialMedia
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Back button and progress indicator */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../../assets/images/arrow.png')} style={styles.backButtonText} />
              </TouchableOpacity>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progressIndicator} />
                </View>
              </View>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Completemos tu empresa</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Address */}
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={styles.input}
                placeholder="Guatemala, Guatemala"
                value={address}
                onChangeText={setAddress}
                placeholderTextColor="#CCCCCC"
              />

              {/* Phone Number */}
              <Text style={styles.label}>Número de teléfono</Text>
              <TextInput
                style={styles.input}
                placeholder="+502 2222 - 2222"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#CCCCCC"
              />

              {/* Branch Name */}
              <Text style={styles.label}>Nombre de primera sucursal</Text>
              <TextInput
                style={styles.input}
                placeholder="Mixco"
                value={branchName}
                onChangeText={setBranchName}
                placeholderTextColor="#CCCCCC"
              />

              {/* Social Media */}
              <Text style={styles.label}>Redes sociales o página web</Text>
              <TextInput
                style={styles.input}
                placeholder="@tunegociogt"
                value={socialMedia}
                onChangeText={setSocialMedia}
                placeholderTextColor="#CCCCCC"
              />
              
              {/* Continue Button */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleContinue}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>

            {/* Terms and conditions */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                Al registrarte estás aceptando los Términos y Condiciones y las Políticas de privacidad
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 50,
  },
  backButtonText: {
    width: 18,
    height: 18,
  },
  progressContainer: {
    flex: 1,
    marginLeft: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
  },
  progressIndicator: {
    width: '50%', // 50% progress (between ProfileCompletion at 40% and SignUp at 60%)
    height: '100%',
    backgroundColor: '#7CB9E8',
    borderRadius: 3,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    fontSize: 16,
    marginBottom: 30,
    paddingBottom: 10,
    color: '#333333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7CB9E8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  termsContainer: {
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
});

export default CompanyDetailsScreen;
