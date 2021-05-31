import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';

function Card(props) {

    return (
        <View style={{margin:5,padding:9,marginBottom:9,elevation:5,backgroundColor:'white',borderRadius:15,borderWidth:0.5,borderColor:'blue'}} >
            <Text style={styles.header}>Purchase Invoice Number : </Text>
            <Text style={{fontSize:19,marginBottom:5,color:'#6495ed'}}>{props.item.purchase_invoice_no}</Text>
            <Text style={styles.header}>Cost :   <Text style={styles.main}>{props.item.cost}</Text></Text>
            <Text style={styles.header}>Supplier :    <Text style={styles.main}>{props.item.supplier}</Text></Text>
            <Text style={styles.header}>Suuplier Name :   <Text style={styles.main}>{props.item.supplier_name}</Text></Text>
            <Text style={styles.header}>Credit To :   <Text style={styles.main}>{props.item.credit_to}</Text></Text>
            <Text style={styles.header}>Against Expense Account : </Text>
            <Text style={styles.main}>{props.item.against_expense_account}</Text>
            <Text style={styles.header}>Posting Date :   <Text style={styles.main}>{props.item.posting_date}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        color:'gray',
        fontSize:19
    },
    main:{
        fontSize:19,
        color:'#6495ed'
    }
})

export default Card;