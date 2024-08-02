import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import api from '../../service/api';

export default function ConsultasPaciente() {
  const navigation = useNavigation();
  const route = useRoute();

  const [dados, setDados] = useState([]);

  const listarDadosClientes = async () => {
    try {
      const response = await api.post('/PacienteInfo/Mobile');
      console.log('Dados recebidos:', response.data);
      if (response.data && Array.isArray(response.data.infoPaciente)) {
        setDados(response.data.infoPaciente);
      } else {
        console.error('A resposta não contém a estrutura esperada:', response.data);
      }
    } catch (error) {
      console.error("Erro ao listar dados do paciente:", error);
    }
  };

  useEffect(() => {
    listarDadosClientes();
  }, []);

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.barraPerfil}>
        <Text style={styles.textHeader}>Meus Dados</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {dados.map((paciente) => (
          <View key={paciente.id} style={styles.modeloCard}>
            <Text style={styles.textHeaderCard}>Nome:</Text>
            <Text style={styles.textValue}>{paciente.Nome}</Text>
            <Text style={styles.textHeaderCard}>CPF:</Text>
            <Text style={styles.textValue}>{paciente.CPF}</Text>
            <Text style={styles.textHeaderCard}>Data de Nascimento:</Text>
            <Text style={styles.textValue}>{paciente.DataNascimento}</Text>
            <Text style={styles.textHeaderCard}>Gênero:</Text>
            <Text style={styles.textValue}>{paciente.Genero}</Text>
            <Text style={styles.textHeaderCard}>Email:</Text>
            <Text style={styles.textValue}>{paciente.Email}</Text>
            <Text style={styles.textHeaderCard}>Telefone:</Text>
            <Text style={styles.textValue}>{paciente.Telefone}</Text>
            <Text style={styles.textHeaderCard}>Endereço:</Text>
            <Text style={styles.textValue}>
              {paciente.Logradouro}, {paciente.NumeroResidencia}, {paciente.Complemento}, {paciente.Bairro}, {paciente.Estado}, {paciente.CEP}
            </Text>
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
    backgroundColor: '#f8f9fa', // Fundo cinza mais claro
  },
  barraPerfil: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2', // Cor azul para a barra superior
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf', // Linha inferior sutil
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff', // Cor branca para o texto do cabeçalho
  },
  modeloCard: {
    backgroundColor: '#ffffff', // Cor de fundo branca para os cards
    borderRadius: 10, // Bordas arredondadas
    padding: 15, // Espaçamento interno
    marginVertical: 10, // Espaçamento entre os cards
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Sombra para Android
  },
  textHeaderCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Cor de texto mais escura
    marginBottom: 4,
  },
  textValue: {
    color: '#666', // Cor de texto um pouco mais clara para contraste
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
});
