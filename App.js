import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import SearchCEP from './components/searchCEP';

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [cep, setCep] = useState({ rua: '', cidade: '', uf: '' });

  const submitHandler = (text) => {
    if(text.length == 8){
      setLoading(true);
      // Forço a esperar meio segundo apenas para aparecer "Pesquisando..."
      setTimeout(() => {
        fetch(`https://viacep.com.br/ws/${text}/json/`)
          .then(res => {
            if (!res.ok) { // erro vindo do servidor
              throw Error('Pesquisa retornou erro, o CEP está correto?');
            } 
            return res.json();
          })
          .then(data => {
            setCep({
              rua: data.logradouro,
              cidade: data.localidade,
              uf: data.uf
            });
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
        }, 500);
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
              Logradouro: {isLoading ? "Pesquisando..." : cep.rua}
            </Text>
            <Text style={styles.text}>
              Cidade: {isLoading ? "Pesquisando..." : cep.cidade}
            </Text>
            <Text style={styles.text}>  
              UF: {isLoading ? "Pesquisando..." : cep.uf}
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
    fontSize: 12,
    fontWeight: "bold"
  }
});
