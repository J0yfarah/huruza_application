import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function FertilizerRecommendScreen() {
  const [parameters, setParameters] = useState({
    Nitrogen: '',
    Potassium: '',
    Phosphorous: '',
  });
  const [predictedFertilizer, setPredictedFertilizer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const n = useRef(null);
  const p = useRef(null);
  const k = useRef(null);

  const handlePredictFertilizer = async () => {
    console.log('Making prediction request..');
    const dataToSend = {
      Nitrogen: parseFloat(parameters.Nitrogen),
      Potassium: parseFloat(parameters.Potassium),
      Phosphorous: parseFloat(parameters.Phosphorous),
    };
    console.log('Data to send:', dataToSend); 
    try {
      const response = await fetch('http://ip:5002/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('Prediction request completed');
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.status === 200) {
        setPredictedFertilizer(responseData.prediction);
        setModalVisible(true);  
      } else {
        console.error('Error response from server:', responseData);
        Alert.alert('Error', 'An error occurred while fetching data');
      }
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
        <Text style={styles.textt3}>Enhancing agricultural sustainability through precision irrigation techniques informed by real-time data and environmental factors. </Text>
        <View style={styles.card}>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Nitrogen:</Text>
            <TextInput
              style={styles.input}
              value={parameters.Nitrogen}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, Nitrogen: text }))}
              keyboardType="numeric"
              returnKeyType="next"
              ref={n}
              onSubmitEditing={() => p.current.focus()}
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Phosphorus:</Text>
            <TextInput
              style={styles.input}
              value={parameters.Phosphorous}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, Phosphorous: text }))}
              keyboardType="numeric"
              returnKeyType="next"
              ref={p}
              onSubmitEditing={() => k.current.focus()}
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Potassium:</Text>
            <TextInput
              style={styles.input}
              value={parameters.Potassium}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, Potassium: text }))}
              keyboardType="numeric"
              returnKeyType="next"
              ref={k}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handlePredictFertilizer}>
          <Text style={styles.button}>Recommend a Fertilizer</Text>
        </TouchableOpacity>
      </ScrollView>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Your recommended fertilizer is:</Text>
            <Text style={styles.modalText}>{predictedFertilizer}</Text>
            <TouchableOpacity
              style={[styles.touchableOpacity, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  card: {
    marginTop: 30,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
  },
  modalView: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 25,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#dcefdd',
    marginTop: 15,
    width: 100,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
});
