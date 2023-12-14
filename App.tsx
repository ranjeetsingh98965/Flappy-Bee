import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './src/entities';
import Physics from './physics';

const App = () => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <View
      style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#0381EF'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          margin: 20,
          position: 'absolute',
          alignSelf: 'center',
          top: 10,
          zIndex: 99,
          color: '#000',
        }}>
        {currentPoints}
      </Text>
      {/* <Image
        source={require('./src/assets/images/bee_space.png')}
        resizeMode="contain"
        style={{alignSelf: 'flex-end', marginBottom: 20}}
      /> */}
      <GameEngine
        ref={ref => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              // setCurrentPoints(0);
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 10);
              break;
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}></GameEngine>

      {!running ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            alignSelf: 'center',
            top: '50%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <StatusBar hidden={true} />
    </View>
  );
};

export default App;
