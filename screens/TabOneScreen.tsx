import React , { useState, useEffect }  from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
//import { Text, View,  } from '../components/Themed';
import { Accelerometer, Gyroscope, Magnetometer,Barometer } from 'expo-sensors';

export default function TabOneScreen() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,    
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };


  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        console.log(accelerometerData);
        console.log(accelerometerData.x*180.0/(Math.PI));
        console.log(accelerometerData.y*180.0/(Math.PI));
        console.log(accelerometerData.z*180.0/(Math.PI)); 
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;

  return (
    <View style={styles.container}>
      <View>
      <View>
      <View style={styles.squareSky} />
      <View style={styles.squareGround} />
      </View>
      <View  style={styles.planeLeft}>
         
          <View style={styles.planeRight} />

      </View>

      </View>
     <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Text style={styles.text}>Gyroscope </Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}
const styles = StyleSheet.create({
  squareSky: {
    width: 300,
    height: 150,
    backgroundColor: '#65AED1',
  },
  squareGround: {
    width: 300,
    height: 150,
    backgroundColor: '#3D2922',
  },
  plane:{
  width: 65,
  height: 2,
  backgroundColor: '#E65A1C',
  borderBottomColor: '#E65A1C',
  bottom: '50%'
  },
  planeLeft:{
    width: 55,
    height: 2,
  backgroundColor: '#E65A1C',
  borderBottomColor: '#E65A1C',
  left: 75,
  bottom: '50%'
  },
  planeRight:{
    height: 2,
  backgroundColor: '#E65A1C',
  borderBottomColor: '#E65A1C',
  left: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    textAlign: 'center',
    color:'blue'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
