import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import axios from 'axios';

const CrudPdv = () => {
  const [pdvs, setPdvs] = useState([]);
  const [formData, setFormData] = useState({
    pdvname: '',
    location: ''
  });
  const [username, setUsername] = useState('');
  const [pdvName, setPdvName] = useState('');

  // Function to fetch all PDVs
  const fetchPdvs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/pdvs/pdvs');
      setPdvs(response.data);
    } catch (error) {
      console.error('Error fetching PDVs:', error);
    }
  };

  // Function to create a PDV
  const createPdv = async () => {
    try {
      await axios.post('', formData);
      fetchPdvs();
      setFormData({ pdvname: '', location: '' });
    } catch (error) {
      console.error('Error creating PDV:', error);
    }
  };

  // Function to update a PDV
  const updatePdv = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:3000/api/pdvs/pdvs/${id}`, formData);
      fetchPdvs();
      setFormData({ pdvname: '', location: '' });
    } catch (error) {
      console.error('Error updating PDV:', error);
    }
  };

  // Function to delete a PDV
  const deletePdv = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/pdvs/pdvs/${id}`);
      fetchPdvs();
    } catch (error) {
      console.error('Error deleting PDV:', error);
    }
  };

  // Function to fetch PDV name for a given user
  const fetchPdvName = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/pdvs/pdvs', { name: username });
      setPdvName(response.data.namepdv);
    } catch (error) {
      console.error('Error fetching PDV name:', error);
    }
  };

  useEffect(() => {
    fetchPdvs();
  }, []);

  return (
    <View>
      <Text>Create PDV</Text>
      <TextInput
        onChangeText={text => setFormData({ ...formData, pdvname: text })}
        value={formData.pdvname}
        placeholder="PDV Name"
      />
      <TextInput
        onChangeText={text => setFormData({ ...formData, location: text })}
        value={formData.location}
        placeholder="Location"
      />
      <Button onPress={createPdv} title="Create PDV" />

      <Text>Update PDV</Text>
      <TextInput
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="Enter PDV ID"
      />
      <TextInput
        onChangeText={text => setFormData({ ...formData, pdvname: text })}
        value={formData.pdvname}
        placeholder="New PDV Name"
      />
      <TextInput
        onChangeText={text => setFormData({ ...formData, location: text })}
        value={formData.location}
        placeholder="New Location"
      />
      <Button onPress={() => updatePdv(username)} title="Update PDV" />

      <Text>Get PDV Name for User</Text>
      <TextInput
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="Enter username"
      />
      <Button onPress={fetchPdvName} title="Get PDV Name" />
      {pdvName ? <Text>PDV Name: {pdvName}</Text> : null}

      <Text>All PDVs</Text>
      <FlatList
        data={pdvs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.pdvname}</Text>
            <Text>Location: {item.location}</Text>
            <Button title="Delete" onPress={() => deletePdv(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

export default CrudPdv;
