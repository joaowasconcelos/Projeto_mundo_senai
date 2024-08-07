import React from 'react';
import { SafeAreaView, ScrollView, Platform, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native'

const contato = require('../../../assets/contact.png');

const Contatos = () => {

  return (

    <SafeAreaView style={styles.androidSafeArea}>

      <View style={styles.container}>

        <Image style={styles.image} source={contato} />

        <Text style={styles.subtitulo4}>Entre em contato conosco!</Text>

        <View style={styles.box_white}>

          <View style={styles.boxesPai}>

            <View style={styles.boxes}>
              <FontAwesome name='car' size={25} color={'#243434'} onPress={() => navigation.navigate('Dados')} />
              <Text style={styles.text}>123, Rua das Flores</Text>
              <Text style={styles.text}>Jardim Primavera - São Paulo</Text>
              <Text style={styles.text}>12.784-567</Text>
            </View>
            <View style={styles.boxes}>
              <FontAwesome name='mobile' size={39} color={'#243434'} onPress={() => navigation.navigate('Dados')} />
              <View style={styles.ladoalado}>
                <Text style={styles.text}>(19) 3345-6789</Text>
                <Text style={styles.text}>(19) 3456-7890</Text>
              </View>
            </View>
            <View style={styles.boxes}>
              <FontAwesome name='calendar' size={25} color={'#243434'} onPress={() => navigation.navigate('Dados')} />
            </View>
            <View style={styles.ladoalado}>
              <View style={styles.boxes}>
                <Text style={styles.text}>Dias Úteis</Text>
                <Text style={styles.text}>9:00 - 18:00</Text>
              </View>
              <View style={styles.boxes}>
                <Text style={styles.text}>Finais de semana</Text>
                <Text style={styles.text}>9:00 - 14:00</Text>
              </View>
              <View style={styles.boxes}>
                <Text style={styles.text}>Feriados</Text>
                <Text style={styles.text}>10:00 - 14:00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contatos;

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    height: 'auto'
  },
  box_white: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 422,
    width: 460,
    paddingTop: 4,
    alignItems: 'center',
    backgroundColor: '#E1E1E1',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 10
  },
  subtitulo4: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
  },
  boxes: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2
  },
  boxesPai: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'grey'
  },
  ladoalado: {
    display: "flex",
    flexDirection: 'row',
    gap: 5
  }
});


