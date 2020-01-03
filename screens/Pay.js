import React from 'react';
import { Modal, StyleSheet, ActivityIndicator, Dimensions, FlatList, View , TouchableOpacity, TouchableHighlight, Alert, Image} from 'react-native';
import { Block, Text, theme, Input, Button } from 'galio-framework';
import { Icon } from '../components/';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
  

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

payIDModal = (item) => {
    
    if(item.phoneNumbers !== undefined ) {
        let fullName = (item.firstName + " " + item.lastName).toUpperCase();
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
            let payData = {
                "name": fullName,
                "payID": "PAYER01",
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
        age: 12
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
                            <Image source={require('../assets/icons/payid_sec.png')} style={styles.avatar} />
                            <Text style={{padding:10, fontSize:24}}>{this.state.activeName} has Registered {this.state.activeNumber} as PayID</Text>
                            <Button 
                            color='transparent'
                            onPress={() => this.toggleModalAndHop('Transfer')}
                            style={styles.button}
                            >Proceed</Button>
                            <Button
                            shadowless
                            style={styles.button}
                            color='transparent'
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            Cancel
                            </Button>
                    </Block>
                        ) : (
                            <Block style={{flex:1}}>
                            <Image source={require('../assets/icons/payid_sec.png')} style={styles.avatar} />
                            <Text style={{padding:10, fontSize:24}}>{this.state.activeName} has not been Registered {this.state.activeNumber} as PayID</Text>
                            <Button 
                            disabled 
                            color='transparent' style={styles.button}
                            onPress={() => navigation.navigate('Transfer')}
                            >Proceed</Button>
                            <Button
                            shadowless
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
    width: 120,
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
