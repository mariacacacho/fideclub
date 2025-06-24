import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
type MainScreenNavigationProp = NativeStackNavigationProp<
  MainTabParamList,
  'Main'
>;

// List of available branches
const branches = [
  "Alamo Express",
  "Roosevelt",
  "Zona 10",
  "Zona 9",
  "Mixco",
  "Villa Nueva"
];

const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [selectedBranch, setSelectedBranch] = useState("Alamo Express");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleScanClient = () => {
    // Navigate to scan client screen or open camera
    console.log('Scan client');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logofideclub-color.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity 
          style={styles.branchSelector}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.branchText}>Sucursal: {selectedBranch}</Text>
          <Image
            source={require('../../assets/images/arrowdown-icon.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Branch Selection Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownTitle}>Seleccionar Sucursal</Text>
              <ScrollView>
                {branches.map((branch, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      selectedBranch === branch && styles.dropdownItemSelected
                    ]}
                    onPress={() => {
                      setSelectedBranch(branch);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text 
                      style={[
                        styles.dropdownItemText,
                        selectedBranch === branch && styles.dropdownItemTextSelected
                      ]}
                    >
                      {branch}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Business Name and Branch */}
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>The Barber's House</Text>
          <Text style={styles.branchName}>Sucursal: {selectedBranch}</Text>
        </View>

        {/* Scan Client Button */}
        <TouchableOpacity 
          onPress={handleScanClient}
        >
          <LinearGradient
            colors={['#4CD4C0', '#4A90E2']}
            style={styles.scanButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Image
              source={require('../../assets/images/qr-icon.png')}
              style={styles.scanIcon}
            />
            <Text style={styles.scanText}>Escanear cliente</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  branchSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderColor: '#DCDCDC',
    borderWidth: 0.2,
  },
  branchText: {
    fontSize: 14,
    marginRight: 5,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    tintColor: '#333333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdown: {
    width: '100%',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    textAlign: 'center',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F8FF',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  dropdownItemTextSelected: {
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  businessInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  businessName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  branchName: {
    fontSize: 16,
    color: '#666666',
  },
  scanButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  scanIcon: {
    width: 60,
    height: 60,
    tintColor: '#FFFFFF',
    marginBottom: 10,
  },
  scanText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MainScreen;
