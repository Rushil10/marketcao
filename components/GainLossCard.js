import * as React from 'react';
import { View, Text,Button,FlatList,ActivityIndicator,Dimensions, ScrollView ,Image} from 'react-native';

const {height,width} = Dimensions.get('window')

function GainLossCard(props) {
    return (
        <View style={{width:width/2.75+5,marginBottom:5,paddingTop:9,paddingBottom:9,borderRadius:9,elevation:2.5,marginLeft:15,marginTop:5,backgroundColor:'white',paddingLeft:9,paddingRight:5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('./bitcoin.jpg')} style={{height:width/9,width:width/9,borderRadius:width/18,marginRight:2.5}} />
                <Text>Graph Image</Text>
            </View>
            <Text style={{fontSize:19,color:'black',fontWeight:'bold',paddingTop:2.5}}>Bitcoin</Text>
            <Text style={{fontWeight:'bold'}}>0.000089 B</Text>
            <Text>2.27%</Text>
        </View>
    )
}

export default GainLossCard;