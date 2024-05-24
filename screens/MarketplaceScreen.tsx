import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';

// Define Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const MarketplaceScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  // Dummy data for products
  const dummyProducts: Product[] = [
    { id: '1', name: 'Tomato', price: 2.5, category: 'Vegetable' },
    { id: '2', name: 'Carrot', price: 1.8, category: 'Vegetable' },
    { id: '3', name: 'Lettuce', price: 3.0, category: 'Vegetable' },
    { id: '4', name: 'Apple', price: 2.0, category: 'Fruit' },
    { id: '5', name: 'Orange', price: 1.5, category: 'Fruit' },
    { id: '6', name: 'Banana', price: 2.2, category: 'Fruit' },
    { id: '7', name: 'Potato', price: 1.2, category: 'Vegetable' },
    { id: '8', name: 'Cabbage', price: 2.7, category: 'Vegetable' },
    { id: '9', name: 'Onion', price: 1.0, category: 'Vegetable' },
    { id: '10', name: 'Watermelon', price: 3.5, category: 'Fruit' },
    { id: '11', name: 'Strawberry', price: 2.8, category: 'Fruit' },
    { id: '12', name: 'Grapes', price: 4.2, category: 'Fruit' },
    { id: '13', name: 'Spinach', price: 2.3, category: 'Vegetable' },
    { id: '14', name: 'Broccoli', price: 2.9, category: 'Vegetable' },
    { id: '15', name: 'Pepper', price: 1.7, category: 'Vegetable' },
    { id: '16', name: 'Pumpkin Seeds', price: 5.0, category: 'Seeds' },
    { id: '17', name: 'Sunflower Seeds', price: 4.5, category: 'Seeds' },
    { id: '18', name: 'Potato Seeds', price: 3.8, category: 'Seeds' },
    { id: '19', name: 'Organic Fertilizer', price: 8.0, category: 'Fertilizers' },
    { id: '20', name: 'Nitrogen Fertilizer', price: 7.5, category: 'Fertilizers' },
    { id: '21', name: 'Bean Sprouts', price: 2.1, category: 'Beans' },
    { id: '22', name: 'Kidney Beans', price: 2.4, category: 'Beans' },
    { id: '23', name: 'Black Beans', price: 2.6, category: 'Beans' },
  ];
  

  // Load fonts on component mount
  const filterProductsByCategory = (category: string | null) => {
    if (category === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };
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
        // Handle font loading error
      }
    }
    loadFonts();
  }, []);
  // Set initial products on component mount
  useEffect(() => {
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  // Handle search input change
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Render marketplace screen
  return (
    <View style={styles.container}>
      {/* Top section with header */}
      <View style={styles.topSection}>
     <View style={styles.textContainer}>
       <Text style={styles.textt1}>Welcome to </Text>
       <Text style={styles.textt2}>Hurudza! </Text>
     </View>
     <TouchableOpacity onPress={() => console.log('Setting icon clicked')} style={styles.settingsButton}>
       <Feather name="settings" size={30} color="#000" />
     </TouchableOpacity>
   </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Product list */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={require('../assets/field.png')} style={styles.productImage} />
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardPrice}>Price: ${item.price.toFixed(2)}</Text>
            <Text style={styles.cardDescription}>Category: {item.category}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display in a grid of 2 columns
      />
    </View>
  );
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
  settingsButton: {
    marginBottom: 64,
    // Adjust styles as needed
  },
  
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
   fontFamily: 'Poppins-Regular',
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 12,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
   fontFamily: 'Poppins-Bold',
  },
  cardDescription: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  cardPrice: {
    fontSize: 14,
    color: '#488420',
   fontFamily: 'Poppins-Bold',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default MarketplaceScreen;
