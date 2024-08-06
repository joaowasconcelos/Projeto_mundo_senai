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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
    
          <Stack.Screen
            name="Home"
            component={MainTabs}
            options={{ headerShown: false }}
          />
    
          <Stack.Screen
            name="ConsultasPaciente"
            component={ConsultasPaciente}
           
          />
    
          <Stack.Screen
            name="ConsultasMedico"
            component={ConsultasMedico}
          />
        </Stack.Navigator>
      );
}