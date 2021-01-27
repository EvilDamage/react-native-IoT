import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TitleBar from './TitleBar';

const ConnectionScreen = () => {
  return (
    <View>
      <TitleBar title={'Connection'} />
      <Text style={styles.text}>Connection Tab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 250,
  },
});
export default ConnectionScreen;
