import { Accelerometer, DeviceMotion } from 'expo-sensors';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import io from 'socket.io-client';


//todo: get ip address from the device
const socket = io.connect('http://192.168.29.134:8000');


export default function Joystick() {
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState(null);

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
        console.log('x: ', x)
      } 
      else if (y > threshold) {
        setIsMoving(true);
        setDirection('up');
        console.log('y: ', y)
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
    <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
      <Text>State: {isMoving ? 'Moving' : 'Still'}</Text>
    </View>
  );
}