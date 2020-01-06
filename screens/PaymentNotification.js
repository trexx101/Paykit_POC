import React from 'react';
import { Modal, StyleSheet, ActivityIndicator, Dimensions, FlatList, View , TouchableOpacity, TouchableHighlight, Alert, Image} from 'react-native';
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
        const conName = this.props.navigation.state.params.payment.name;
        const payid = this.props.navigation.state.params.payment.payid;
        const phone = this.props.navigation.state.params.payment.number;

        

        const data = [
            { title: "First Chapter", content: "Lorem ipsum dolor sit amet", 
              icon: {
                name: 'keyboard-arrow-up',
                family: 'material',
                size: 16,
              } 
           },
            { title: "2nd Chapter", content: "Lorem ipsum dolor sit amet" },
            { title: "3rd Chapter", content: "Lorem ipsum dolor sit amet" }
          ];

        console.log("start payment to: "+this.props.navigation.state.params.payment.name);
        return (
            <View style={[styles.container]}>
                <Block style={[styles.mainForm]}>
                    <Image source={require('../assets/icons/payid_sec.png')} style={styles.logo} />

                    <Block style={{ height: 200 }}>
                        <Accordion dataArray={data} />
                    </Block>
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
