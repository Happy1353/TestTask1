import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useFetchListQuery, useCreateItemMutation} from '../redux/apiSlice';
import {Item} from '../redux/apiSlice';

export const ListScreen = () => {
  const {data, error, isLoading} = useFetchListQuery();
  const [createItem, {isLoading: isCreating}] = useCreateItemMutation();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const handleCreateItem = async () => {
    try {
      const newItem: Partial<Item> = {name: 'New Item'};
      const createdItem = await createItem(newItem).unwrap();
      setItems(prevItems => [...prevItems, createdItem]);
      Alert.alert('Item created successfully!');
    } catch (error) {
      console.error('Failed to create item', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    const errorMessage = 'status' in error && `Error: ${error.status}`;
    return (
      <SafeAreaView>
        <Text>{errorMessage}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>List of Items</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Button
        onPress={handleCreateItem}
        title={isCreating ? 'Creating...' : 'Create Item'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
