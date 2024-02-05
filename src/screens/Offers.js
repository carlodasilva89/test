import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from 'layout/HomeLayout';

const Offers = (props) => {
  return (
    <HomeLayout navigation={props.navigation} >
      <View>
        <Text>Screen Offers</Text>
      </View>
    </HomeLayout>
  );
};

export default Offers;