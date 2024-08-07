
import React, { useState, useRef }  from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function IrrigationRecommendScreen() {
  const [parameters, setParameters] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
    time: '',
  });
  const [predictedIrrigation, setPredictedIrrigation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const temp = useRef(null);
  const hum = useRef(null);
  const moist = useRef(null);
  const time = useRef(null);
  const handlePredictIrrigation = async () => {
    console.log('Making prediction request...');
    try {
      const response = await fetch('http://ip:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });

      console.log('Prediction request completed');

      const responseData = await response.json();
      console.log(responseData);
      setPredictedIrrigation(responseData.prediction);
      setModalVisible(true); // Show the modal when prediction is received
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
              returnKeyType="next"
              ref={temp}
              onSubmitEditing={() => hum.current.focus()}
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Humidity:</Text>
            <TextInput
              style={styles.input}
              value={parameters.humidity}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, humidity: text }))}
              keyboardType="numeric"
              returnKeyType="next"
              ref={hum}
              onSubmitEditing={() => moist.current.focus()}
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Moisture:</Text>
            <TextInput
              style={styles.input}
              value={parameters.moisture}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, moisture: text })) }
              keyboardType="numeric"
              returnKeyType="next"
              ref={moist}
              onSubmitEditing={() => time.current.focus()}
            />
          </View>
          <View style={styles.parameterRow}>
            <Text style={styles.parameterLabel}>Time:</Text>
            <TextInput
              style={styles.input}
              value={parameters.time}
              onChangeText={(text) => setParameters((prev) => ({ ...prev, time: text })) }
              keyboardType="numeric"
              returnKeyType="next"
              ref={time}
            />
          </View>

        </View>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handlePredictIrrigation}>
          <Text style={styles.button}>Check Irrigation</Text>
        </TouchableOpacity>

        {/* Modal for displaying the prediction */}
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
              <Text style={styles.modalText}>Your irrigation recommendation is:</Text>
              <Text style={styles.modalText}>{predictedIrrigation}</Text>
              <TouchableOpacity
                style={[styles.touchableOpacity, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
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