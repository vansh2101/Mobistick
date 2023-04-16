import { Accelerometer, DeviceMotion } from 'expo-sensors';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import {TapGestureHandler, State, GestureHandlerRootView} from 'react-native-gesture-handler';


//todo: get ip address from the device
const socket = io.connect('http://192.168.29.134:8000');


export default function Joystick({route, navigation}) {
  const {code} = route.params;

  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(null);
  const doubleTapRef = useRef(null);

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

  useEffect(() => {
    let previousX = 0;
    let previousY = 0;
    let previousZ = 0;
    let threshold = 1.2;

    const listener = DeviceMotion.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData.acceleration;
      const deltaX = previousX - x;
      const deltaY = Math.abs(previousY - y);
      const deltaZ = Math.abs(previousZ - z);

      if (x > threshold) {
        setIsMoving(true);
        setDirection('right');
        // console.log('x: ', x)
      } 
      else if (y > threshold) {
        setIsMoving(true);
        setDirection('up');
        // console.log('y: ', y)
      }
      else {
        setIsMoving(false);
      }


      if (isMoving){
      // socket.emit('transmit', {
        //   status: 'moved',
        //   direction: direction
        // })
        // console.log('just moved')

        previousX = x;
        previousY = y;
        previousZ = z;
      }
    });

    return () => {
      listener.remove();
    };
  }, []);


  return (
    <GestureHandlerRootView style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onSingleTap} waitFor={doubleTapRef}>
        <TapGestureHandler ref={doubleTapRef} onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
          <View style={styles.container}>
            <Text>State: {isMoving ? 'Moving' : 'Still'}</Text>
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
  }
})