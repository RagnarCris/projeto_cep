import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function SearchCEP({ submitHandler }) {
  [text, setText] = useState('');

  const changeHandler = (val) => {
    setText(val);
  };

  const pressHandler = () => {
    submitHandler(text);
    setText('');
  }

  return (
    <View>
      <TextInput 
        keyboardType='numeric'
        style={styles.input} 
        placeholder='e.g 33333111'
        onChangeText={changeHandler} 
        value={text} 
      />
      <Button color='blue' onPress={pressHandler} title='Busca CEP' />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});