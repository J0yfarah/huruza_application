import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout pressed");
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person" size={24} color="black" style={styles.icon} />
        <Text style={styles.headerText}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
      </View>
      <View style={styles.profileContainer}>
        {/* Profile picture */}
        <View style={styles.profilePicture}>
          {/* You can use your profile picture icon here */}
          <Ionicons name="person-circle-outline" size={120} color="black" />
        </View>
        {/* User information */}
        <View style={styles.profileInfo}>
          <Text style={styles.username}>John Doe</Text>
          {/* Other profile data */}
          <View style={styles.profileData}>
            <Ionicons name="calendar-outline" size={24} color="black" style={styles.icon} />
            <Text>Date of Birth: 01/01/1990</Text>
          </View>
          <View style={styles.profileData}>
            <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
            <Text>Email: john.doe@example.com</Text>
          </View>
          <View style={styles.profileData}>
            <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
            <Text>Farmer ID: 123456789</Text>
          </View>
          <View style={styles.profileData}>
            <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
            <Text>Region: Farmville</Text>
          </View>
          <View style={styles.profileData}>
            <Ionicons name="albums-outline" size={24} color="black" style={styles.icon} />
            <Text>Number of Fields: 10</Text>
          </View>
        </View>
      </View>
      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
