import React from 'react';
import { Modal, StyleSheet, ActivityIndicator, Dimensions, FlatList, View , TouchableOpacity, TouchableHighlight, Alert, Image} from 'react-native';
import { Block, Text, theme, Input, Button } from 'galio-framework';
import { Icon, boApp } from '../components/';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import axios from 'axios';
import qs from 'qs'
  

export default class Pay extends React.Component {

constructor (){
super()
this.state={
    isLoading: false,
    contacts: [],
    modalVisible: false,
    activeName:"",
    activeNumber:"",
    payIDactive:false,
    paymentData:{}
};
}

loadContacts = async()=>{
    const permission = await Permissions.askAsync(
        Permissions.CONTACTS
    )
    if(permission.status !== 'granted')
    {
        return;
    }
    const {data} = await Contacts.getContactsAsync({
        fields: [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails ]
    })

    //console.log(data);
    this.setState({ contacts:data, inMemoryContacts:data, isLoading:false })
}

searchContacts = (value) => {
    const filteredContacts = this.state.inMemoryContacts.filter(
        contact => {
            let contactLower = (contact.firstName + " "+ contact.lastName).toLowerCase();
            let searchTxtLower = value.toLowerCase();

            return contactLower.indexOf(searchTxtLower) > -1
        }
    );
    this.setState({contacts: filteredContacts});
}


payIDModal = async (item) => {
    let responsecode = "";
     
    if(item.phoneNumbers !== undefined ) {
        let fullName = (item.firstName + " " + item.lastName).toUpperCase();
        let phoneNumber = item.phoneNumbers[0].number;
        console.log("Selected contact "+fullName);
        if (fullName=="JAMES SMITH"){
            phoneNumber = "00612 5550 4516";
        }
        
        console.log("perform alias lookup");
        const url = 'http://192.168.43.29:8080/aunpp/boapp/aliasresolution';
        const data = { 'type': 'TELI', 'value': phoneNumber };
        const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url
        };
        const response = await axios(options).then(function (response) {
            console.log("Alias = "+response.data+" Code: "+response.status);
            responsecode = response.status;
            responseAlias = response.data;

          }).catch(function (error) {
            if (error.response) {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.status);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
        });

        
    
        if (responsecode !== 200 ){
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
            let payData = {
                "name": fullName,
                "payID": responseAlias,
                "phoneNumber": item.phoneNumbers[0].number
            };
            this.setState({
                modalVisible: true,
                activeNumber: item.phoneNumbers[0].number,
                activeName: fullName,
                payIDactive: true,
                paymentData: payData
            });
            console.log("phone number=> "+item.phoneNumbers[0].number)
        }
    }
    else {
        console.log("Bad contact list, pls clean your phone")
        console.log(item)
    }
}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
}

//close the modal screen and hope to a prefered screen
toggleModalAndHop(screenName) {
    let payment = {
        name: this.state.paymentData.name,
        payid: this.state.paymentData.payID,
        number: this.state.paymentData.phoneNumber,
        
       };
    this.setState({modalVisible: !this.state.modalVisible });
    console.log("name:: "+this.state.paymentData.name+" payid:: "+this.state.paymentData.payID+" number:: "+this.state.paymentData.phoneNumber)
    if (screenName && screenName != '') {
       this.props.navigation.navigate(screenName, { payment });
       
    }
  } 

async componentDidMount(){
    this.setState({isLoading:true})
    this.loadContacts();
}

renderItem = ({item}) =>(
    <TouchableOpacity onPress={() => this.payIDModal(item)}>
        <View style={{minHeight:70, padding:5}}>
            <Text style={{color:'#bad555', fontWeight:'bold', fontSize:26}}>
                {item.firstName + ' '}{item.lastName}
            </Text>
            <Text style={{color:'#FFFFFF', fontWeight:'bold'}}>{item.phoneNumbers ? item.phoneNumbers[0].number : 'null'}</Text>
        </View>
    </TouchableOpacity>
)

    render(){
    //very import to bring the navigationStack context
    const { navigation } = this.props;

        return (
            <View style={[styles.main, this.state.modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        placeholder="Search contacts"
                        onChangeText={(value) => this.searchContacts(value)}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ 
                            borderRadius: 3, 
                            borderColor: materialTheme.COLORS.INPUT,
                            backgroundColor: '#2f363c', 
                            fontSize:30,
                            paddingTop: 10,
                            height: 50,
                        }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="search" family="font-awesome" />}
                    />
                </Block>
                
                <View style={{ flex:1, backgroundColor:'#2f363c'}}>
                    {this.state.isLoading ? (
                        <View style={{
                        ...StyleSheet.absoluteFill,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color="#bad555" />
                    </View>
                    ) : null }

                    <FlatList 
                    data={this.state.contacts}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index)=>index.toString()}
                    ListEmptyComponent={()=> (
                    <View style={{flex:1, alignItems:"center", marginTop:50}}>
                        <Text style={{color: '#bad555'}}>No Contacts Found</Text>
                    </View>
                    )}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(false); } }>
                    <View style={styles.modalWindow}>
                    {this.state.payIDactive ? (
                    <Block style={{flex:1}}>
                            <Image source={require('../assets/icons/thumb_Alias.gif')} style={styles.avatar} />
                            <Text style={{padding:10, fontSize:24}}>{this.state.activeName} has Registered {this.state.activeNumber} as an Alias</Text>
                            <Button 
                            color='transparent'
                            onPress={() => this.toggleModalAndHop('Transfer')}
                            style={styles.button}
                            >Proceed</Button>
                            <Button
                            style={styles.button}
                            color='transparent'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            Cancel
                            </Button>
                    </Block>
                        ) : (
                            <Block style={{flex:1}}>
                            <Image source={require('../assets/icons/thumb_Alias.gif')} style={styles.avatar} />
                            <Text style={{padding:10, fontSize:24}}>{this.state.activeName} has not been Registered {this.state.activeNumber} as an Alias</Text>
                            <Button 
                            disabled
                            shadowless
                            color='transparent' style={styles.button}
                            onPress={() => navigation.navigate('Transfer')}
                            >Proceed</Button>
                            <Button
                            
                            style={styles.button}
                            color='transparent'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            Cancel
                            </Button>
                        </Block>
                        )}
                        
                    </View>
                </Modal>
            </View>
        );
    }

    }
    

const styles = StyleSheet.create({
  container: {
      flex:1,
    backgroundColor: theme.COLORS.BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
      flex:1,
  },
  avatar: {
    height: 60,
    width: 140,
    marginBottom: theme.SIZES.BASE,
    alignSelf: "center",
    marginTop:5
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
