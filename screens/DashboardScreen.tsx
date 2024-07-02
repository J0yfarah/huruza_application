import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,ImageBackground } from 'react-native';
import WebView from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}
//test
export default function DashboardScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Dummy data for fields
  const [fields, setFields] = useState([
    { id: '1', name: 'Field 1', image: require('../assets/field.png') },
    { id: '2', name: 'Field 2', image: require('../assets/field.png') },
    { id: '3', name: 'Field 1', image: require('../assets/field.png') },
    { id: '4', name: 'Field 2', image: require('../assets/field.png') },
    { id: '5', name: 'Field 1', image: require('../assets/field.png') },
    { id: '6', name: 'Field 2', image: require('../assets/field.png') },
    // Add more fields as needed
  ]);
  const navigation = useNavigation();
  // Dummy data for field information
  const [fieldInfo, setFieldInfo] = useState([
    { parameter: 'Nitrogen', value: '0', comment: 'Low' },
    { parameter: 'Potassium', value: '0', comment: 'High' },
    { parameter: 'Phosphorus', value: '0', comment: 'Normal' },
    { parameter: 'PH', value: '0', comment: 'None' },
    { parameter: 'Moisture', value: '0', comment: 'None' },
    { parameter: 'Temperature', value: '30°C', comment: 'None' },
    { parameter: 'Conductivity', value: '0', comment: 'None' },
    { parameter: 'Pressure', value: '0', comment: 'None' },
    // Add more parameters as needed
  ]);

  // Dummy data for environment information
  const [environmentInfo, setEnvironmentInfo] = useState([
    { parameter: 'Temperature', value: '30°C', comment: 'None' },
    { parameter: 'Humidity', value: '60%', comment: 'None' },
    { parameter: 'Water Level', value: '0', comment: 'None' },
    { parameter: 'Air Quality', value: '0', comment: 'None' },
    { parameter: 'Rainfall', value: '0', comment: 'None' },
    { parameter: 'Light Intensity', value: '0', comment: 'None' },
    // Add more parameters as needed
  ]);
  const navigateToRecommendScreen = () => {
    
   
    navigation.navigate('Recommend');
  };
  const navigateToIrrigation = () => {
    
   
    navigation.navigate('Irrigation');
  };
  const navigateToPest = () => {
    
   
    navigation.navigate('Pest');
  };
  const navigateToFertilizer = () => {
    
   
    navigation.navigate('Fertilizer');
  };

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'Oran',
            appid: '275a52e20871c6a6b49c5d031e34214c',
            units: 'metric'
          }
        });
        setWeatherData(response.data); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchWeatherData();
  }, []);


  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
       
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded || !weatherData) {
   
    return null;
  }

  return (
     <><View style={styles.topSection}>
     <View style={styles.textContainer}>
       <Text style={styles.textt1}>Welcome to </Text>
       <Text style={styles.textt2}>Hurudza! </Text>
     </View>
     <TouchableOpacity onPress={() => console.log('Setting icon clicked')} style={styles.settingsButton}>
       <Feather name="settings" size={30} color="#000" />
     </TouchableOpacity>
   </View>
      <ScrollView style={styles.container}>

       

   

   
   <View style={styles.weatherForecast}>
       

        
          <WebView
  style={styles.webView}
  originWhitelist={['*']}
  source={require('../assets/weather2.html')}
  scalesPageToFit={true} 
/>


        </View>

       
        <View style={styles.gridContainer}>
          {/* Top Left */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigateToRecommendScreen()}>
            <Feather name="crop" size={24} color="#000" style={styles.gridIcon} />
            <Text style={styles.gridTitle}>Crop Recommendation</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* Top Right */}
          <TouchableOpacity style={styles.gridItem}  onPress={() => navigateToPest()} >
            <Feather name="activity" size={24} color="#000" style={styles.gridIcon} />
            <Text style={styles.gridTitle}>Plant Diseases Detection</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* Bottom Left */}
          <TouchableOpacity style={styles.gridItem} onPress={() => navigateToIrrigation()}>
            <Feather name="droplet" size={24} color="#000" style={styles.gridIcon} />
            <Text style={styles.gridTitle}>Irrigation Recommendation</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
          {/* Bottom Right */}
          <TouchableOpacity style={styles.gridItem}  onPress={() => navigateToFertilizer()}>
            <Feather name="codesandbox" size={24} color="#000" style={styles.gridIcon} />
            <Text style={styles.gridTitle}>Fertilizer Control</Text>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

       

        
      </ScrollView></>
    
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  fieldsSlider: {
   
    marginVertical: 36,
  },
  fieldItem: {
    marginLeft: 12,
    alignItems: 'center',
  },
  fieldCircle: {
    borderWidth: 5,
    borderColor: '#488420',
    borderRadius: 40,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  fieldImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  fieldName: {
 fontFamily: 'Poppins-SemiBold',
    color:  '#488420',
    // Adjust styles as needed
  },
  addFieldButton: {
    // Adjust styles as needed
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#dcefdd',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridIcon: {
    marginBottom: 12,
    color: '#488420' ,
  },
  gridTitle: {
    marginBottom: 24,
  fontFamily: 'Poppins-Bold',
    color: '#488420' ,

  },
  arrowButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
   
  },
  cardContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff', // 30% opacity
    borderRadius: 30,
    padding: 20,
    borderWidth: 1, // Add a border
    borderColor: 'transparent', // Hide the border color
    elevation: 5,
   
  },
  cardTitle: {
    fontSize: 24,
   fontFamily: 'Poppins-SemiBold',
    color:  '#ffaa00',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  parameter: {
    fontSize: 14,
    color: '#333',
    width: '40%',
   fontFamily: 'Poppins-Medium',
    
  },
  value: {
    fontSize: 14,
    color: '#333',
    width: '20%',
    textAlign: 'center',
   fontFamily: 'Poppins-Medium',
  },
  comment: {
    fontSize: 14,
    color: '#333',
    width: '30%',
    textAlign: 'right',
   fontFamily: 'Poppins-Medium',
  },
  exploreButton: {
   
    backgroundColor: '#fcdb5a',
    width: 200,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
  fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  weatherForecast: {
    paddingHorizontal: 12,
    
    marginTop: 0,
  },
  weatherTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#488420',
    marginBottom: 10,
  },
  webView: {
   // height: 500,
   height: 200,
   
   marginTop: 12,
    backgroundColor: 'transparent',
    
  },
  weatherText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 5,
  },
});


