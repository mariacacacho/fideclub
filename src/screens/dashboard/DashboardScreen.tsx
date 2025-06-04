import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

const barbershopData = [
  { id: '1', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '2', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '3', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '4', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '5', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '6', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '7', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '8', image: require('../../assets/images/barbershop-placeholder.png') },
];

const DashboardScreen = () => {
  const renderBarbershopItem = ({ item }) => (
    <TouchableOpacity style={styles.barbershopItem}>
      <Image source={item.image} style={styles.barbershopImage} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo-fideclub-inside.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/image-user.png")}
          style={styles.logoUser}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Hola, María</Text>
      <Text style={styles.subtitle}>Te damos la bienvenida una vez más</Text>

      <View style={styles.branchSection}>
        <Text style={styles.branchLabel}>Sucursal: Roosevelt</Text>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Cambiar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.barbershopSection}>
        <Text style={styles.sectionTitle}>Nombre barbería</Text>
        <FlatList
          data={barbershopData}
          renderItem={renderBarbershopItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={styles.barbershopRow}
        />
      </View>

      <View style={styles.qrSection}>
        <View style={styles.sectionHeader}>
          <Image
            source={require("../../assets/images/qr-icon.png")}
            style={styles.sectionIcon}
          />
          <Text style={styles.sectionTitle}>QR</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Ver QR</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          El QR está listo para que tus clientes lo puedan escanear.
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>✓ Activo</Text>
          <Text style={styles.statusText}>✓ Publicado, listo para escanear</Text>
        </View>
      </View>

      <View style={styles.analyticsSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.logoSection}>
          <Image
            source={require("../../assets/images/analytics-icon.png")}
            style={styles.sectionIcon}
          />
          </View>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Ver más</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Puedes consultar el estado de tus análisis aquí
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>✓ Activo</Text>
          <Text style={styles.statusText}>✓ Actualizado: 30 mayo 2025</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  barbershopItem: {
    width: '22%',
    aspectRatio: 1,
    margin: '1.5%',
  },
  barbershopImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  barbershopRow: {
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: "space-between",
    marginTop: 70,
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  branchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  branchLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoUser: {
    width: 22,
    height: 22
  },
  changeButton: {
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoSection: {
    backgroundColor: "#24252A",
    padding: 5,
    borderRadius: '50%',
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  barbershopSection: {
    marginHorizontal: 20,
    padding: 18,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  qrSection: {
    backgroundColor: "#FDF4EE",
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  analyticsSection: {
    backgroundColor: "#FDF4EE",
    padding: 20,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  viewButton: {
    borderColor: "#24252A",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: "auto",
  },
  viewButtonText: {
    color: "#24252A",
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  statusContainer: {
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default DashboardScreen;
