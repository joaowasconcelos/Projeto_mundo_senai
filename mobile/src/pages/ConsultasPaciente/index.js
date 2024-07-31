import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Platform, StyleSheet, Text, View, Button, Pressable, FlatList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../service/api';

export default function ConsultasPaciente() {


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

