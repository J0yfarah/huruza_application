import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'good', title: 'Good News!', description: 'Your field has been watered.' },
    { id: '2', type: 'danger', title: 'Danger Alert!', description: 'Pest infestation detected in your field.' },
    { id: '3', type: 'personal', title: 'Personal Message', description: 'Reminder: Tomorrow is your farm\'s anniversary.' },
    { id: '4', type: 'good', title: 'Great Harvest!', description: 'Your latest harvest was very successful.' },
    { id: '5', type: 'danger', title: 'Heavy Rain Warning!', description: 'Be prepared for heavy rain in your area.' },
    { id: '6', type: 'personal', title: 'Reminder: Meeting', description: 'Don\'t forget about the farmers meeting tomorrow.' },
    { id: '7', type: 'good', title: 'Fertilizer Applied', description: 'Fertilizer has been applied to your fields.' },
    { id: '8', type: 'danger', title: 'Crop Disease Alert!', description: 'A crop disease has been detected in your area.' },
    { id: '9', type: 'personal', title: 'Happy Birthday!', description: 'Wishing you a fantastic birthday.' },
    { id: '10', type: 'good', title: 'Sunny Forecast', description: 'The weather forecast predicts sunny days ahead.' },
    { id: '11', type: 'danger', title: 'Frost Warning!', description: 'Be cautious of frost in your area tonight.' },
    { id: '12', type: 'personal', title: 'Thank You Note', description: 'A thank you note from a satisfied customer.' },
    { id: '13', type: 'good', title: 'Field Inspection Passed', description: 'Your farm has passed its inspection.' },
    { id: '14', type: 'danger', title: 'Wildfire Alert!', description: 'Wildfires reported in your region.' },
    { id: '15', type: 'personal', title: 'New Equipment Arrived', description: 'Your new farming equipment has arrived.' },
    { id: '16', type: 'good', title: 'New Crop Variety!', description: 'Exciting new crop variety available for planting.' },
    { id: '17', type: 'danger', title: 'Equipment Malfunction', description: 'One of your machines needs repair.' },
    { id: '18', type: 'personal', title: 'Congratulations!', description: 'Congratulations on your recent farming award.' },
    { id: '19', type: 'good', title: 'Crop Growth Progress', description: 'Your crops are showing excellent growth progress.' },
    { id: '20', type: 'danger', title: 'Flood Warning!', description: 'Flooding expected in low-lying areas.' },
  ]);

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="notifications" size={24} color="black" style={styles.icon} />
        <Text style={styles.headerText}>Notifications</Text>
        <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={[styles.colorIndicator, item.type === 'good' ? styles.greenIndicator : item.type === 'danger' ? styles.redIndicator : styles.blueIndicator]}></View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteNotification(item.id)}>
              <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  notificationList: {
    paddingVertical: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  greenIndicator: {
    backgroundColor: '#4CAF50', 
  },
  redIndicator: {
    backgroundColor: '#F44336', 
  },
  blueIndicator: {
    backgroundColor: '#2196F3', 
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default NotificationScreen;
