import * as React from 'react';
import { View, Text,TextInput,Button, Dimensions,StyleSheet,AsyncStorage, TouchableOpacity,ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const {height,width} = Dimensions.get('window');

function SignInScreen(props) {

    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [error,setError] = React.useState('');
    const [loading,setLoading] = React.useState(false)

    const Signin = async() => {
        setLoading(true);
        try {
            auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response)
                AsyncStorage.setItem('email',email)
                AsyncStorage.setItem('uid',response.user.uid)
                setLoading(false)
                props.navigation.replace("MainNav",{screen:'Main',screen:'Home'})
            })
            .catch(error => {
                setLoading(false)
                console.log(error.message)
                setError(error.message.split(' ')[0])
            })
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.significant}>SignIn</Text>
            <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(val) => setEmail(val)} />
            <TextInput style={styles.input} value={password} placeholder="Password" onChangeText={(val) => setPassword(val)} />
            {
                error.length>0 &&
                <Text style={{marginTop:9,fontSize:15,color:'red'}}>{error}</Text>
            }
            <TouchableOpacity onPress={Signin} style={styles.button}>
                <View style={styles.look}>
                    {
                        !loading ?
                        <Text style={{fontSize:19,color:'white'}}>Sign In</Text>
                        :
                        <ActivityIndicator size="large" color="white" />
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.replace("Signup")} style={{marginTop:25}}>
                <Text style={{fontSize:15}}>Don't have an account ? Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.replace("MainNav",{screen:'Main',screen:'Home'})} style={{marginTop:25}}>
                <Text style={{fontSize:15,color:'black'}}>Skip For Now</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        width:width-25,
        borderWidth:1,
        fontSize:19,
        paddingLeft:9,
        borderRadius:9,
        color:'#6495ed',
        borderColor:'gray',
        marginTop:15
    },
    button: {
        marginTop:25
    },
    look: {
        width:width-75,
        borderWidth:1,
        alignItems:'center',
        height:45,
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:'#6495ed'
    },
    significant:{
        color:'#6495ed',
        fontSize:41,
        marginBottom:25
    }
})

export default SignInScreen;