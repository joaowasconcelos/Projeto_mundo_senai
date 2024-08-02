import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

import ConsultasPaciente from './src/pages/ConsultasPaciente';
import Contato from './src/pages/Contato';
import DadosPaciente from './src/pages/DadosPaciente';
import Login from './src/pages/Login';
import ConsultasMedico from './src/pages/ConsultasMedico';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          tabBarStyle: {
            display: 'none'
          },
          headerShown: false,
          headerTintColor: '#fafafa',
          headerStyle: {
            backgroundColor: '#243434'
          },
        }}
      />
      <Stack.Screen
        name="PacienteTab"
        component={PacienteTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MedicoTab"
        component={MedicoTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function PacienteTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fafafa',
        tabBarInactiveTintColor: '#c3c3c3',
        tabBarStyle: {
          backgroundColor: '#243434',
        },
      }}
    >
      <Tab.Screen
        name='ConsultasPaciente'
        component={ConsultasPaciente}
        options={{
          title: 'ConsultasPaciente',
          headerStyle: {
            backgroundColor: '#b4c4bc',
          },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='id-card' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DadosPaciente"
        component={DadosPaciente}
        options={{
          tabBarStyle: {
            display: 'none'
          },
          title: 'Dados',
          headerTintColor: '#fafafa',
          headerStyle: {
            backgroundColor: '#243434'
          },
        }}
      />
      <Tab.Screen
        name='Contato'
        component={Contato}
        options={{
          title: 'Contato',
          headerTintColor: '#053c20',
          headerStyle: {
            backgroundColor: '#b4c4bc',
          },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='phone' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MedicoTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fafafa',
        tabBarInactiveTintColor: '#c3c3c3',
        tabBarStyle: {
          backgroundColor: '#243434',
        },
      }}
    >
      <Tab.Screen
        name='ConsultasMedico'
        component={ConsultasMedico}
        options={{
          title: 'Próximas consultas',
          headerStyle: {
            backgroundColor: '#b4c4bc',
          },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='id-card' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DadosPaciente"
        component={DadosPaciente}
        options={{
          tabBarStyle: {
            display: 'none'
          },
          title: 'Dados',
          headerTintColor: '#fafafa',
          headerStyle: {
            backgroundColor: '#243434'
          },
        }}
      />
      <Tab.Screen
        name='Contato'
        component={Contato}
        options={{
          title: 'Contato',
          headerTintColor: '#053c20',
          headerStyle: {
            backgroundColor: '#b4c4bc',
          },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='phone' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
