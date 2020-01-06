import React from 'react';
import { Modal, StyleSheet, ActivityIndicator, Dimensions, FlatList, View , TouchableOpacity, ScrollView, Alert, Image} from 'react-native';
import { Block, Text, theme, Input, Button } from 'galio-framework';
import qs from 'qs';
import axios from 'axios';
import { Icon, boApp } from '../components/';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
  

export default class MobilePayments extends React.Component {

constructor (){
super()
this.state={
    isLoading: false,
    amount:"",
    desc:"",
    modalVisible: false,
};

this.handleAmountChange = this.handleAmountChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleAmountChange(amount) {
    this.setState({ amount });
  }

  async handleSubmit() {
    const url = 'http://192.168.43.29:8080/aunpp/boapp/credittransfer';
    const data = { 'name': 'James Smith', 'amount': this.state.amount };
    const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url
    };
    const response = await axios(options).
    then(response => {
        console.log("reply = "+response.data+" Code: "+response.status);
        responsecode = response.status;
        responseAlias = response.data;
        //if (response.code == '200'){
            console.log("Successful transfer");
            let payment = {
                amount: this.state.amount,
                name: "James Smith",
                
               };
            this.props.navigation.navigate('Notification', { payment });
		//}

      }).catch(error => {
        if (error.response) {

          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.status);
          console.log("reason = "+error.response.data+" Code: "+error.response.status);
          this.setState({
            modalVisible: true
        });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
    });

}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
}

componentDidMount(){

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
                        placeholder="amount"
                        value={this.state.amount}
                        onChangeText={this.handleAmountChange}
                        color="#FDD841"/>
                    </Block>
                    <Block>
                        <Input
                        label="Description"
                        type="default"
                        placeholder="description"
                        value={this.state.name}
                        color="#FDD841"/>
                    </Block>
                    <Button
                    shadowless
                    style={styles.button}
                    onPress={this.handleSubmit}
                    color='#FDD841'>
                        Pay
                    </Button>
                </Block> 
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(false); } }>
                        <ScrollView>
                        <View style={styles.modalWindow}>
                            <Text style={{ fontWeight: "bold", fontSize: 24}}>Trx failed, invalid amount</Text>
                            <Text>...</Text>

                            <Button
                            style={styles.button}
                            color='transparent'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            Cancel
                            </Button>
                        </View>
                        </ScrollView>
                    </Modal>
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
    width: 140,
    marginBottom: theme.SIZES.BASE,
    alignSelf: "center",
  },
  button: {
      alignSelf:"center",
  },
  button: {
    alignSelf:"center",
    marginBottom:5
},
modalWindow: {
  marginTop: 200,
  height: '43%',
  width: '96%',  
  backgroundColor:'#808080', 
  alignSelf:'center',
  borderRadius:5,
  marginHorizontal: 5,
}
  
});
