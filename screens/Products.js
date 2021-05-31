import * as React from 'react';
import axios from 'axios';
import { View,SafeAreaView, Text,Button,FlatList,ActivityIndicator,Dimensions,Image, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { max, min } from 'react-native-reanimated';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import NewsCard2 from '../components/NewsCard2';

const {height,width} = Dimensions.get('window')

function Products() {

    const apiKey = '9d66a7b407c8441fbb23025e4dcba4df';

    const [data,setData] = React.useState([])
    const [loading,setLoading] = React.useState(true)

    const [si,setSi] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const indexRef = React.useRef(index);
    indexRef.current = index;
    const onScroll = React.useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    console.log(event.nativeEvent,'eventtt')
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);
  
  const [sii,setSii] = React.useState(0);

  React.useEffect(() => {
    console.warn(index);
    setIndex(index);
    setSi(index)
  }, [index]);

    const fd = () => {
        setLoading(true);
        axios.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=9d66a7b407c8441fbb23025e4dcba4df')
        .then(response => {
            console.log(response.data)
            setData(response.data.articles)
            setLoading(false)
        })
    }

    React.useEffect(() => {
        //Check if user is logged in using a token
        //console.log(headerHeight)
        fd()
    },[])

    const scrollY = new Animated.Value(0);

    const headerHeight = scrollY.interpolate({
        inputRange:[0,45],
        outputRange:[0,-45],
        extrapolate:'clamp'
    })

    const finalHeight = scrollY.interpolate({
        inputRange:[0,45],
        outputRange:[45,0],
        extrapolate:'clamp'
    })

    const fl = [
        {
            name:'Trending',
        }, 
        {
            name:'Top Gainers'
        },
        {
            name:'Top Losers'
        }, {
            name:'All'
        },
        {
            name:'Trending',
        }, 
        {
            name:'Top Gainers'
        },
        {
            name:'Top Losers'
        }, {
            name:'All'
        }
    ]

    return (
        !loading ?
        <View style={{flex:1,marginBottom:55}}>
        <Animated.View style={{
            transform:[
                {translateY:min(headerHeight,0)},
            ],
            //marginTop:45
           //height:finalHeight,
           //position:'absolute',
           //zIndex:1
        }}>
            <View style={{height:45,justifyContent:'center',paddingLeft:15,backgroundColor:'white'}}>
         <Text style={{color:'black',fontSize:21,fontWeight:'bold'}}>Discover</Text>
         </View>
         <View style={{height:45,backgroundColor:'white',}}>
         <FlatList
         showsHorizontalScrollIndicator={false}
         data={fl}
         horizontal={true}
         renderItem={({item,index}) => (
             <TouchableOpacity onPress={() => setSii(index)}>
                 {
                     index===sii ?
                     <View style={{marginLeft:9,backgroundColor:'black',marginRight:5,alignItems:'center',borderWidth:1,justifyContent:'center',borderRadius:17.5,marginTop:5,marginBottom:5}}>
                 <Text style={{paddingLeft:9,paddingRight:9,color:'white',padding:5}}>{item.name}</Text>
            </View>:
            <View style={{marginLeft:9,marginRight:5,alignItems:'center',borderWidth:1,justifyContent:'center',borderRadius:17.5,marginTop:5,marginBottom:5}}>
            <Text style={{paddingLeft:9,paddingRight:9,padding:5,color:'black'}}>{item.name}</Text>
       </View>
                 }
                 </TouchableOpacity>

         )}
         />
         </View>
         <ScrollView style={{marginTop:0}} onScroll={(e) => {
        console.log(e.nativeEvent.contentOffset)
        scrollY.setValue(e.nativeEvent.contentOffset.y)}}
        scrollEventThrottle={16}
        >
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1,padding:9,paddingLeft:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon5 name="fire" size={29} color="#fc6d6d"/>
                        <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}> Trending</Text>
                    </View>
                    <Text>Popular & Breaking News</Text>
                </View>
                <View>
                    <Text style={{color:'#1da1f6',fontSize:19,marginRight:9,fontWeight:'bold',marginTop:11}}>See All</Text>
                </View>
            </View>
            <FlatList
                onScroll={onScroll}
                   //style={{width:width}}
                   showsHorizontalScrollIndicator={false}
                   pagingEnabled={true}
                   data={data}
                   horizontal={true}
                   renderItem={({item,index}) => (
                    <View style={{width:width,alignItems:'center',marginBottom:9,}}>
                    <View style={{elevation:5,backgroundColor:'white',borderBottomLeftRadius:15,borderBottomRightRadius:15,borderRadius:15}}>
                    <View>
                        <Image source={{uri:item.urlToImage}} style={{width:0.9*width,height:0.45*width,borderTopLeftRadius:15,borderTopRightRadius:15}} />
                    </View>
                    <View style={{width:0.9*width,padding:9,borderBottomWidth:0,}}>
                    <Text numberOfLines={2} style={{fontSize:18.5,fontWeight:'bold',color:'black'}}>{item.title}</Text>
                    <Text style={{fontWeight:'bold',marginTop:9,fontSize:15.9}}>{item.source.name}  </Text>
                    </View>
                        </View>
                </View>       
                       )
                   }
                   />
                   <View style={{justifyContent:'center',alignItems:'center'}}>
                   <FlatList
                        horizontal
                        data={data}
                        renderItem ={({item,index}) => 
                        index===si?
                        <View style={{height:5.5,width:5.5,backgroundColor:'#101010',borderRadius:2.75,margin:5}}>
                            </View> :
                            <View style={{height:5,width:5,backgroundColor:'grey',borderRadius:2.5,margin:5}}>
                                </View>
                    }
                        
                       />
                       <View style={{flexDirection:'row'}}>
                <View style={{flex:1,padding:9,paddingLeft:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon5 name="bitcoin" size={29} color="#fc6d6d"/>
                        <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}> Bitcoin</Text>
                    </View>
                    <Text>Based on Market Ratings</Text>
                </View>
                <View>
                    <Text style={{color:'#1da1f6',fontSize:19,marginRight:9,fontWeight:'bold',marginTop:11}}>See All</Text>
                </View>
            </View>
                       
                       </View>
                       <FlatList
            data={data}
            renderItem={({item,index}) => <NewsCard2 item={item} />} /> 
        </ScrollView>
        </Animated.View>
    </View> :
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator color="black" size="large" />
    </View>
    )
}

export default Products;