import React, { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView, ScrollView, Platform, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native'


const logo = require('../../../assets/logo_medical.png');
import api from '../../service/api';

const Login = () => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [dadosLogin, setDadosLogin] = useState({})

    const navigation = useNavigation();

    const navegaLogin = () => {
        // Navega para a tela principal
        navigation.navigate('Main');
    };

    const getLogin = async () => {
        try {
            // console.log('oi');
            // console.log(login, senha);
            await api.post(`/Login/mobileEntrar`, { login: login, senha: senha })
                .then(response => {
                    console.log(response.data);
                    // if (response !== undefined && response.data != null) {

                    //     const { data } = response.data;
                    //     const [firstEntry] = data;
                    //     const { id, idLogin, login, senha, tipo } = firstEntry;

                    //     // console.log(id, idLogin, login, senha, tipo);
                    //     setDadosLogin({ id: id, idLogin: idLogin, login: login, senha: senha, tipo: tipo });
                    //     console.log(dadosLogin);
                    // } else {
                    //     alert('Nenhum registro foi localizado!');
                    // }
                    console.log(response.data.id)
                    const id = response.data.id
                    if (response.data.tipo === 'medico') {
                        navigation.navigate('MedicoTab', { id })
                    } else if (response.data.tipo === 'paciente') {
                        navigation.navigate('PacienteTab', { id })
                    }
                }).catch(error => {
                    console.log('Erro', error);
                })
            if (dadosLogin.tipo === 'medico') {
                navigation.navigate('MedicoTab', { dadosLogin })
            } else {
                if (dadosLogin.tipo === 'paciente') {
                    navigation.navigate('PacienteTab', { dadosLogin })

                }
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                if ((error.request._response).includes('Failed')) {
                    console.log('Erro ao conectar a API.');
                }
            } else {
                console.log('Erro', error.message);
            }
            console.log(error.config);
        }
    }

    return (

        <SafeAreaView style={styles.androidSafeArea}>

            <ScrollView>

                <LinearGradient colors={['rgb(0, 76, 76)', 'transparent']} style={styles.background} />

                <View style={styles.topo}>

                    <Text style={styles.title}>SP MEDICAL GROUP</Text>
                    <Image source={logo} />

                </View>

                <View style={styles.container}>

                    <View style={styles.box_white}>

                        <Text style={styles.subtitulo5}>Bem Vindo</Text>
                        <Text style={styles.subtitulo4}>Faça login em sua conta</Text>

                        <TextInput
                            placeholder='Digite seu C.P.F.'
                            style={styles.entradaTexto}
                            value={login}
                            onChangeText={setLogin}>
                        </TextInput>

                        <TextInput
                            placeholder='Digite sua senha'
                            secureTextEntry={true}
                            style={styles.entradaTexto}
                            value={senha}
                            onChangeText={setSenha}>
                        </TextInput>

                        <Text style={styles.subtitulo3}>Esqueceu a senha?</Text>

                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#b2d8d8' : '#004c4c',
                                    width: 350,
                                    height: 50,
                                    justifyContent: 'center',
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    marginTop: 20,
                                    marginBottom: 10
                                },
                            ]}
                            onPress={getLogin({ id: login.id })}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 25, letterSpacing: 5, fontWeight: 'bold', color: '#fafafa' }}>Logar</Text>
                        </Pressable>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default Login;

const styles = StyleSheet.create({
    androidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '%60',
        width: '%46',
        //backgroundColor: '#f7f9f8',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginTop: 25,
        textAlign: 'center'
    },
    topo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    subtitulo5: {
        fontSize: 50,
        color: '#026161',
        fontWeight: 'bold'
    },
    subtitulo4: {
        color: 'grey',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    subtitulo3: {
        color: '#007c7c',
        fontSize: 19,
        fontWeight: 'bold',
        alignContent: 'center',
    },
    entradaTexto: {
        color: '#004c4c',
        paddingHorizontal: 10,
        borderRadius: 30,
        width: 340,
        height: 50,
        backgroundColor: 'rgb(205,216,210)',
        marginVertical: 10,
        fontSize: 23,
        paddingLeft: 20
    },
    box_white: {
        alignContent: 'center',
        backgroundColor: 'white',
        height: 710,
        width: 460,
        borderTopLeftRadius: 130,
        alignItems: 'center',
        paddingTop: 30
    }
});

