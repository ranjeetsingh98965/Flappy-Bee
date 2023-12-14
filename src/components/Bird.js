import React from 'react';
import Matter from 'matter-js';
import {Image, View} from 'react-native';

const Bird = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: color,
        // borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../assets/images/bee.png')}
        style={{position: 'absolute', width: '120%', height: '120%'}}
        resizeMode="contain"
      />
    </View>
  );
};

export default (world, color, position, size) => {
  const initialBird = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {label: 'Bird'},
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    position,
    renderer: <Bird />,
  };
};
