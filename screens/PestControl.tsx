import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function PestControlScreen() {
  const [parameters, setParameters] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
  });
  const [predictedCrop, setPredictedCrop] = useState('');

  const handlePredictIrrigation = async () => {
    console.log('Making prediction request...');
    try {
      const response = await fetch('http://10.42.0.34:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });

      console.log('Prediction request completed');

      const responseData = await response.json();
      console.log(responseData);
      setPredictedCrop(responseData.prediction);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'An error occurred while fetching data');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
     <View style={styles.textContainer}>
       <Text style={styles.textt1}>Welcome to </Text>
       <Text style={styles.textt2}>Hurudza! </Text>
     </View>
     <TouchableOpacity onPress={() => console.log('Setting icon clicked')} style={styles.settingsButton}>
       <Feather name="settings" size={30} color="#000" />
     </TouchableOpacity>
   </View>
      <ScrollView>
      <Text style={styles.textt3}>Optimizing water usage with smart irrigation strategies based on real-time data and environmental factors. </Text>
        <View style={styles.card}>
          
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Temperature:</Text>
            <TextInput
              style={styles.input}
              value={parameters.temperature}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, temperature: text }))}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Humidity:</Text>
            <TextInput
              style={styles.input}
              value={parameters.humidity}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, humidity: text }))}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Moisture:</Text>
            <TextInput
              style={styles.input}
              value={parameters.moisture}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, moisture: text }))}
              keyboardType="numeric"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handlePredictIrrigation}>
          <Text style={styles.button}>Predict Irrigation</Text>
        </TouchableOpacity>
        {predictedCrop ? (
          <View style={styles.predictedCropContainer}>
            <Text style={styles.predictedCropLabel}>Your irrigration system should be:</Text>
            <Text style={styles.predictedCrop}>{predictedCrop}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingVertical: 15,
    backgroundColor: '#fff',
    
  },
  textContainer: {
    flexDirection: 'column',
    // Add additional styling if needed
  },
  textt1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  textt2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
  textt3: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 30,
  },
  settingsButton: {
    marginBottom: 64,
    // Adjust styles as needed
  },
  card: {
    marginTop:30,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  parameterLabel: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',

  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#f2f2f2',
    borderRadius: 25,
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  touchableOpacity: {
    margin: 20,
    backgroundColor: '#dcefdd',
    width: 370,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  predictedCropContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  predictedCropLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  predictedCrop: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  cardTitle: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 30,
  },
});
