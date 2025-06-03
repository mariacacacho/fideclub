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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // Handle sign in logic here
    console.log("Sign in with:", email, password);
    // For now, navigate directly to Dashboard
    navigation.navigate("Dashboard");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Hola, ¡qué bueno tenerte de vuelta!
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@mail.com"
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

          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste la contraseña?
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialLoginContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>O Inicia sesión con</Text>
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

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No tienes una cuenta?{" "}
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Regístrate
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  logoSocial: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    color: "#C0C0C0",
    fontSize: 16,
    marginBottom: 50,
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
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#E77024",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#E77024",
    textDecorationLine: "underline",
    fontWeight: "500",
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
  socialButtonIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  appleIcon: {
    color: "#000",
    fontSize: 28,
  },
  googleButton: {
    borderColor: "#D9D9D9",
  },
  googleIcon: {
    color: "#D9D9D9",
    fontSize: 24,
    fontWeight: "bold",
  },
  facebookButton: {
    borderColor: "#D9D9D9",
  },
  facebookIcon: {
    color: "#3b5998",
    fontSize: 28,
    fontWeight: "bold",
  },
  registerContainer: {
    marginTop: 30,
  },
  registerText: {
    fontSize: 14,
    color: "#888",
  },
  registerLink: {
    color: "#E77024",
    textDecorationLine: "underline",
    fontWeight: "500",
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
});

export default SignInScreen;
