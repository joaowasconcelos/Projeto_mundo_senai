import React, { useState } from 'react';
import { Button, Pressable, Modal, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const logo = require('../../../assets/logo_medical.png');
import api from '../../service/api';

const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [userType, setUserType] = useState('');

    const navigation = useNavigation();

    const getLogin = async () => {
        try {
            const response = await api.post('/Login/mobileEntrar', { login, senha });
            setMessage(response.data.message);

            if (response.data.user.tipo.includes("paciente, medico") || response.data.user.tipo.includes("medico, paciente")) {
                setUserType(response.data.user.tipo);
                setModalVisible(true);
            } else {
                redirectUser(response.data.tipo, response.data);
            }
        } catch (error) {
            console.error(error);
            setMessage('Erro ao conectar a API.');
        }
    };

    const redirectUser = (type, data) => {
        if (type === 'medico') {
            navigation.navigate('MedicoTab', { id: data.id });
        } else if (type === 'paciente') {
            navigation.navigate('PacienteTab', { id: data.user });
        }
    };

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

                        {message ? <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b20000' }}>{message}</Text> : null}

                        <TextInput
                            placeholder='Digite seu C.P.F.'
                            style={styles.entradaTexto}
                            value={login}
                            onChangeText={setLogin}
                        />

                        <TextInput
                            placeholder='Digite sua senha'
                            secureTextEntry={true}
                            style={styles.entradaTexto}
                            value={senha}
                            onChangeText={setSenha}
                        />

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
                            onPress={getLogin}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 25, letterSpacing: 5, fontWeight: 'bold', color: '#fafafa' }}>Logar</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Escolha seu tipo de acesso</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                redirectUser('paciente', { user: login });
                            }}
                        >
                            <Text style={styles.textStyle}>Paciente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                redirectUser('medico', { id: login });
                            }}
                        >
                            <Text style={styles.textStyle}>Médico</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

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
    },
    modalView: {
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        justifyContent:'center',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width:200,
        height:50
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        fontSize:15,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
