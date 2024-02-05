import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from 'layout/HomeLayout';

const FAQ = (props) => {
  return (
    <HomeLayout navigation={props.navigation} >
      <View>
        <Text>Screen FAQ</Text>
      </View>
    </HomeLayout>
  );
};

export default FAQ;