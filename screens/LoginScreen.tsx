import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from './api';

const { height } = Dimensions.get('window');

export default function LoginScreen({ visible, onClose }) {
  const [farmer_id, setFarmerId] = useState('');
  const [farmer_password, setFarmerPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await loginUser(farmer_id, farmer_password);
      if (response.success) {
        console.log("Login successful");
        onClose(); // Close the modal on successful login
        navigation.navigate('Tabs'); // Navigate to the 'Tabs' screen after successful login
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Farmer Identification Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your ID"
            value={farmer_id}
            onChangeText={setFarmerId}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={farmer_password}
            onChangeText={setFarmerPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#488420',
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 15,
  },
  forgotPassword: {
    marginTop: 10,
    textDecorationLine: 'underline',
    color: 'blue',
    fontFamily: 'Roboto',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
