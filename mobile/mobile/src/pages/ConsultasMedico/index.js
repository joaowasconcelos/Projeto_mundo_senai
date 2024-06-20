import React from 'react';
import { SafeAreaView, ScrollView, Platform, StyleSheet, Text, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native'

const ConsultasMedico = () => {

  return (

    <SafeAreaView style={styles.androidSafeArea}>

      <ScrollView>

        <View style={styles.container}>

          <Text style={styles.title}>Proximas consultas:</Text>

          
          
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

export default ConsultasMedico;

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
  title: {
    marginTop: 40,
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 30
  }
});


