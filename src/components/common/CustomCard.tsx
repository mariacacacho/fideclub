import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

interface CardData {
  id: number;
  businessName: string;
  backgroundColor: string;
  textColor: string;
  stamps: boolean[];
  isCompleted: boolean;
}

interface CustomCardProps {
  card: CardData;
  onEdit: (cardId: number) => void;
}

const CustomCard: React.FC<CustomCardProps> = ({ card, onEdit }) => {
  const route = useRoute();
  
  // Check if we're on EditCardScreen or FidelityCardScreen
  const shouldHideEditButton = route.name === 'EditCard' || route.name === 'FidelityCard';
  
  const renderStampGrid = (stamps: boolean[], backgroundColor: string) => {
    return (
      <View style={styles.stampGrid}>
        {stamps.map((isFilled, index) => (
          <View key={index} style={styles.stampContainer}>
            {isFilled ? (
              <View style={styles.stampFilled}>
                <Image
                  source={require('../../assets/images/logo-tbh.png')}
                  style={styles.stampIcon}
                />
              </View>
            ) : (
              <View style={styles.stampEmpty} />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: card.backgroundColor}]}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{card.businessName}</Text>
        {!shouldHideEditButton && (
          <TouchableOpacity onPress={() => onEdit(card.id)} style={styles.editButton}>
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Loyalty Card */}
      <View>
        {renderStampGrid(card.stamps, card.backgroundColor)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
        // Enhanced shadow for realistic card effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    // Additional shadow layers for more depth
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    padding: 25,
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editButton: {
    padding: 3,
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: '#333',
  },
  stampGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stampContainer: {
    width: '22%',
    aspectRatio: 1,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stampFilled: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for individual stamps
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  stampFilledRed: {
    backgroundColor: '#FFFFFF',
  },
  stampEmpty: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 2,
  },
  stampEmptyRed: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.4)',
  },
  stampIcon: {
    width: 50,
    height: 50,
  },
});

export default CustomCard;
export type { CardData };
