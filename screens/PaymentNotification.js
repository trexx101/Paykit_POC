import React from 'react';
import { Modal, StyleSheet, Dimensions, FlatList, View , TouchableOpacity, TouchableHighlight, Alert, Image} from 'react-native';
import { Block, Text, theme, Input, Button, Accordion } from 'galio-framework';
import { Icon } from '../components/';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';


  

export default class PaymentNotification extends React.Component {

constructor (){
super()
this.state={
    isLoading: false,
    contact: "",
   
};
}



componentDidMount(){
    //console.log("NAVIGATOR: ", this.props.navigation)
 
}

    render(){
        const { navigation } = this.props;


        console.log("start payment to: "+this.props.navigation.state.params.payment.name);
        return (
            <View style={[styles.container]}>
                <Block style={[styles.mainForm]}>
                <Image source={require('../assets/icons/thumb_Alias.gif')} style={styles.logo} />
                    <Text style={{fontWeight:'bold', fontSize: 28}}> SUCCESS</Text>

                    
                        <Button onPress={() => this.props.navigation.navigate('Home')}>Home</Button>
                    
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
      width: '95%',
      paddingVertical: theme.SIZES.BASE,
  },
  contact_data: {
    alignItems:"center",

  },
  logo: {
    height: 60,
    width: 140,
    marginBottom: theme.SIZES.BASE,
    alignSelf: "center",
  },
  button: {
      alignSelf:"center",
  }
  
});
