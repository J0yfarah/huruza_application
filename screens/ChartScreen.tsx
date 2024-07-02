import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Ensure this library is installed
import { Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

type CropData = {
  Time: string;
  n: number;
  p: number;
  k: number;
  temperature: number;
  humidity: number;
  ph: number;
};

export default function ChartScreen() {
  const [data, setData] = useState<CropData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://ip/backend_hurudza/get_crop.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      })
      .catch(error => setError('Error fetching data: ' + error.message));
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

 //test
  const timestamps = data.map(row => new Date(row.Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const nValues = data.map(row => parseFloat(row.n));
  const pValues = data.map(row => parseFloat(row.p));
  const kValues = data.map(row => parseFloat(row.k));
  const temperatureValues = data.map(row => parseFloat(row.temperature));
  const humidityValues = data.map(row => parseFloat(row.humidity));
  const phValues = data.map(row => parseFloat(row.ph));

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
    
    <ScrollView style={styles.container}>
      <Text style={styles.header}>N, P, K Line Chart</Text>
      <LineChart
        data={{
          labels: timestamps,
          datasets: [
            { data: nValues, color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, strokeWidth: 2 },
            { data: pValues, color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, strokeWidth: 2 },
            { data: kValues, color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, strokeWidth: 2 },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.header}>Temperature Line Chart</Text>
      <LineChart
        data={{
          labels: timestamps,
          datasets: [{ data: temperatureValues, color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, strokeWidth: 2 }],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.header}>Humidity Line Chart</Text>
      <LineChart
        data={{
          labels: timestamps,
          datasets: [{ data: humidityValues, color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`, strokeWidth: 2 }],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.header}>pH Line Chart</Text>
      <LineChart
        data={{
          labels: timestamps,
          datasets: [{ data: phValues, color: (opacity = 1) => `rgba(75, 0, 130, ${opacity})`, strokeWidth: 2 }],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: 'rgba(255, 255, 255, 0.5)',
  backgroundGradientTo: 'rgba(255, 255, 255, 0.5)',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

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
  header: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    marginLeft:24,
  },
  chart: {

    margin: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
});
