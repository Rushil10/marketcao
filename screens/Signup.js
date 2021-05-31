import * as React from 'react';
import { View, Text,TextInput,Button, Dimensions,StyleSheet,AsyncStorage, TouchableOpacity,ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const {height,width} = Dimensions.get('window');

function SignupScreen(props) {

    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [error,setError] = React.useState('');
    const [loading,setLoading] = React.useState(false)

    const Signup = async() => {
        setLoading(true);
        try {
            auth().createUserWithEmailAndPassword(email, password)
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
            <Text style={styles.significant}>SignUp</Text>
            <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(val) => setEmail(val)} />
            <TextInput style={styles.input} value={password} placeholder="Password" onChangeText={(val) => setPassword(val)} />
            {
                error.length>0 &&
                <Text style={{marginTop:9,fontSize:15,color:'red'}}>{error}</Text>
            }
            <TouchableOpacity onPress={Signup} style={styles.button}>
                <View style={styles.look}>
                    {
                        !loading ?
                        <Text style={{fontSize:19,color:'white'}}>Sign Me Up</Text>
                        :
                        <ActivityIndicator size="large" color="white" />
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.replace("Signin")} style={{marginTop:25}}>
                <Text style={{fontSize:15}}>Already have an account ? Login</Text>
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

export default SignupScreen;