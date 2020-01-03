import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Product, MenuFooter } from '../components/';

const { width, height } = Dimensions.get('screen');
import products from '../constants/products';

import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
const thumbMeasure = (width - 48 - 32) / 3;


export default class Home extends React.Component {


  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.profile}>
        
          <Block 
            style={styles.profileContainer}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="black" size={28} style={{ paddingBottom: 8, paddingTop: 5  }}>Hi Anthony</Text>
                <Block row space="between">
                  <Block row>
                    <Button round size='small' color='#000000'>Log off</Button>
                  </Block>
                </Block>
              </Block>
            </Block>
            </Block>
        
        <Block flex style={styles.newsBanner}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Card borderless style={styles.newsCard}>
            <Text h4>We will keep updating the app using your feedback</Text> 
            <Text color="black" p muted>Help us improve by answering some quick questions</Text>
          </Card>
          <Card borderless style={styles.newsCard}>
             <Text h4>On average people get $751 worth of rebates and cash back </Text> 
          
          </Card>
          </ScrollView>
        </Block>
        
        <MenuFooter navigation={navigation}/>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,

  },
  profileContainer: {
    width: width,
    height: '25%',
  },
  newsBanner: {
  
  },
  newsCard: {
    backgroundColor: theme.COLORS.WHITE,
    margin:5,
    padding:12,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'flex-end',
    
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  }
});
