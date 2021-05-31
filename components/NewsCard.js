import * as React from 'react';
import { View, Text,Button,FlatList,ActivityIndicator,Dimensions, ScrollView ,Image} from 'react-native';

const {height,width} = Dimensions.get('window')

function NewsCard(props) {
    return (
        <View style={{flexDirection:'row',padding:15}}>
            <View>
                <Image source={{uri:props.item.image}} style={{width:width/3.9,height:width/3.9,borderRadius:9}} />
            </View>
            <View style={{flex:1,paddingLeft:9}}>
                <Text style={{marginRight:width/11,fontSize:16,fontWeight:'bold',color:'black'}}>{props.item.title}</Text>
                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Text style={{color:'black'}}>{props.item.source}   <Text style={{color:'gray'}}>{props.item.time}</Text></Text>
                </View>
            </View>
        </View>
    )
}

export default NewsCard;