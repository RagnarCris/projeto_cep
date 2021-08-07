import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import SearchCEP from './components/searchCEP';

export default function App() {
  const [cep, setCep] = useState({ rua: '', cidade: '', uf: '' });

  const submitHandler = (text) => {
    const json_cidade = 'Juiz de Fora Bolsonaro';
    const json_rua = 'Resistência';
    const json_uf = 'MG';
    if(text.length == 8){
      setCep({
        rua: json_rua,
        cidade: json_cidade,
        uf: json_uf
      });
    } else {
      Alert.alert('OOPS', 'CEP deve ter 8 dígitos, sem hífen!', [
        {text: 'Ok', onPress: () => console.log('alert encerrado') }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed');
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <SearchCEP submitHandler={submitHandler} />
          <View style={styles.result}>
            <Text style={styles.text}>
              Rua: {cep.rua}
            </Text>
            <Text style={styles.text}>
              Cidade: {cep.cidade}
            </Text>
            <Text style={styles.text}>  
              UF: {cep.uf}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  result: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    flexDirection: 'column',
    padding: 10,
    height: 150,
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 11,
    fontWeight: "bold"
  }
});
