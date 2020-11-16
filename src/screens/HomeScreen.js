import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, Keyboard } from 'react-native'
import { AppContext } from '../context/AppContext'
import { useHttp } from '../hooks/http.hook'

export const HomeScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const context = useContext(AppContext)
    const { request, loading } = useHttp()

    const searchHandler = async () => {
        if (!username) return Alert.alert('Please write the username')
        
        const data = await request(username)
        setUsername('')
        context.fetchedData(data)
        Keyboard.dismiss()

        if (!loading) navigation.navigate('ResultScreen')
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Find user's most successful repository on GitHub</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input} 
                    value={username} 
                    placeholder='Username' 
                    placeholderTextColor='#fff'
                    onChangeText={event => setUsername(event.trim())} 
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={searchHandler} disabled={loading}>
                    <Text style={styles.text}>GET</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        justifyContent: 'space-evenly'
    },
    container: {
        width: '100%',
        alignItems: 'center'
    },
    input: {
        justifyContent: 'center',
        width: '80%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab',
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        
    },
    title: {
        fontFamily: "sans-serif-condensed",
        fontSize: 30,
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff'
    },
    button: {
        height: 50, 
        backgroundColor: '#3949ab',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        elevation: 5,
        width: '50%',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
})