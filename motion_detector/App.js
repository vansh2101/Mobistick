import { Accelerometer } from 'expo-sensors';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import io from 'socket.io-client';


//todo: get ip address from the device
const socket = io.connect('http://192.168.29.134:8000');


export default function App() {
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let previousX = 0;
    let previousY = 0;
    let previousZ = 0;
    let threshold = 1;

    const listener = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      const deltaX = Math.abs(previousX - x);
      const deltaY = Math.abs(previousY - y);
      const deltaZ = Math.abs(previousZ - z);

      if (deltaX > threshold) {
        setIsMoving(true);
        socket.emit('transmit', {msg: 'hello'})
        console.log('just moved')
      } else {
        setIsMoving(false);
      }

      previousX = x;
      previousY = y;
      previousZ = z;
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
      <Text>State: {isMoving ? 'Moving' : 'Still'}</Text>
    </View>
  );
}