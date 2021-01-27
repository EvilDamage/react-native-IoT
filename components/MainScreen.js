import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  default as Alert,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import TitleBar from './TitleBar';

const MainScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Name, setName] = useState('');
  const [Place, setPlace] = useState('');
  const [Command, setCommand] = useState('');
  const [Color, setColor] = useState('');
  const [ObjectDevices, setObjectDevices] = useState([]);
  const [LoadAS, setLoadAS] = useState(false);

  if (LoadAS === false) {
    AsyncStorage.getItem('DEVICES').then((r) => {
      setObjectDevices(JSON.parse(r));
    });
    setLoadAS(true);
  }

  return (
    <View>
      <TitleBar title={'Devices'} />
      <View style={styles.wrapper}>
        {
          ObjectDevices.map((item) => {
            console.log(item)
            return (
              <View style={styles.box}>
                <Text style={{color: '#fff', fontSize: 24}}>{item.name}</Text>
                <Text style={{color: '#fff'}}>{item.place}</Text>
              </View>
            );
          })}
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TitleBar title={'New Device'} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder={'Name'}
              onChangeText={(text) => setName(text)}
              value={Name}
            />
            <TextInput
              style={styles.input}
              placeholder={'Place'}
              onChangeText={(text) => setPlace(text)}
              value={Place}
            />
            <TextInput
              style={styles.input}
              placeholder={'Command'}
              onChangeText={(text) => setCommand(text)}
              value={Command}
            />
            {/*<TextInput*/}
            {/*  style={styles.input}*/}
            {/*  placeholder={'Color HEX'}*/}
            {/*  onChangeText={(text) => setColor(text)}*/}
            {/*  value={Color}*/}
            {/*/>*/}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#900',
                  width: 100,
                  marginLRight: 25,
                }}
                onPress={async () => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#900',
                  width: 100,
                  marginLeft: 25,
                }}
                onPress={async () => {
                  const newElement = {
                    name: Name,
                    place: Place,
                    command: Command,
                    color: '',
                  };

                  const existingProducts = await AsyncStorage.getItem(
                    'DEVICES',
                  );
                  let newProduct = JSON.parse(existingProducts);
                  if (!newProduct) {
                    newProduct = [];
                  }

                  newProduct.push(newElement);

                  await AsyncStorage.setItem(
                    'DEVICES',
                    JSON.stringify(newProduct),
                  )
                    .then(() => {
                      console.log('It was saved successfully');
                    })
                    .catch(() => {
                      console.log('There was an error saving the product');
                    });

                  setName('');
                  setPlace('');
                  setCommand('');
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 15,
  },
  box: {
    height: 125,
    width: 125,
    backgroundColor: '#900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  add: {
    color: '#fff',
    fontSize: 64,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
  },
  openButton: {
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MainScreen;
