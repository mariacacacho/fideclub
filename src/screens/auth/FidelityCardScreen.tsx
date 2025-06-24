import React, { useState, useEffect, useCallback } from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker';

type FidelityCardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FidelityCard'
>;

type FidelityCardScreenRouteProp = NativeStackScreenProps<
  RootStackParamList,
  'FidelityCard'
>['route'];

const FidelityCardScreen = () => {
  const navigation = useNavigation<FidelityCardScreenNavigationProp>();
  const route = useRoute<FidelityCardScreenRouteProp>();
  
  // Get parameters from route
  const { email, fullName, password, companyName, companyDetails } = route.params;
  
  // State for card customization
  const [selectedStamp, setSelectedStamp] = useState(0);
  const [stampImage, setStampImage] = useState<string | null>(null);
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#FFFFFF');
  const [numberOfSquares, setNumberOfSquares] = useState('8');
  const [filledStamps, setFilledStamps] = useState('0');
  const [premio, setPremio] = useState('');
  const [condiciones, setCondiciones] = useState('');
  
  // Focus listener to update card data when returning from EditCardScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Check if there's any data in the route params from EditCardScreen
      if (route.params?.customizedCard) {
        const { backgroundColor, stampImage: newStampImage, squares, filledStamps: newFilledStamps, premio: newPremio, condiciones: newCondiciones } = route.params.customizedCard;
        
        if (backgroundColor) setCardBackgroundColor(backgroundColor);
        if (newStampImage) setStampImage(newStampImage);
        if (squares) setNumberOfSquares(squares);
        if (newFilledStamps) setFilledStamps(newFilledStamps);
        if (newPremio) setPremio(newPremio);
        if (newCondiciones) setCondiciones(newCondiciones);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);
  
  // Request media library permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permisos insuficientes',
          'Necesitamos acceso a tu galería para seleccionar una imagen para tu sello.',
          [{ text: 'OK' }]
        );
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
      Alert.alert('Error', 'No se pudo abrir la galería de fotos. Inténtalo de nuevo.');
    }
  };

  const handleContinue = () => {
    // Navigate to the Main screen
    navigation.navigate('Main');
  };
  
  const handleCustomize = () => {
    // Navigate to the edit card screen with current data
    navigation.navigate('EditCard', {
      initialData: {
        backgroundColor: cardBackgroundColor,
        stampImage: stampImage,
        squares: numberOfSquares,
        filledStamps: filledStamps,
        premio: premio,
        condiciones: condiciones,
      }
    });
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
                <Image source={require('../../assets/images/arrow.png')} style={styles.backButtonText} />
              </TouchableOpacity>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progressIndicator} />
                </View>
              </View>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Tu primera tarjeta de fidelidad</Text>
              <Text style={styles.subtitle}>¿Cómo quieres que luzca tu sello?</Text>
            </View>

            {/* Card Preview */}
            <View style={styles.cardPreviewContainer}>
              <View style={[styles.cardPreview, { backgroundColor: cardBackgroundColor }]}>
                <Text style={styles.cardBusinessName}>{companyName || "The Barber's House"}</Text>
                
                {/* Dynamic grid of stamp placeholders based on numberOfSquares */}
                <View style={styles.stampGrid}>
                  {Array.from({ length: Math.ceil(parseInt(numberOfSquares) / 4) }).map((_, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.stampRow}>
                      {Array.from({ length: Math.min(4, parseInt(numberOfSquares) - rowIndex * 4) }).map((_, colIndex) => {
                        const stampIndex = rowIndex * 4 + colIndex;
                        const isFilled = stampIndex < parseInt(filledStamps);
                        
                        // First stamp is always the one that can be edited
                        if (rowIndex === 0 && colIndex === 0) {
                          return (
                            <TouchableOpacity 
                              key={`stamp-${stampIndex}`}
                              style={styles.stampPlaceholder}
                              onPress={openPhotoLibrary}
                            >
                              {stampImage ? (
                                <Image source={{ uri: stampImage }} style={styles.stampImage} />
                              ) : (
                                <View style={styles.iconContainer}>
                                  <Image source={require('../../assets/images/camera-icon.png')} style={styles.cameraIcon} />
                                  <Text style={styles.iconText}>Galería</Text>
                                </View>
                              )}
                            </TouchableOpacity>
                          );
                        }
                        
                        // Other stamps
                        return (
                          <View 
                            key={`stamp-${stampIndex}`}
                            style={styles.stampPlaceholder}
                          >
                            {isFilled && stampImage ? (
                              <Image source={{ uri: stampImage }} style={styles.stampImage} />
                            ) : null}
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
                
                {/* Premio and Condiciones if they exist */}
                {premio ? (
                  <View style={styles.premioContainer}>
                    <Text style={styles.premioLabel}>Premio:</Text>
                    <Text style={styles.premioText}>{premio}</Text>
                  </View>
                ) : null}
                
                {condiciones ? (
                  <View style={styles.condicionesContainer}>
                    <Text style={styles.condicionesLabel}>Condiciones:</Text>
                    <Text style={styles.condicionesText}>{condiciones}</Text>
                  </View>
                ) : null}
              </View>
            </View>

            {/* Customize and Continue Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleCustomize}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
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
  backButtonText: {
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
    width: '55%', // Between CompanyDetails (50%) and SignUp (60%)
    height: '100%',
    backgroundColor: '#7CB9E8',
    borderRadius: 3,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
  },
  cardPreviewContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
    justifyContent: 'center',
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
    marginRight: 10,
    marginLeft: 10,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    tintColor: '#7CB9E8',
  },
  stampImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 8,
    color: '#7CB9E8',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7CB9E8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  customizeButton: {
    width: '48%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7CB9E8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customizeButtonText: {
    color: '#7CB9E8',
    fontSize: 16,
    fontWeight: '500',
  },
  // Premio and Condiciones styles
  premioContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
  },
  premioLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  premioText: {
    fontSize: 14,
    color: '#666666',
  },
  condicionesContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
  },
  condicionesLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  condicionesText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default FidelityCardScreen;
