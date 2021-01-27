import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const TitleBar = ({title}) => {
  return (
    <View style={styles.titleBar}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
  },
});
export default TitleBar;
