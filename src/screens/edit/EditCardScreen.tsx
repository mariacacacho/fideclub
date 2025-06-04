import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

type EditCardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditCard"
>;

const barbershopIcons = [
  { id: '1', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '2', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '3', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '4', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '5', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '6', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '7', image: require('../../assets/images/barbershop-placeholder.png') },
  { id: '8', image: require('../../assets/images/barbershop-placeholder.png') },
];

const EditCardScreen = () => {
  const navigation = useNavigation<EditCardScreenNavigationProp>();
  const [selectedSquares, setSelectedSquares] = useState("8");
  const [selectedFilledStamps, setSelectedFilledStamps] = useState("1");
  const [backgroundColor, setBackgroundColor] = useState("#F3F3F3");
  const [showSquaresDropdown, setShowSquaresDropdown] = useState(false);
  const [showFilledStampsDropdown, setShowFilledStampsDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleHelpPress = () => {
    // Handle help button press
    console.log("Help button pressed");
  };

  const renderBarbershopItem = ({ item }) => (
    <TouchableOpacity style={styles.barbershopItem}>
      <Image source={item.image} style={styles.barbershopImage} />
    </TouchableOpacity>
  );

  const renderNumberOptions = (max: number, setter: (value: string) => void, closeDropdown: () => void) => {
    const options = [];
    for (let i = 1; i <= max; i++) {
      options.push(
        <TouchableOpacity 
          key={i} 
          style={styles.dropdownItem}
          onPress={() => {
            setter(i.toString());
            closeDropdown();
          }}
        >
          <Text style={styles.dropdownItemText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return options;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Image
              source={require("../../assets/images/arrow.png")}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
            <Image
              source={require("../../assets/images/question-icon.png")}
              style={styles.helpIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Editar tarjeta</Text>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Nombre barbería</Text>
          <FlatList
            data={barbershopIcons}
            renderItem={renderBarbershopItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={styles.barbershopRow}
          />
        </View>

        <View style={styles.stampSection}>
          <Text style={styles.sectionLabel}>Imagen de sello:</Text>
          <View style={styles.stampImageContainer}>
            <Image
              source={require("../../assets/images/barbershop-placeholder.png")}
              style={styles.stampImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Image
                source={require("../../assets/images/camera-icon.png")}
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dropdownSection}>
          <Text style={styles.sectionLabel}>Número de cuadrados:</Text>
          <TouchableOpacity 
            style={styles.dropdownOrange}
            onPress={() => setShowSquaresDropdown(true)}
          >
            <Text style={styles.dropdownText}>{selectedSquares}</Text>
            <Image
              source={require("../../assets/images/arrowdown-icon.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownSection}>
          <Text style={styles.sectionLabel}>Número de sellos llenos:</Text>
          <TouchableOpacity 
            style={styles.dropdownOrange}
            onPress={() => setShowFilledStampsDropdown(true)}
          >
            <Text style={styles.dropdownText}>{selectedFilledStamps}</Text>
            <Image
              source={require("../../assets/images/arrowdown-icon.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownSection}>
          <Text style={styles.sectionLabel}>Color de fondo:</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowColorDropdown(true)}
          >
            <Text style={styles.dropdownText}>#F3F3F3</Text>
            <Image
              source={require("../../assets/images/arrowdown-icon.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Dropdowns Modals */}
        <Modal
          visible={showSquaresDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowSquaresDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowSquaresDropdown(false)}
          >
            <View style={styles.modalContent}>
              <ScrollView>
                {renderNumberOptions(12, setSelectedSquares, () => setShowSquaresDropdown(false))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={showFilledStampsDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFilledStampsDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowFilledStampsDropdown(false)}
          >
            <View style={styles.modalContent}>
              <ScrollView>
                {renderNumberOptions(4, setSelectedFilledStamps, () => setShowFilledStampsDropdown(false))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={showColorDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowColorDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowColorDropdown(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  setBackgroundColor("#F3F3F3");
                  setShowColorDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>#F3F3F3</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  helpIcon: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  cardSection: {
    backgroundColor: "#F3F3F3",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  barbershopItem: {
    width: '22%',
    aspectRatio: 1,
    margin: '1.5%',
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  barbershopImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  barbershopRow: {
    justifyContent: 'flex-start',
  },
  stampSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  stampImageContainer: {
    alignItems: "center",
    position: "relative",
  },
  stampImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#333333",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  dropdownSection: {
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  dropdownOrange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FDF4ED",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownIcon: {
    width: 15,
    height: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "50%",
  },
  dropdownItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 16,
    textAlign: "center",
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

export default EditCardScreen;
