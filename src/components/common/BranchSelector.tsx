import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ViewStyle,
} from 'react-native';

// List of available branches
const branches = [
  "Alamo Express",
  "Roosevelt",
  "Zona 10",
  "Zona 9",
  "Mixco",
  "Villa Nueva"
];

interface BranchSelectorProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  style?: ViewStyle;
  showLabel?: boolean;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({
  selectedBranch,
  onBranchChange,
  style,
  showLabel = true,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleBranchSelect = (branch: string) => {
    onBranchChange(branch);
    setDropdownVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.branchSelector}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.branchText}>
          {showLabel ? `Sucursal: ${selectedBranch}` : selectedBranch}
        </Text>
        <Image
          source={require('../../assets/images/arrowdown-icon.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

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
                    onPress={() => handleBranchSelect(branch)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    color: '#333333',
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
    color: '#333333',
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
    color: '#333333',
  },
  dropdownItemTextSelected: {
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});

export default BranchSelector;
