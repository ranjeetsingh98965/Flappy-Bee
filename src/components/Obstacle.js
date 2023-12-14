import React from 'react';
import Matter from 'matter-js';
import {View} from 'react-native';

const Obstacle = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;
  const backgroundColor = props.backgroundColor;

  return (
    <View
      style={{
        borderWidth: 3,
        borderColor: color,
        backgroundColor: backgroundColor,
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        borderRadius: 5,
      }}
    />
  );
};

export default (world, label, backgroundColor, color, position, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {label: 'Obstacle', isStatic: true},
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    backgroundColor,
    color,
    position,
    renderer: <Obstacle />,
  };
};
