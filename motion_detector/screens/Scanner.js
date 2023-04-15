import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function Scanner({navigation}) {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  const getScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(status === 'granted');
  };

  useEffect(() => {
    getScannerPermissions();
  }, []);

  const handleScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate('joystick', {code: data})
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };


  if (permission === null) {
    return( 
      <Text>Requesting for camera permission</Text>
    )
  }
  if (permission === false) {
    return( 
      <Text>No access to camera</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.border} />
        {!scanned ? <BarCodeScanner
          onBarCodeScanned={handleScanned}
          style={styles.scanner}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        : <></> }
      </View>
      <Text style={styles.info}>Scan the QR code on the extension to connect!!</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  subContainer: {
    height: '35%',
    width: '72%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  border: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderWidth: 7,
    borderRadius: 20,
    zIndex: 1
  },
  scanner: {
    width: '95%',
    height: '98%',
    zIndex: 0
  },
  info: {
    marginTop: 35,
    fontSize: 20,
    width: '70%',
    textAlign: 'center',
    fontWeight: 'bold',
  }
})