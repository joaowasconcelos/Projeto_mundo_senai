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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Consultas</Text>
        </View>
        {consultas.map((consulta, index) => (
          <View key={index} style={styles.consultaContainer}>
            <Text style={styles.consultaText}>Paciente: {consulta.nome_paciente}</Text>
            <Text style={styles.consultaText}>Data: {consulta.data}</Text>
            <Text style={styles.consultaText}>Hora: {consulta.hora}</Text>
            <Text style={styles.consultaText}>Especialidade: {consulta.desc_especialidade}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Cor de fundo suave
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  consultaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  consultaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  consultaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  consultaDate: {
    fontSize: 14,
    color: '#555555',
  },
  consultaBody: {
    marginTop: 8,
  },
  consultaText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 50,
    padding: 8,
  },
  icon: {
    fontSize: 24,
    color: '#007BFF',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888888',
    marginTop: 20,
  },
});
