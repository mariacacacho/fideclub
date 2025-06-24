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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type EmailSignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EmailSignUp'
>;

const EmailSignUpScreen = () => {
  const navigation = useNavigation<EmailSignUpScreenNavigationProp>();
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    // Navigate to the profile completion screen with the email
    navigation.navigate('ProfileCompletion', { email });
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
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

            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logofideclub-color.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Email input section */}
            <View style={styles.formContainer}>
              <Text style={styles.question}>¿Cuál es tu correo electrónico?</Text>
              <TextInput
                style={styles.input}
                placeholder="nombre@ejemplo.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#CCCCCC"
              />
              
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleContinue}
              >
                <Text style={styles.buttonText}>Registrarme</Text>
              </TouchableOpacity>
            </View>

            {/* Sign in link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>
                ¿Ya eres usuario de FideClub?{' '}
                <Text style={styles.signInLink} onPress={handleSignIn}>
                  Inicia sesión
                </Text>
              </Text>
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
    marginBottom: 0,
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
    width: '20%',
    height: '100%',
    backgroundColor: '#7CB9E8',
    borderRadius: 3,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  question: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000000',
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signInContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#666666',
  },
  signInLink: {
    color: '#7CB9E8',
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

export default EmailSignUpScreen;
