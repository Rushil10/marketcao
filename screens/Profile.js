import * as React from 'react';
import { View, Text,AsyncStorage ,ActivityIndicator,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import axios from 'axios';

const {height,width} = Dimensions.get('window')

function Profile(props) {

    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(false);
    const [email,setEmail] = React.useState('')
    const [uid,setUid] = React.useState('')

    const getDetails = async() => {
        const email = await AsyncStorage.getItem('email');
        const uid = await AsyncStorage.getItem('uid')
        setEmail(email)
        setUid(uid)
        setLoading(false);
    }

    React.useEffect(() => {
        getDetails();
    },[])

    const signout = async() => {
        setLoading2(true);
        await AsyncStorage.setItem('email', '')
        await AsyncStorage.setItem('uid', '')
        setLoading2(false)
        props.navigation.replace("Signin")
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {
                !loading ?
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:19,width:width-15}}>Email :   {email}</Text>
                    <Text></Text>
                <Text style={{fontSize:19,width:width-15}}>
                    Uid : {uid}
                </Text>
                <TouchableOpacity onPress={signout} style={styles.button}>
                <View style={styles.look}>
                    {
                        !loading2 ?
                        <Text style={{fontSize:19,color:'white'}}>SignOut</Text>
                        :
                        <ActivityIndicator size="large" color="white" />
                    }
                </View>
            </TouchableOpacity>
                    </View>
                :
                <ActivityIndicator color="blue" size="large" />
            }
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

export default Profile;