import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

const Button = () => {
  return (
    <TouchableOpacity>
      <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')} />
    </TouchableOpacity>
  );
};

export default Button;
