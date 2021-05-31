import * as React from 'react';
import { View, Text,AsyncStorage } from 'react-native';

function LoadingScreen(props) {

    const check = async() => {
        const uid = await AsyncStorage.getItem('uid')
        const email = await AsyncStorage.getItem('email')
        console.log(email,uid)
        if(email===null){
            props.navigation.replace("Signup")
        }
        if(email.length >0 && uid.length> 0){
            props.navigation.replace("MainNav",{screen:'Main',screen:'Home'})
        } else {
            props.navigation.replace("Signup")
        }
    }

    React.useEffect(() => {
        //Check if user is logged in using a token
        //props.navigation.replace("MainNav",{screen:'Main',screen:'Home'})
        setTimeout(() => {
            check()
        }, 1500);
    },[])

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#6495ed'}}>
            <Text style={{fontSize:29,color:'white',fontWeight:'bold'}}>Coin Market Cap</Text>
        </View>
    )
}

export default LoadingScreen;