import { Accelerometer, DeviceMotion } from 'expo-sensors';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import {TapGestureHandler, State, GestureHandlerRootView} from 'react-native-gesture-handler';
import {Octicons} from '@expo/vector-icons'


//todo: get ip address from the device
const socket = io.connect('http://192.168.1.14:8000');


export default function Joystick({route, navigation}) {
  const {code} = route.params;

  const doubleTapRef = useRef(null);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  thresholdX = 2;
  thresholdY = 0.2;
  thresholdZ = 1.2;

  socket.emit('connect_device', {room: code})

  const onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE){
      console.log('Hey single tap!!');

      const data = {
        command: 'jump',
        key: 'space'
      }

      emit_data(data)
    }
  }

  const onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE){
      console.log('Hey double tap!!');

      const data = {
        command: 'shoot',
        key: 'mouseclick'
      }

      emit_data(data)
    }
  }

  const emit_data = data => {
    socket.emit('transmit', data)
  }


  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(setData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(100)
    return () => _unsubscribe();
  }, []);


  useEffect(() => {
    if (x > thresholdX){
      const data = {
        command: 'up',
        key: 'w'
      }
      emit_data(data)

    }
    else if (Math.abs(x) > thresholdX){
      const data = {
        command: 'down',
        key: 's'
      }
      emit_data(data)

    }

    if (z > thresholdZ){
      const data = {
        command: 'right',
        key: 'd'
      }
      emit_data(data)

    }
    else if(Math.abs(z) > thresholdZ){
      const data = {
        command: 'left',
        key: 'a'
      }
      emit_data(data)

    }

  }, [x,y,z])


  return (
    <GestureHandlerRootView style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onSingleTap} waitFor={doubleTapRef}>
        <TapGestureHandler ref={doubleTapRef} onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
          <View style={styles.container}>
            <Octicons name='triangle-up' size={100} color={'black'} style={[styles.icon, {top: 0, left: '41%'}]} />
            <Octicons name='triangle-left' size={100} color={'black'} style={[styles.icon, {left: 3, top: '42%'}]} />
            <Octicons name='triangle-down' size={100} color={'black'} style={[styles.icon, {bottom: 0, left: '41%'}]} />
            <Octicons name='triangle-right' size={100} color={'black'} style={[styles.icon, {right: 3, top: '42%'}]} />
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%'
  },

  icon: {
    position:'absolute',
  }
})