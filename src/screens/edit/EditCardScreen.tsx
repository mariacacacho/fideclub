import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker';

type EditCardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditCard'
>;

type EditCardScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'EditCard'
>['route'];

const EditCardScreen = () => {
  const navigation = useNavigation<EditCardScreenNavigationProp>();
  const route = useRoute<EditCardScreenRouteProp>();
  
  // Get initial data from route params
  const { initialData, cardId } = route.params || { initialData: {} };
  
  // State for card customization
  const [cardBackgroundColor, setCardBackgroundColor] = useState(initialData?.backgroundColor || '#FFFFFF');
  const [stampImage, setStampImage] = useState<string | null>(initialData?.stampImage || null);
  const [numberOfSquares, setNumberOfSquares] = useState(initialData?.squares || '8');
  const [filledStamps, setFilledStamps] = useState(initialData?.filledStamps || '0');
  const [premio, setPremio] = useState(initialData?.premio || '');
  const [condiciones, setCondiciones] = useState(initialData?.condiciones || '');
  
  // State for UI
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedStampIndex, setSelectedStampIndex] = useState<number | null>(null);
  
  // Predefined color options for the card
  const colorOptions = [
    '#FFFFFF', // White
    '#F8F8F8', // Light Gray
    '#FFD700', // Gold
    '#87CEFA', // Light Blue
    '#98FB98', // Light Green
    '#FFA07A', // Light Salmon
    '#D8BFD8', // Thistle
    '#000000', // Black
  ];

  // Request media library permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Necesitamos acceso a tu galería para seleccionar una imagen para tu sello.');
      }
    })();
  }, []);
  
  // Function to open photo library
  const openPhotoLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      
      if (!result.canceled) {
        setStampImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error opening photo library:', error);
      alert('No se pudo abrir la galería de fotos. Inténtalo de nuevo.');
    }
  };

  // Function to toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Function to handle stamp selection
  const handleStampSelect = (index: number) => {
    setSelectedStampIndex(index);
  };

  // Function to handle skip button
  const handleSkip = () => {
    // Navigate to Main screen
    navigation.navigate('Main');
  };

  // Function to save changes and navigate back
  const saveChanges = () => {
    // Create customized card data
    const customizedCard = {
      backgroundColor: cardBackgroundColor,
      stampImage: stampImage,
      squares: numberOfSquares,
      filledStamps: filledStamps,
      premio: premio,
      condiciones: condiciones,
    };
    
    // Navigate back with the customized card data
    if (cardId) {
      // If editing an existing card (from dashboard)
      // Here you would typically update the card in a database
      navigation.goBack();
    } else {
      // If coming from the FidelityCard screen during registration
      // We need to ensure we're passing all required parameters
      const params = route.params as any;
      navigation.navigate('FidelityCard', {
        email: params?.email || '',
        fullName: params?.fullName || '',
        password: params?.password || '',
        companyName: params?.companyName || '',
        companyDetails: params?.companyDetails || {
          address: '',
          phoneNumber: '',
          branchName: '',
          socialMedia: '',
        },
        customizedCard,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Back button and progress indicator */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Image source={require('../../assets/images/arrow.png')} style={styles.backButtonImage} />
              </TouchableOpacity>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progressIndicator} />
                </View>
              </View>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ya casi terminamos</Text>
              <Text style={styles.subtitle}>Puedes personalizar tu tarjeta ahora u omitir este paso y personalizarla después</Text>
            </View>

            {/* Card Preview */}
            <View style={styles.cardPreviewContainer}>
              <View style={[styles.cardPreview, { backgroundColor: cardBackgroundColor }]}>
                <Text style={styles.cardBusinessName}>The Barber's House</Text>
                
                {/* Grid of stamp placeholders */}
                <View style={styles.stampGrid}>
                  {/* First row */}
                  <View style={styles.stampRow}>
                    {[0, 1, 2, 3].map((index) => (
                      <TouchableOpacity 
                        key={`stamp-${index}`}
                        style={[
                          styles.stampPlaceholder,
                          selectedStampIndex === index && styles.selectedStamp
                        ]}
                        onPress={() => handleStampSelect(index)}
                      >
                        {stampImage ? (
                          <Image source={{ uri: stampImage }} style={styles.stampImage} />
                        ) : null}
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  {/* Second row */}
                  <View style={styles.stampRow}>
                    {[4, 5, 6, 7].map((index) => (
                      <TouchableOpacity 
                        key={`stamp-${index}`}
                        style={[
                          styles.stampPlaceholder,
                          selectedStampIndex === index && styles.selectedStamp
                        ]}
                        onPress={() => handleStampSelect(index)}
                      >
                        {stampImage ? (
                          <Image source={{ uri: stampImage }} style={styles.stampImage} />
                        ) : null}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Customization Options */}
            <View style={styles.customizationContainer}>
              {/* Card Color */}
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => toggleSection('color')}
              >
                <View style={styles.sectionTitleContainer}>
                  <Image source={require('../../assets/images/card-icon.png')} style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Color de la tarjeta</Text>
                </View>
                <Image 
                  source={require('../../assets/images/arrowdown-icon.png')} 
                  style={[
                    styles.arrowIcon,
                    expandedSection === 'color' && styles.arrowIconRotated
                  ]} 
                />
              </TouchableOpacity>
              
              {expandedSection === 'color' && (
                <View style={styles.colorOptionsContainer}>
                  {colorOptions.map((color, index) => (
                    <TouchableOpacity
                      key={`color-${index}`}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color },
                        color === cardBackgroundColor && styles.selectedColorOption,
                        color === '#FFFFFF' && styles.whiteColorOption
                      ]}
                      onPress={() => setCardBackgroundColor(color)}
                    />
                  ))}
                </View>
              )}

              {/* Stamp */}
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => toggleSection('stamp')}
              >
                <View style={styles.sectionTitleContainer}>
                  <Image source={require('../../assets/images/camera-icon.png')} style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Sello</Text>
                </View>
                <Image 
                  source={require('../../assets/images/arrowdown-icon.png')} 
                  style={[
                    styles.arrowIcon,
                    expandedSection === 'stamp' && styles.arrowIconRotated
                  ]} 
                />
              </TouchableOpacity>
              
              {expandedSection === 'stamp' && (
                <View style={styles.stampOptionsContainer}>
                  <TouchableOpacity 
                    style={styles.uploadStampButton}
                    onPress={openPhotoLibrary}
                  >
                    <Text style={styles.uploadStampButtonText}>Subir imagen</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Number of Stamps */}
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => toggleSection('numberOfStamps')}
              >
                <View style={styles.sectionTitleContainer}>
                  <Image source={require('../../assets/images/card-icon.png')} style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Número de sellos</Text>
                </View>
                <Image 
                  source={require('../../assets/images/arrowdown-icon.png')} 
                  style={[
                    styles.arrowIcon,
                    expandedSection === 'numberOfStamps' && styles.arrowIconRotated
                  ]} 
                />
              </TouchableOpacity>
              
              {expandedSection === 'numberOfStamps' && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Número de sellos (4-12)"
                    value={numberOfSquares}
                    onChangeText={setNumberOfSquares}
                    keyboardType="number-pad"
                    placeholderTextColor="#CCCCCC"
                  />
                </View>
              )}

              {/* Prize */}
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => toggleSection('prize')}
              >
                <View style={styles.sectionTitleContainer}>
                  <Image source={require('../../assets/images/card-icon.png')} style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Premio</Text>
                </View>
                <Image 
                  source={require('../../assets/images/arrowdown-icon.png')} 
                  style={[
                    styles.arrowIcon,
                    expandedSection === 'prize' && styles.arrowIconRotated
                  ]} 
                />
              </TouchableOpacity>
              
              {expandedSection === 'prize' && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: Corte de cabello gratis"
                    value={premio}
                    onChangeText={setPremio}
                    placeholderTextColor="#CCCCCC"
                  />
                </View>
              )}

              {/* Conditions */}
              <TouchableOpacity 
                style={styles.sectionHeader}
                onPress={() => toggleSection('conditions')}
              >
                <View style={styles.sectionTitleContainer}>
                  <Image source={require('../../assets/images/card-icon.png')} style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Condiciones</Text>
                </View>
                <Image 
                  source={require('../../assets/images/arrowdown-icon.png')} 
                  style={[
                    styles.arrowIcon,
                    expandedSection === 'conditions' && styles.arrowIconRotated
                  ]} 
                />
              </TouchableOpacity>
              
              {expandedSection === 'conditions' && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Ej: Válido de lunes a viernes"
                    value={condiciones}
                    onChangeText={setCondiciones}
                    multiline
                    placeholderTextColor="#CCCCCC"
                  />
                </View>
              )}
            </View>

            {/* Skip Button */}
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={handleSkip}
            >
              <Text style={styles.skipButtonText}>Omitir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 50,
  },
  backButtonImage: {
    width: 18,
    height: 18,
  },
  progressContainer: {
    flex: 1,
    marginLeft: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
  },
  progressIndicator: {
    width: '90%', // Almost complete
    height: '100%',
    backgroundColor: '#7CB9E8',
    borderRadius: 3,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardPreviewContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cardPreview: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBusinessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  stampGrid: {
    width: '100%',
  },
  stampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stampPlaceholder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStamp: {
    borderColor: '#7CB9E8',
    borderWidth: 2,
  },
  stampImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  customizationContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#999999',
  },
  arrowIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#7CB9E8',
  },
  whiteColorOption: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  stampOptionsContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  uploadStampButton: {
    backgroundColor: '#7CB9E8',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  uploadStampButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    fontSize: 16,
    color: '#333333',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  skipButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#7CB9E8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EditCardScreen;
