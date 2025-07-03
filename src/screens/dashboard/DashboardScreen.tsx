import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import BranchSelector from "../../components/common/BranchSelector";

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

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
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [selectedBranch, setSelectedBranch] = useState("Roosevelt");
  
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
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/images/image-user.png")}
            style={styles.logoUser}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Hola, María</Text>
      <Text style={styles.subtitle}>Te damos la bienvenida una vez más</Text>

      <BranchSelector
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
      />

      <View style={styles.barbershopSection}>
        <View style={styles.barbershopHeader}>
          <Text style={styles.sectionTitle}>Nombre barbería</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate("EditCard")}
          >
            <Image 
              source={require("../../assets/images/edit.png")} 
              style={styles.editIcon} 
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={barbershopData}
          renderItem={renderBarbershopItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={styles.barbershopRow}
        />
      </View>

      <View style={styles.separator}>

      </View>

      <View style={styles.qrSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.logoSection}>
            <Image
              source={require("../../assets/images/qr-icon.png")}
              style={styles.sectionIcon}
            />
          </View>
          <Text style={styles.sectionTitle}>QR</Text>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate("QR")}
          >
            <Text style={styles.viewButtonText}>Ver QR</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          El QR está listo para que tus clientes lo puedan escanear.
        </Text>
        <View style={styles.statusContainer}>
          <View style={styles.textCheckIcon}>
            <Image source={require("../../assets/images/check.png")} style={styles.checkIcon} />
            <Text style={styles.statusText}>Activo</Text>
          </View>
          <View style={styles.textCheckIcon}>
            <Image source={require("../../assets/images/check.png")} style={styles.checkIcon}/>
            <Text style={styles.statusText}>Publicado, listo para escanear</Text>
          </View>
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
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate("QR")}
          >
            <Text style={styles.viewButtonText}>Ver más</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Puedes consultar el estado de tus análisis aquí
        </Text>
        <View style={styles.statusContainer}>
          <View style={styles.textCheckIcon}>
            <Image source={require("../../assets/images/check.png")} style={styles.checkIcon}/>
            <Text style={styles.statusText}>Activo</Text>
          </View>
          <View style={styles.textCheckIcon}>
            <Image source={require("../../assets/images/check.png")} style={styles.checkIcon}/>
            <Text style={styles.statusText}>Actualizado: 30 mayo 2025</Text>
          </View>
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
    alignContent: "flex-start",
    justifyContent: "space-between",
    marginTop: 70,
    marginBottom: 30,
  },
  logo: {
    width: 160,
    height: 'auto',
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
  checkIcon: {
    width: 15,
    height: 15,
    marginRight: 6
  },
  textCheckIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoUser: {
    width: 22,
    height: 22
  },
  logoSection: {
    backgroundColor: "#24252A",
    padding: 5,
    borderRadius: '50%',
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  barbershopSection: {
    marginHorizontal: 20,
    padding: 18,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#F3F3F3",
  },
  barbershopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#F26E21",
    width: 28,
    height: 28,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10
  },
  qrSection: {
    backgroundColor: "#FDF4EE",
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  analyticsSection: {
    backgroundColor: "#FFF8E3",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionIcon: {
    width: 20,
    height: 20,
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
    borderBottomWidth: 1,
    borderColor: '#C0C0C0',
    paddingBottom: 15,
  },
  separator: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: '#E9E9E9',
    paddingBottom: 15,
    marginHorizontal: 22,
  },
  statusContainer: {
    marginTop: 5,
    flexDirection: 'row'
  },
  statusText: {
    fontSize: 14,
    marginRight: 15,
  },
});

export default DashboardScreen;
