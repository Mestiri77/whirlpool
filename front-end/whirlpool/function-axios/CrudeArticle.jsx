import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const fetchArticles = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/api/articles/articles');
    setArticles(response.data);
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};
const CrudeArticle = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    coloeur: '',
    typeC: '',
    capacite: '',
    prix: ''
  });

  // Function to fetch all articles
 

  // Function to handle form submission for creating/updating an article
  const handleSubmit = async () => {
    try {
      if (formData.idArticle) {
        await axios.put(`http://127.0.0.1:3000/api/articles/articles/${formData.idArticle}`, formData);
      } else {
        await axios.post('http://127.0.0.1:3000/api/articles/articles', formData);
      }
      fetchArticles();
      setFormData({
        coloeur: '',
        typeC: '',
        capacite: '',
        prix: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Function to handle delete article
  const handleDelete = async (idArticle) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/articles/articles/${idArticle}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <View>
      <Text>Articles</Text>
      <TextInput
        onChangeText={text => setFormData({ ...formData, coloeur: text })}
        value={formData.coloeur}
        placeholder="Color"
      />
      <TextInput
        onChangeText={text => setFormData({ ...formData, typeC: text })}
        value={formData.typeC}
        placeholder="Type"
      />
      <TextInput
        onChangeText={text => setFormData({ ...formData, capacite: text })}
        value={formData.capacite}
        placeholder="Capacity"
      />
      <TextInput
        onChangeText={text => setFormData({ ...formData, prix: text })}
        value={formData.prix}
        placeholder="Price"
      />
      <Button onPress={handleSubmit} title="Submit" />
      <FlatList
        data={articles}
        keyExtractor={item => item.idArticle.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.coloeur}</Text>
            <Text>{item.typeC}</Text>
            <Text>{item.capacite}</Text>
            <Text>{item.prix}</Text>
            <Button title="Edit" onPress={() => setFormData(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.idArticle)} />
          </View>
        )}
      />
    </View>
  );
}

export default CrudeArticle;
module.exports={
  fetchArticles
}