import React from 'react';
import { View, Text } from 'react-native';
import HomeLayout from 'layout/HomeLayout';

const Home = (props) => {
  return (
    <HomeLayout navigation={props.navigation} >
      <View>
        <Text>Screen Home</Text>
      </View>
    </HomeLayout>
  );
};

export default Home;