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
import { RootStackParamList } from '../../navigation/AppNavigator';
import CustomCard, { CardData } from '../../components/common/CustomCard';
import BranchSelector from '../../components/common/BranchSelector';

type CardsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cards'
>;

// Mock data for the loyalty cards
const cardsData: CardData[] = [
  {
    id: 1,
    businessName: "The Barber's House - Mixco, Guatemala",
    backgroundColor: '#F5F5F5',
    textColor: '#333333',
    stamps: Array(8).fill(false).map((_, index) => index < 6), // 6 filled, 2 empty
    isCompleted: false,
  },
  {
    id: 2,
    businessName: "The Barber's House - Alamo Express",
    backgroundColor: '#FF6B6B',
    textColor: '#FFFFFF',
    stamps: Array(8).fill(false).map((_, index) => index < 7), // 7 filled, 1 empty
    isCompleted: false,
  },
];

const CardsScreen = () => {
  const navigation = useNavigation<CardsScreenNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Roosevelt');

  const handleCreateCard = () => {
    console.log('Create card');
    // Navigate to create card screen
  };

  const handleEditCard = (cardId: number) => {
    console.log('Edit card:', cardId);
    // Navigate to edit card screen
  };

  const filteredCards = cardsData.filter(card =>
    card.businessName.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tarjetas</Text>
        <TouchableOpacity onPress={handleCreateCard} style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear tarjeta</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image
            source={require('../../assets/images/search-icon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar tarjeta"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Branch Selector 
      <BranchSelector
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        style={styles.branchSelectorContainer}
      /> */}

      {/* Cards List */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>

        {filteredCards.map((card) => (
          <CustomCard
            key={card.id}
            card={card}
            onEdit={handleEditCard}
          />
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
    paddingBottom: 10,
    backgroundColor: '#F8F8F8',
  },
  headerTitle: {
    fontSize: 24,
    color: '#333',
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
    marginBottom: 0,
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
  branchSelectorContainer: {
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default CardsScreen;
