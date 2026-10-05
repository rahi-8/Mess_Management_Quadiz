import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface Member {
  id: number;
  name: string;
}

interface GuestModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onAdd: (memberId: number | null, mealCount: number) => void;
  members?: Member[];
}

const GuestModal: React.FC<GuestModalProps> = ({
  isVisible,
  onCancel,
  onAdd,
  members = [],
}) => {
  const [selectedMemberId, setSelectedMemberId] =
    useState<number | null>(null);

  const [mealCount, setMealCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedMember = members.find(
    (member) => member.id === selectedMemberId
  );

  const incrementMeal = () => {
    setMealCount((prev) => prev + 1);
  };

  const decrementMeal = () => {
    setMealCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleAdd = () => {
    onAdd(selectedMemberId, mealCount);

    setSelectedMemberId(null);
    setMealCount(0);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setSelectedMemberId(null);
    setMealCount(0);
    setShowDropdown(false);
    onCancel();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>

        {/* Blur Background */}
        <BlurView
          intensity={100}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />

        {/* Background Click */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleCancel}
        />

        {/* Modal Container */}
        <View style={styles.modalContainer}>

          {/* Handle */}
          <View style={styles.handleBar} />

          {/* Title */}
          <Text style={styles.title}>
            Add Guest Meal
          </Text>

          {/* Member Section */}
          <View style={styles.fieldContainer}>

            <Text style={styles.label}>
              Member
            </Text>

            {/* Dropdown */}
            <Pressable
              style={styles.dropdown}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !selectedMember && styles.placeholderText,
                ]}
              >
                {selectedMember
                  ? selectedMember.name
                  : 'Select Member'}
              </Text>

              <Ionicons
                name={
                  showDropdown
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={20}
                color="#71717A"
              />
            </Pressable>

            {/* Dropdown List */}
            {showDropdown && (
              <View style={styles.dropdownList}>

                {members.map((member) => (
                  <Pressable
                    key={member.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedMemberId(member.id);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>
                      {member.name}
                    </Text>
                  </Pressable>
                ))}

              </View>
            )}

          </View>

          {/* Meal Section */}
          <View style={styles.fieldContainer}>

            <Text style={styles.label}>
              Meal
            </Text>

            {/* Counter */}
            <View style={styles.counterContainer}>

              {/* Minus */}
              <Pressable
                style={styles.counterButton}
                onPress={decrementMeal}
              >
                <Text style={styles.counterButtonText}>
                  −
                </Text>
              </Pressable>

              {/* Value */}
              <Text style={styles.counterValue}>
                {mealCount}
              </Text>

              {/* Plus */}
              <Pressable
                style={styles.counterButton}
                onPress={incrementMeal}
              >
                <Text style={styles.counterButtonText}>
                  +
                </Text>
              </Pressable>

            </View>

          </View>

          {/* Add Meal Button */}
          <Pressable
            style={[
              styles.addButton,
              (!selectedMemberId || mealCount === 0) &&
                styles.addButtonDisabled,
            ]}
            onPress={handleAdd}
            disabled={!selectedMemberId || mealCount === 0}
          >
            <Text style={styles.addButtonText}>
              Add Meal
            </Text>
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            style={styles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  // Background
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // Bottom Modal
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
  },

  // Handle
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: '#A1A1AA',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },

  // Title
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#18181B',
  },

  // Field
  fieldContainer: {
    marginBottom: 16,
  },

  // Label
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#18181B',
  },

  // Dropdown
  dropdown: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  dropdownText: {
    fontSize: 14,
    color: '#18181B',
  },

  placeholderText: {
    color: '#A1A1AA',
  },

  // Dropdown List
  dropdownList: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#18181B',
  },

  // Counter
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  counterButton: {
    padding: 8,
  },

  counterButtonText: {
    fontSize: 22,
    color: '#71717A',
    fontWeight: '400',
  },

  counterValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#18181B',
  },

  // Add Button
  addButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },

  addButtonDisabled: {
    opacity: 0.4,
  },

  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Cancel Button
  cancelButton: {
    borderWidth: 1,
    borderColor: '#18181B',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },

  cancelButtonText: {
    color: '#18181B',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default GuestModal;