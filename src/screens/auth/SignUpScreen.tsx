import React, { useState } from "react";
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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type SignUpScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  "SignUp"
>['route'];

// Extended type for route params to include optional stampImage
type SignUpParams = {
  email: string;
  fullName: string;
  password: string;
  isCompany: boolean;
  companyName: string;
  companyDetails?: {
    address: string;
    phoneNumber: string;
    branchName: string;
    socialMedia: string;
  };
  stampImage?: string;
};

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const route = useRoute<SignUpScreenRouteProp>();
  
  // Get parameters from route
  const { 
    email: routeEmail, 
    fullName: routeFullName, 
    password: routePassword,
    isCompany,
    companyName,
    companyDetails,
    stampImage
  } = route.params as SignUpParams;
  
  const [name, setName] = useState(routeFullName || "");
  const [email, setEmail] = useState(routeEmail || "");
  const [password, setPassword] = useState(routePassword || "");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log("Sign up with:", name, email, password, acceptTerms);
    console.log("Company info:", isCompany, companyName);
    
    // Log company details if available
    if (companyDetails) {
      console.log("Company details:", companyDetails);
    }
    
    // Log stamp image if available
    if (stampImage) {
      console.log("Stamp image available:", !!stampImage);
    }
    
    // In a real app, you would call an authentication service
    
    // Navigate to Main screen after successful signup
    navigation.navigate("Main");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Back button and progress indicator */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../../assets/images/arrow.png')} style={styles.backButtonIcon} />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressIndicator} />
              </View>
            </View>
          </View>
          
          <Text style={styles.title}>Crea una cuenta</Text>
          <Text style={styles.subtitle}>
            Llena el formulario debajo o regístrate con tu social account.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@mail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Image
                  source={require("../../assets/images/eye-icon.png")}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAcceptTerms(!acceptTerms)}
            >
              {acceptTerms && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              Aceptas los{" "}
              <Text style={styles.termsLink}>Términos y condiciones</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialLoginContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>O regístrate con</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../../assets/images/apple-logo.png")}
                  style={styles.logoSocial}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, styles.googleButton]}
              >
                <Image
                  source={require("../../assets/images/google-logo.png")}
                  style={styles.logoSocial}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, styles.facebookButton]}
              >
                <Image
                  source={require("../../assets/images/facebook-logo.png")}
                  style={styles.logoSocial}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                ¿Ya tienes una cuenta?{" "}
                <Text
                  style={styles.loginLink}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  Inicia Sesión
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    padding: 10,
    borderRadius: 50,
  },
  backButtonIcon: {
    width: 18,
    height: 18,
    tintColor: "#7CB9E8",
  },
  progressContainer: {
    flex: 1,
    marginLeft: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#EEEEEE",
    borderRadius: 3,
  },
  progressIndicator: {
    width: "60%", // Increased from 40% to 60% to show progress
    height: "100%",
    backgroundColor: "#7CB9E8",
    borderRadius: 3,
  },
  logoSocial: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 60,
    color: "#333",
  },
  subtitle: {
    color: "#C0C0C0",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#FDF4EE",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#FDF4EE",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    paddingRight: 50, // Space for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  termsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#E77024",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#E77024",
    borderRadius: 2,
  },
  termsText: {
    fontSize: 14,
    color: "#888",
  },
  termsLink: {
    color: "#E77024",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#E77024",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Social Login Styles
  socialLoginContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    paddingHorizontal: 10,
    color: "#888",
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 15,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  googleButton: {
    borderColor: "#D9D9D9",
  },
  facebookButton: {
    borderColor: "#D9D9D9",
  },
  loginContainer: {
    marginTop: 30,
  },
  loginText: {
    fontSize: 14,
    color: "#888",
  },
  loginLink: {
    color: "#E77024",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

export default SignUpScreen;
