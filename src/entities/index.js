import Matter from 'matter-js';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import {Dimensions} from 'react-native';
import {getPipeSizePosPair} from '../utils/randome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default restarts => {
  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;

  // Speed of the bird in downwards direction
  engine.gravity.y = 0.9;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: {engine, world},

    Bird: Bird(world, 'green', {x: 50, y: 300}, {width: 50, height: 35}),

    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      '#FFCA08',
      '#AB6F22',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),

    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      '#FFCA08',
      '#AB6F22',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),

    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      '#FFCA08',
      '#AB6F22',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),

    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      '#FFCA08',
      '#AB6F22',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),

    Floor: Floor(
      world,
      '#DED895',
      {x: windowWidth / 2, y: windowHeight},
      {width: windowWidth, height: 80},
    ),
  };
};
