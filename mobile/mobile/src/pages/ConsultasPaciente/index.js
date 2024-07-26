import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Platform, StyleSheet, Text, View, Button, Pressable, FlatList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../service/api';

export default function ConsultasPaciente() {

  const navigation = useNavigation();
  const route = useRoute();

  let [flatListConsultas, setFlatListClientes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState(false);

  const listarConsultas = async () => {

    try {
      const response = await api.get('/paciente/novo') //conferir se essa rota ai ta certa pois não achei

        .catch(function (error) {

          if (error.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

          } else if (error.resquest) {

            if ((error.resquest._response).include('Failed')) {
              console.log('Erro ao conectar com API');

            }
          } else {

            console.log(error.message);

          }

          console.log(error.config);

        });
      if (response != undefined) {
        if (response.data.length > 0) {

          let temp = [];
          for (let i = 0; i < response.data.length; i++) {
            temp.push(response.data[i]);

          }
          setFlatListClientes(temp);
          temp = [];

        } else {
          setAlertMessage('Nenhum registro foi localizado!')
          exibeAlert();
          return;
        }
      }

    } catch (error) {
      console.error(error);
    }
    return (

      <View style={styles.modeloCard}>

        <Text style={styles.textHeader}>{item.funcionario_pessoa_id}</Text>
        <Text style={styles.textHeader}>{item.especialidade}</Text>

        <Text style={styles.textHeader}>Data da consulta:</Text>
        <Text style={styles.textValue}>{item.data}</Text>

        <Text style={styles.textHeader}>Horário:</Text>
        <Text style={styles.textValue}>{item.hora}</Text>

        <Text style={styles.textHeader}>Status da consulta:</Text>
        <Text style={styles.textValue}>{item.status}</Text>
      </View>
    )

  }

  useFocusEffect(
    React.useCallback(() => {
      listarConsultas();
    }, [refresh])
  )


  let listViewItem = (item) => {

    return (

      <View style={styles.modeloCard}>

        <Text style={styles.textHeader}>{item.funcionario_pessoa_id}</Text>
        <Text style={styles.textHeader}>{item.especialidade}</Text>

        <Text style={styles.textHeader}>Data da consulta:</Text>
        <Text style={styles.textValue}>{item.data}</Text>

        <Text style={styles.textHeader}>Horário:</Text>
        <Text style={styles.textValue}>{item.hora}</Text>

        <Text style={styles.textHeader}>Status da consulta:</Text>
        <Text style={styles.textValue}>{item.status}</Text>
      </View>
    )

  }


  return (

    <SafeAreaView style={styles.androidSafeArea}>

      <View style={styles.barraPerfil}>

        <Text style={styles.textHeader}>Bem vindo!</Text>

        <FontAwesome name='user' size={35} color={'#243434'} onPress={() => navigation.navigate('Dados')} />

      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={flatListConsultas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listViewItem(item)}
        />
      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    height: 897
  },
  subtitulo3: {
    color: '#007c7c',
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 172
  },
  barraPerfil: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    padding: 10,
    backgroundColor: '#f1f1f1'
  },
  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#243434',
    paddingTop: 4
  },
  modeloCard: {
    backgroundColor: 'purple',
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    elevation: 8,
  },
  textValue: {
    color: 'white',
    fontSize: 18
  }
});

