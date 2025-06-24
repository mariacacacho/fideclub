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
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProfileCompletionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileCompletion'
>;

type ProfileCompletionScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'ProfileCompletion'
>['route'];

const ProfileCompletionScreen = () => {
  const navigation = useNavigation<ProfileCompletionScreenNavigationProp>();
  const route = useRoute<ProfileCompletionScreenRouteProp>();
  const { email } = route.params || { email: '' };
  
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [companyName, setCompanyName] = useState('');

  const handleContinue = () => {
    if (isCompany) {
      // If registering as a company, navigate to company details screen
      navigation.navigate('CompanyDetails', {
        email,
        fullName,
        password,
        companyName
      });
    } else {
      // Otherwise, navigate directly to the sign up screen
      navigation.navigate('SignUp', {
        email,
        fullName,
        password,
        isCompany,
        companyName
      });
    }
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
              <Text style={styles.title}>Completemos tu perfil</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Full Name */}
              <Text style={styles.label}>Nombre completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#CCCCCC"
              />

              {/* Password */}
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#CCCCCC"
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image 
                    source={require('../../assets/images/eye-icon.png')} 
                    style={styles.eyeIconImage} 
                  />
                </TouchableOpacity>
              </View>

              {/* Company Registration Toggle */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>¿Quieres registrarte como empresa?</Text>
                <Switch
                  trackColor={{ false: '#EEEEEE', true: '#7CB9E8' }}
                  thumbColor={isCompany ? '#FFFFFF' : '#FFFFFF'}
                  ios_backgroundColor="#EEEEEE"
                  onValueChange={setIsCompany}
                  value={isCompany}
                />
              </View>

              {/* Company Name (only visible if isCompany is true) */}
              {isCompany && (
                <>
                  <Text style={styles.label}>Nombre de tu empresa</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre de tu empresa"
                    value={companyName}
                    onChangeText={setCompanyName}
                    placeholderTextColor="#CCCCCC"
                  />
                </>
              )}
              
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
    width: '40%', // Increased from 20% to 40% to show progress
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
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  eyeIconImage: {
    width: 24,
    height: 24,
    tintColor: '#999999',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  toggleLabel: {
    fontSize: 16,
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

export default ProfileCompletionScreen;
