import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface CustomCheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#52337c',
    borderRadius: 4,
  },
  checkedCheckbox: {
    backgroundColor: '#52337c',
  },
});

export default CustomCheckbox;
