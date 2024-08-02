import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Platform, StyleSheet, Text, View, Image } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native'

const ConsultasMedico = () => {
  const route = useRoute();
  const [login, setLogin] = useState(route.params?.login)

  return (

    <SafeAreaView style={styles.androidSafeArea}>

      <ScrollView>

        <View style={styles.container}>

          <Text style={styles.title}>Proximas consultas:</Text>



        </View>

      </ScrollView>

    </SafeAreaView>
  );
}
export default ConsultasMedico;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textheader: {
    color: '#111',
    fontSize: 12,
    fontWeight: '700',

  },
  textbottom: {
    color: '#111',
    fontSize: 18,
  },
  cardTitle: {
    paddingBottom: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});


