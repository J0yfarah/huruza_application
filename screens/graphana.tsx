import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const Grafana = () => {
    const grafanaPanel1Url = 'http://192.168.1.105:3000/d/bdo2jp1f0k1dsd/hurudza?orgId=1&from=1717765320000&to=1717766400000&viewPanel=3';

  const grafanaPanel2Url = 'http://192.168.1.105:3000/d/bdo2jp1f0k1dsd/hurudza?orgId=1&from=1717765320000&to=1717766400000&viewPanel=2'; // Replace with your actual Grafana panel URL

  return (
    <ScrollView style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: grafanaPanel1Url }}
          style={styles.webview}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: grafanaPanel2Url }}
          style={styles.webview}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>
    </ScrollView>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewContainer: {
    height: 400, // Adjust height as needed
    marginBottom: 20,
  },
  webview: {
    flex: 1,
  },
});

export default Grafana;
