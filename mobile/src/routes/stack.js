import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../pages/Home'
import Detalhes from '../pages/Detalhes'

const Stack = createNativeStackNavigator();

export default function bottonROutes() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DadosPaciente"
            component={DadosPaciente}
            options={{
              title: 'Dados',
              headerTintColor: '#fafafa',
              headerStyle: {
                backgroundColor: '#243434'
              },
            }}
          />
        </Stack.Navigator>
    )
}