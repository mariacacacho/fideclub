import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import BranchSelector from '../../components/common/BranchSelector';
type MainScreenNavigationProp = NativeStackNavigationProp<
  MainTabParamList,
  'Main'
>;


const MainScreen = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [selectedBranch, setSelectedBranch] = useState("Alamo Express");

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
        <BranchSelector
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
          style={styles.branchSelectorContainer}
        />
      </View>


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
  branchSelectorContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
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
