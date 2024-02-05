import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from 'layout/HomeLayout';

const MyAccount = (props) => {
  return (
    <HomeLayout navigation={props.navigation} >
      <View>
        <Text>Screen My Account</Text>
      </View>
    </HomeLayout>
  );
};

export default MyAccount;