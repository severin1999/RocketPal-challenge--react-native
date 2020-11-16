import React, { useContext } from 'react'
import { ScrollView, Text, View, Linking, Alert } from "react-native"
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { AppContext } from '../context/AppContext'

export const ResultScreen = () => {
    const context = useContext(AppContext)
    const data = context.userData

    const openUrlHandler = async url => {
        const fullUrl = `https://github.com/${url}`
        const supported = await Linking.canOpenURL(fullUrl)

        supported ? await Linking.openURL(fullUrl) : Alert.alert('Sorry, this link cannot be reached')
    }

    const dataSorted = []  
    if (data) {
        data.map(repo => {
            const {name = '', stargazers_count = '', full_name = '', language = '', created_at = ''} = repo
            dataSorted.push({name, stargazers_count, full_name, language, created_at})
        })
    }
    dataSorted.sort((a, b) => b.stargazers_count - a.stargazers_count)

    return (data &&
        <ScrollView>
            {dataSorted.map((repo, index) => (index <= 9 &&
                <Card title={repo.name}>
                    <Text style={{marginBottom: 10, fontSize: 15, padding: 20}}>
                        Mostly a {repo.language} project with {repo.stargazers_count} stars
                    </Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text>Created at:</Text> 
                            <Text style={{fontWeight: 'bold'}}>{moment(repo.created_at).fromNow()}</Text>
                        </View>
                        <Button
                            icon={
                                <Icon name='external-link' color='#ffffff' style={{paddingRight: 20}} />
                            }
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, width: 150}}
                            title='Go to project'
                            onPress={() => openUrlHandler(repo.full_name)}
                        />
                    </View>
                </Card>
            ))}
        </ScrollView>
    )
}