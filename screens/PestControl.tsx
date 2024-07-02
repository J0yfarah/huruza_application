import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function PestControlScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [predictedResult, setPredictedResult] = useState<string>('');
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [showPredictButton, setShowPredictButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && imagePickerStatus.status === 'granted');
    })();
  }, []);

  const handlePredict = async (imageUri: string) => {
    console.log('Making prediction request...');
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await fetch('http://192.168.227.7:5003/predict', {
        
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Prediction request completed');
      const responseData = await response.json();
      console.log(responseData);
      setPredictedResult(responseData.predicted_class_name);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching data');
    }
  };

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
      setShowPredictButton(true);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);
      setShowPredictButton(true);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.textContainer}>
          <Text style={styles.textt1}>Welcome to</Text>
          <Text style={styles.textt2}>Hurudza!</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Setting icon clicked')} style={styles.settingsButton}>
          <Feather name="settings" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={(ref) => setCameraRef(ref)}
        >
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setCameraType(
                  cameraType === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Feather name="repeat" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleTakePicture}>
              <Feather name="camera" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
              <Feather name="image" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      {showPredictButton && (
        <TouchableOpacity style={styles.predictButton} onPress={() => handlePredict(image as string)}>
          <Text style={styles.predictButtonText}>Predict Disease</Text>
        </TouchableOpacity>
      )}

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
            <Text style={styles.modalText}>Predicted Disease or Pest:</Text>
            <Text style={styles.modalText}>{predictedResult}</Text>
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
  settingsButton: {
    marginBottom: 64,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    alignItems: 'flex-end',
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  touchableOpacity: {
    margin: 20,
    backgroundColor: '#dcefdd',
    width: 370,
    borderRadius: 25,
  
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
   
    height: 250,
    width: 250,
    borderRadius: 10,
  },
  predictButton: {
    margin: 20,
    backgroundColor: '#dcefdd',
    width: 370,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  predictButtonText: {
   
      fontSize: 14,
      fontFamily: 'Poppins-SemiBold',
      color: '#333',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // semi-transparent background
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
