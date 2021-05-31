import * as React from 'react';
import { View, Text,Button,FlatList,ActivityIndicator,Dimensions, ScrollView ,Image} from 'react-native';

const {height,width} = Dimensions.get('window')

function NewsCard2(props) {
    console.log(props)
    return (
        <View style={{flexDirection:'row',padding:15}}>
            <View>
                <Image source={{uri:props.item.urlToImage}} style={{width:width/3.9,height:width/3.9,borderRadius:9}} />
            </View>
            <View style={{flex:1,paddingLeft:9}}>
                <Text style={{marginRight:width/11,fontSize:16,fontWeight:'bold',color:'black'}}>{props.item.title}</Text>
            </View>
        </View>
    )
}

export default NewsCard2;