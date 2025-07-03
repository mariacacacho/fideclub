import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../navigation/AppNavigator';

type BranchesScreenNavigationProp = NativeStackNavigationProp<
  MainTabParamList,
  'Branches'
>;

const branchesData = [
  {
    id: 1,
    name: 'Mixco, Guatemala',
    address: '48 av A 3-59 Colonia Molino de las Flores',
    image: require('../../assets/images/store-2.png'),
  },
    {
    id: 2,
    name: 'Alamo Express',
    address: '38 av 12-45 Zona 12',
    image: require('../../assets/images/store-2.png'),
  },
      {
    id: 3,
    name: 'Alamo Express',
    address: '38 av 12-45 Zona 12',
    image: require('../../assets/images/store-2.png'),
  },
];

const BranchesScreen = () => {
  const navigation = useNavigation<BranchesScreenNavigationProp>();
  const [searchText, setSearchText] = useState('');

  const handleCreateBranch = () => {
    console.log('Create branch');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filteredBranches = branchesData.filter(branch =>
    branch.name.toLowerCase().includes(searchText.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sucursales</Text>
        <TouchableOpacity onPress={handleCreateBranch} style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear sucursal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image
            source={require('../../assets/images/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar sucursal"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {filteredBranches.map((branch) => (
          <TouchableOpacity key={branch.id} style={styles.branchCard}>
            <View style={styles.branchImageContainer}>
              <Image source={branch.image} style={styles.branchImage} />
            </View>
            <View style={styles.branchInfo}>
              <Text style={styles.branchName}>{branch.name}</Text>
              <Text style={styles.branchAddress}>{branch.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    backgroundColor: '#F8F8F8',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    
  },
  createButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  createButtonText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 12,
    tintColor: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  branchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  branchImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  branchImage: {
    width: 130,
    height: 130,
  },
  branchInfo: {
    padding: 20,
  },
  branchName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 14,
    color: '#999',
    lineHeight: 0,
  },
});

export default BranchesScreen;

