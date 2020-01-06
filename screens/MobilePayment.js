import React from 'react';
import { Modal, StyleSheet, ActivityIndicator, Dimensions, FlatList, View , TouchableOpacity, TouchableHighlight, Alert, Image} from 'react-native';
import { Block, Text, theme, Input, Button } from 'galio-framework';
import { Icon, boApp } from '../components/';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
  

export default class MobilePayments extends React.Component {

constructor (){
super()
this.state={
    isLoading: false,
    contact: "",
   
};
}

startPayment = async () => {
    const response = await boApp.post('/credittransfer', {
        params: {
            name: 'James Smith',
            amount: 1200.10
        }
    }).catch(function (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
    });
    
}

payContact = (item) => {
    
    if(item.phoneNumbers !== undefined ) {
        let fullName = (item.firstName+ " "+item.lastName).toUpperCase();
        console.log("Selected contact "+fullName)
        
    
        if (item.phoneNumbers[0].number.toString().endsWith(5)){
            console.log("contact doesnt not have PayID")
            this.setState({
                modalVisible: true,
                activeNumber: item.phoneNumbers[0].number,
                activeName: fullName,
                payIDactive: false
            });
        }
        else {
            //set payid to active
            this.setState({
                modalVisible: true,
                activeNumber: item.phoneNumbers[0].number,
                activeName: fullName,
                payIDactive: true
            });
            console.log("phone number=> "+item.phoneNumbers[0].number)
        }
    }
    else {
        console.log("Bad contact list, pls clean your phone")
        console.log(item);
    }
}

componentDidMount(){
    //console.log("NAVIGATOR: ", this.props.navigation)
    

}


    render(){
        const { navigation } = this.props;
        const conName = this.props.navigation.state.params.payment.name;
        const payid = this.props.navigation.state.params.payment.payid;
        const phone = this.props.navigation.state.params.payment.number;

        

        console.log("start payment to: "+this.props.navigation.state.params.payment.name);
        return (
            <View style={[styles.container]}>
                <Block style={[styles.mainForm]}>
                    <Image source={require('../assets/icons/thumb_Alias.gif')} style={styles.logo} />
                    <Block style={styles.contact_data}>
                        <Text style={{ fontWeight: "bold", fontSize: 24}}>{conName}</Text>
                        <Text>({payid})</Text>
                        <Text>{phone}</Text>
                    </Block>
                    
                    
                    <Block>
                        <Input
                        label="Amount"
                        type="number-pad"
                        placeholder="amount"/>
                    </Block>
                    <Block>
                        <Input
                        label="Description"
                        type="default"
                        placeholder="description"/>
                    </Block>
                    <Button
                    shadowless
                    style={styles.button}
                    onPress={() => this.startPayment()}
                    color='#FDD841'>
                        Pay
                    </Button>
                </Block> 
            </View>
        );
    }

    }
    

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#EEEEEE",
  },
  mainForm:{
      flex:1,
    
    paddingVertical: theme.SIZES.BASE,
  },
  contact_data: {
    alignItems:"center",

  },
  logo: {
    height: 60,
    width: 120,
    marginBottom: theme.SIZES.BASE,
    alignSelf: "center",
  },
  button: {
      alignSelf:"center",
  }
  
});
