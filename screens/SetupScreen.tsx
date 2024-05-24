import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { signupUser } from './api'; 

interface RouteParams {
  farmerId: string;
  email: string;
  password: string;
}

export default function SetupScreen() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [region, setRegion] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | ''>(''); // State for managing selected sex
  const navigation = useNavigation();
  const route = useRoute();

  // Cast route.params to RouteParams to ensure TypeScript understands its structure
  const { farmerId, email, password }: RouteParams = route.params as RouteParams;

  const handleSubmit = async () => {
    if (name && dateOfBirth && region && sex) {
      const userData = { farmerId, email, password, name, dateOfBirth, region, sex }; // Include sex in userData
      try {
        const response = await signupUser(userData); // Send user data to the backend
        console.log("Response:", response); // Log the entire response object
        if (response.success) {
          console.log("User signed up successfully");
          navigation.navigate('Tabs'); // Navigate back after successful signup
        } else {
          console.log("Failed to sign up user:", response.message);
          // Handle signup failure
        }
      } catch (error) {
        console.error("Error signing up user:", error);
        // Handle error
      }
    } else {
      alert("Please fill in all fields");
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <TextInput
        style={styles.input}
        placeholder="Region"
        value={region}
        onChangeText={setRegion}
      />
      {/* Radio buttons for choosing sex */}
      <TouchableOpacity style={styles.radioContainer} onPress={() => setSex('female')}>
        <Text style={styles.radioText}>Female</Text>
        <Radio selected={sex === 'female'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.radioContainer} onPress={() => setSex('male')}>
        <Text style={styles.radioText}>Male</Text>
        <Radio selected={sex === 'male'} />
      </TouchableOpacity>
      <Button title="Submit" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

// Radio button component
const Radio: React.FC<{ selected: boolean }> = ({ selected }) => (
  <View style={[styles.radio, selected && styles.radioSelected]} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    marginRight: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#000',
  },
  goBack: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
