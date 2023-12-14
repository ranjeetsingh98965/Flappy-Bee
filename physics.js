import Matter from 'matter-js';
import {getPipeSizePosPair} from './src/utils/randome';

import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;

  // ##### tap to go bee in upward direction #####
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -6,
      });
    });

  // ##### Update render on every 16ms #####
  Matter.Engine.update(engine, time.delta);

  // ##### logic to set position and add coins #####
  for (let index = 1; index <= 2; index++) {
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({type: 'new_point'});
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos,
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos,
      );

      entities[`ObstacleTop${index}`].point = false;
    }

    // ##### Movement of the obstacles #####
    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x: -3, y: 0});
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -3,
      y: 0,
    });
  }

  Matter.Events.on(engine, 'collisionStart', event => {
    dispatch({type: 'game_over'});
  });
  return entities;
};
export default Physics;
