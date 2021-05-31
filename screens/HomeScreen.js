import axios from 'axios';
import * as React from 'react';
import { View, Text,Button,FlatList,ActivityIndicator,Dimensions,Image, ScrollView } from 'react-native';
import Animated, { min } from 'react-native-reanimated';
import Card from '../components/Card';
import GainLossCard from '../components/GainLossCard';
import NewsCard from '../components/NewsCard';
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'

const {height,width} = Dimensions.get('window')

function HomeScreen() {

    const [val,setVal] = React.useState(0)
    const [data,setData] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const scrollY = new Animated.Value(0);

    const translateY = scrollY.interpolate({
        inputRange:[0,height/12.5],
        outputRange:[-height/12.5,0]
    })

    const getData = async() => {
        setLoading(true)
        axios.get('https://test.extensionceramics.com/api/method/erpnext.accounts.doctype.purchase_invoice.purchase_invoice.tally_integration')
        .then(function(res) {
            console.log(res.data.message)
            setData(res.data.message)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    React.useEffect(() => {
        //Check if user is logged in using a token
        getData()
    },[])

    const four = [
        {
            title:'Price Alerts',
        },
        {
            title:'Compare',
        },
        {
            title:'Convert',
        },
        {
            title:'WatchList',
        },
    ]

    const news = [
        {
            title:'Bitcoin whales have Accumulated 30k BTC Between $31k and $40k',
            source:'Ethereum World News',
            time:'1h ago',
            image:'https://miro.medium.com/max/960/1*ee_KTAHKtO4tNdqnDyHadQ.png'
        },
        {
            title:'MicroStarategy Ceo Bitcoin is best way to save money',
            source:'Ethereum World News',
            time:'1h ago',
            image:'https://static.coindesk.com/wp-content/uploads/2020/09/GettyImages-159806927.jpeg'
        },
        {
            title:'MicroStarategy Ceo Bitcoin is best way to save money',
            source:'Ethereum World News',
            time:'1h ago',
            image:'https://static.coindesk.com/wp-content/uploads/2020/09/GettyImages-159806927.jpeg'
        },
    ]

    return (
        <View style={{flex:1,backgroundColor:'#fdfcfa'}}>
            {
                !loading ?
                <View>
                <Animated.View style={{
                    transform:[{
                        translateY:min(translateY,0)
                    }],
                    position:'absolute',
                    zIndex:1
                }}>
                    <View style={{height:height/12.5,flexDirection:'row',backgroundColor:'white',width:width,alignItems:'center',paddingLeft:15}}>
                        <Text style={{fontSize:19,color:'black',fontWeight:'bold',flex:1}}>Home</Text>
                        <Icon name="search" color='gray' size={35} style={{marginRight:5}} />
                            <Icon name="bell" color='gray' size={35} style={{marginRight:5}}/>
                    </View>
                </Animated.View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={(e) => {
                    console.log(e.nativeEvent)
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}>
                <View style={{backgroundColor:'black',width:width}}>
                        <View style={{flexDirection:'row',backgroundColor:'black',height:height/12.5,alignItems:'center',paddingLeft:9}}>
                            <Text style={{fontSize:19,color:'white',fontWeight:'700',flex:1}}>CoinMarketCap</Text>
                            <Icon name="search" color='gray' size={35} style={{marginRight:5}} />
                            <Icon name="bell" color='gray' size={35} style={{marginRight:5}}/>
                        </View>
                        <View style={{height:height/19,backgroundColor:'#1e90ff',borderTopLeftRadius:25,borderTopRightRadius:25}}>
                        </View>
                </View>
                <View style={{paddingTop:25,paddingBottom:8}}>
                <FlatList
                numColumns={2}
                data={four}
                columnWrapperStyle={{
                    flex:1,
                    justifyContent:'space-around'
                }}
                renderItem={({item,index}) =>(
                    <View style={{backgroundColor:'black',alignItems:'center',flexDirection:'row',width:width/2-25,padding:15,backgroundColor:'white', marginBottom:11,borderRadius:9}}>
                        <Icon2 name="bitcoin" size={29} color="#1da1f2" style={{marginRight:5}} />
                        <Text style={{color:'black',fontSize:16.9,fontWeight:'bold'}}>{item.title}</Text>
                    </View>
                )
             }
                />
                </View>
                <View style={{ backgroundColor:'white',paddingLeft:15}}>
                    <View style={{paddingTop:5,paddingBottom:2.5,flexDirection:'row',backgroundColor:'white'}}>
                        <Text style={{fontSize:21,color:'black',fontWeight:'bold',flex:1}}>Gainers & Losers</Text>
                        <Text style={{color:'#1da1f2',paddingRight:9,fontSize:16.5,fontWeight:'bold'}}>See All</Text>
                    </View>
                    <Text style={{fontSize:14.15,color:'gray'}}>Based on Top 100 coins</Text>
                </View>
                <FlatList
                data={four}
                //style={{paddingBottom:5}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index}) => <GainLossCard item={item} /> }
                />
                 <View style={{ backgroundColor:'white',paddingLeft:15,marginTop:5}}>
                    <View style={{paddingTop:5,paddingBottom:2.5,flexDirection:'row',backgroundColor:'white'}}>
                        <Text style={{fontSize:21,color:'black',fontWeight:'bold',flex:1}}>News</Text>
                        <Text style={{color:'#1da1f2',paddingRight:9,fontSize:16.5,fontWeight:'bold'}}>See All</Text>
                    </View>
                    <View>
                        <FlatList
                        data={news}
                        renderItem={({item,index}) => <NewsCard item={item} />}
                        /> 
                    </View>
                </View>
                    </ScrollView>
                    </View>
                :
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            }
        </View>
    )
}

export default HomeScreen;