// ConsultasMedico.js

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../service/api';

export default function ConsultasMedico() {
  const navigation = useNavigation();
  const route = useRoute();

  const [consultas, setConsultas] = useState([]);

  const listarConsultas = async () => {
    try {
      const response = await api.post(`/Consultas/Medico/Mobile`);
      console.log('Dados recebidos:', response.data);
      if (response.data && Array.isArray(response.data.results)) {
        setConsultas(response.data.results);
      } else {
        console.error("A resposta não contém um array de consultas.");
      }
    } catch (error) {
      console.error('Erro ao listar consultas:', error);
    }
  };

  useEffect(() => {
    listarConsultas();
  }, []);

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.barraPerfil}>
        <Text style={styles.textHeader}>Bem-vindo!</Text>
        <FontAwesome name="sign-out" size={35} color="#FFFFFF" onPress={() => navigation.navigate('Login')} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Text style={styles.tituloConsultas}>Consultas Agendadas</Text>
        {consultas.map((consulta) => (
          <View key={consulta.id} style={styles.modeloCard}>
            <Text style={styles.textHeaderCard}>Nome do Paciente:</Text>
            <Text style={styles.textValue}>{consulta.nome_paciente}</Text>
            <Text style={styles.textHeaderCard}>CPF do Paciente:</Text>
            <Text style={styles.textValue}>{consulta.cpf_paciente}</Text>
            <Text style={styles.textHeaderCard}>Especialidade:</Text>
            <Text style={styles.textValue}>{consulta.desc_especialidade}</Text>
            <Text style={styles.textHeaderCard}>Data da Consulta:</Text>
            <Text style={styles.textValue}>{consulta.data}</Text>
            <Text style={styles.textHeaderCard}>Hora da Consulta:</Text>
            <Text style={styles.textValue}>{consulta.hora}</Text>
            <Text style={styles.textHeaderCard}>Nome do Funcionário:</Text>
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
    backgroundColor: '#F8F8F8', // Fundo cinza claro
  },
  barraPerfil: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#3A7CA5', // Azul suave para a barra de perfil
    elevation: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B0C4DE', // Linha inferior sutil e suave
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto branco para contraste
  },
  tituloConsultas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 15,
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
