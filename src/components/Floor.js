import React from 'react';
import Matter from 'matter-js';
import {View, Image} from 'react-native';

const Floor = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      //   source={require('../assets/images/base.png')}
      //   resizeMode="stretch"
      style={{
        backgroundColor: color,
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        borderTopWidth: 10,
        borderTopColor: '#784E15',
      }}
    />
  );
};

export default (world, color, position, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {label: 'Floor', isStatic: true},
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color,
    position,
    renderer: <Floor />,
  };
};
