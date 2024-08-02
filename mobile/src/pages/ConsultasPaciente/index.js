  import React, { useState, useEffect } from 'react';
  import { SafeAreaView, StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
  import { useNavigation, useRoute } from '@react-navigation/native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';

  import api from '../../service/api';

  export default function ConsultasPaciente() {
    const navigation = useNavigation();
    const route = useRoute();

    const [consultas, setConsultas] = useState([]);
    const id = route.params?.id;

    const listarConsultas = async () => {
      try {
        const response = await api.get(`/Consultas/Paciente/Mobile/${id}`);
        console.log('Dados recebidos:', response.data);
        if (Array.isArray(response.data)) {
          setConsultas(response.data);
        } else {
          console.error('A resposta não é uma array:', response.data);
        }
      } catch (error) {
        console.error("Erro ao listar consultas:", error);
      }
    };

    useEffect(() => {
      listarConsultas();
    }, []);

    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.barraPerfil}>
          <Text style={styles.textHeader}>Bem-vindo!</Text>
          <FontAwesome name="user" size={35} color="#243434" onPress={() => navigation.navigate('Dados')} />
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
      
          {consultas.map((consulta) => (
            <View key={consulta.id} style={styles.modeloCard}>
              <Text>Proximas Consultas</Text>
              <Text style={styles.textHeader}>Nome do Paciente:</Text>
              <Text style={styles.textValue}>{consulta.nome_paciente}</Text>
              <Text style={styles.textHeader}>CPF do Paciente:</Text>
              <Text style={styles.textValue}>{consulta.cpf_paciente}</Text>
              <Text style={styles.textHeader}>Especialidade:</Text>
              <Text style={styles.textValue}>{consulta.desc_especialidade}</Text>
              <Text style={styles.textHeader}>Data da Consulta:</Text>
              <Text style={styles.textValue}>{consulta.data}</Text>
              <Text style={styles.textHeader}>Hora da Consulta:</Text>
              <Text style={styles.textValue}>{consulta.hora}</Text>
              <Text style={styles.textHeader}>Nome do Funcionário:</Text>
              <Text style={styles.textValue}>{consulta.nome_funcionario}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    androidSafeArea: {
      paddingTop: Platform.OS === 'android' ? 40 : 0,
      flex: 1,
      backgroundColor: '#f0f0f0', // Fundo cinza claro e neutro
    },
    barraPerfil: {
      width: '100%',
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#4A90E2', // Azul suave para a barra de perfil
      elevation: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#d0d0d0', // Linha inferior sutil
    },
    textHeader: {
      fontSize: 15, // Tamanho da fonte aumentado para melhor visibilidade
      fontWeight: '600',
    
    },
    tituloConsultas: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333333',
      marginVertical: 15,
      paddingHorizontal: 20,
    },
    modeloCard: {
      backgroundColor: '#ffffff',
      marginVertical: 10,
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    textHeaderCard: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 8,
    },
    textValue: {
      color: '#555555',
      fontSize: 16,
      marginBottom: 12,
      lineHeight: 22,
    },
  });
  

