import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    navigation.reset({
      index: 0,
      routes: [{ 
        name: 'MainTabs',
        params: { screen: 'Main' }
      }],
    });
  };

  const handleRegister = () => {
    navigation.navigate('EmailSignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Curved Background Design */}
      <View style={styles.curvedContainer}>
        <Image
          source={require('../../assets/images/login-image.png')}
          style={styles.loginImage}
          resizeMode="contain"
        />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logofideclub-color.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo Electrónico</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="tucorreo@correo.com"
            placeholderTextColor="#C7C7CD"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.textInput, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#C7C7CD"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={require('../../assets/images/eye-icon.png')}
                style={styles.eyeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient
            colors={['#7DD3C0', '#5BA7F7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿Todavía no tienes cuenta en FideClub? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions */}
        <Text style={styles.termsText}>
        Versión 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  curvedContainer: {
    position: 'relative',
    height: height * 0.4,
    overflow: 'hidden',
  },
  loginImage: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    width: width,
    height: height * 0.3,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -80,
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 60,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 0,
  },
  textInput: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    fontSize: 16,
    color: '#333333',
    paddingVertical: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 15,
    padding: 5,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#C7C7CD',
  },
  continueButton: {
    marginTop: 10,
    marginBottom: 30,
  },
  continueButtonGradient: {
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  registerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  registerLink: {
    fontSize: 14,
    color: '#5BA7F7',
  },
  termsText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
