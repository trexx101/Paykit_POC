import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, View } from 'react-native';
import { Button, Block, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

class MenuFooter extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.menu}>
                <View style={styles.row}>
                    <View style={styles.menuitem}>
                        <Icon name="bank" family="font-awesome" color={theme.COLORS.BLACK} size={16} />
                        <Text style={styles.menutext}> Transfer</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.menuitem} onPress={() => navigation.navigate('Pay')}>
                            <Icon name="gratipay" family="font-awesome" color={theme.COLORS.BLACK} size={16} />
                            <Text style={styles.menutext}> Pay Someone</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.menuitem}>
                        <Icon name="money" family="font-awesome" color={theme.COLORS.BLACK} size={16} />
                        <Text style={styles.menutext}> BPAY</Text>
                    </View>
                </View>
               
                <View style={styles.row}>
                <View style={styles.menuitem}>
                        <Icon name="money" family="font-awesome" color={theme.COLORS.BLACK} size={16} />
                        <Text style={styles.menutext}> Accounts</Text>
                    </View>
                    <View style={styles.menuitem}>
                        <Icon name="credit-card" family="font-awesome" color={theme.COLORS.BLACK} size={16} />
                        <Text style={styles.menutext}> Cards</Text>
                    </View>
                    <View style={styles.menuitem}>
                        <Icon name="tag" family="font-awesome" color={theme.COLORS.BLACK} size={16} />
                        <Text style={styles.menutext}> Product/Offers</Text>
                    </View>
                </View>
            </View>
            
          );
    }
}
export default withNavigation(MenuFooter);
const styles = StyleSheet.create({
    menu: {
        flex:1,
        height:'20%',
        position: 'absolute',
        bottom:0,
    },
    row: {
        flexDirection: "row",
        flex:1
    },
    menuitem: {
        
        width: '33.33%',
        backgroundColor: theme.COLORS.WHITE,
        borderWidth:0.5,
        borderColor: theme.COLORS.GREY,
        textAlign: 'center',
        alignItems:'center',
        justifyContent: 'center',

    }

})
