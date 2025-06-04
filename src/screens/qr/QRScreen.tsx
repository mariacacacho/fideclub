import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type QRScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QR"
>;

const QRScreen = () => {
  const navigation = useNavigation<QRScreenNavigationProp>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSendEmail = () => {
    // Functionality to send QR code to email would go here
    console.log("Send QR to email");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Image
            source={require("../../assets/images/arrow.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.title}>QR</Text>
        <Text style={styles.subtitle}>
          Usa este QR para que tus clientes acumulen un punto.
        </Text>

        <View style={styles.qrContainer}>
          <Image
            source={require("../../assets/images/qr-example.png")}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.emailButton}
          onPress={handleSendEmail}
        >
          <Text style={styles.emailButtonText}>Enviar a correo electrónico</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 35,
    height: 34,
    borderRadius: 50,
    marginBottom: 30,
    backgroundColor: '#F4F4F4',
    alignContent: 'center',
    justifyContent: 'center'
  },
  backIcon: {
    width: 'auto',
    height: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  qrImage: {
    width: 250,
    height: 250,
  },
  emailButton: {
    backgroundColor: "#F47B20",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  emailButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBar: {
    height: 5,
    width: 40,
    backgroundColor: "#333",
    alignSelf: "center",
    borderRadius: 3,
    marginBottom: 10,
  },
});

export default QRScreen;
