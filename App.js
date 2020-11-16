import React, { useState } from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Switch } from 'react-native'
import { useApp } from './src/hooks/app.hook'
import { AppContext } from './src/context/AppContext'
import { HomeScreen } from './src/screens/HomeScreen'
import { ResultScreen } from './src/screens/ResultScreen'

export default function App() {

  const Stack = createStackNavigator()
  const { fetchedData, userData, clearData } = useApp()
  const [darkTheme, setDarkTheme] = useState(false)
  const toggleSwitch = () => setDarkTheme(prevState => !prevState)

  const ToggleSwitcher = () => (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={darkTheme ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={darkTheme}
    />
  )

  return (
    <AppContext.Provider value={{ userData, fetchedData, clearData }}>
      <NavigationContainer theme={darkTheme ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen 
            name='HomeScreen' 
            component={HomeScreen} 
            options={{
              headerRight: () => ToggleSwitcher(),
              title: 'Welcome to Repositories finder',
            }}
          />
          <Stack.Screen 
            name='ResultScreen' 
            component={ResultScreen} 
            options={{
              headerRight: () => ToggleSwitcher(),
              title: 'Back to Home'
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}