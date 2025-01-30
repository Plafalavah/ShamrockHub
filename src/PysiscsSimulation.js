import React, { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Runner, Events } from 'matter-js';

const PhysicsSimulation = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Engine.create());
  const renderRef = useRef(null);

  useEffect(() => {
    const container = sceneRef.current;
    const cw = 800;
    const ch = 600;

    const render = Render.create({
      element: container,
      engine: engineRef.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'black',
      },
    });
    renderRef.current = render;

    // Disable gravity
    engineRef.current.world.gravity.y = 0.5; // No vertical gravity
    engineRef.current.world.gravity.x = 0; // No horizontal gravity

    // Walls
    const walls = [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ];
    World.add(engineRef.current.world, walls);

    // Add a few initial balls
    const initialBalls = [
      Bodies.circle(200, 100, 20, {
        render: { fillStyle: '#3498db' },
        restitution: 1.5,
      }),
      Bodies.circle(400, 100, 20, {
        render: { fillStyle: '#e74c3c' },
        restitution: 1.5,
      }),
    ];
    World.add(engineRef.current.world, initialBalls);

    Events.on(engineRef.current, 'collisionStart', (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        bodyA.render.fillStyle = getRandomColor();
        bodyB.render.fillStyle = getRandomColor();
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engineRef.current);
    Render.run(render);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engineRef.current.world);
      Engine.clear(engineRef.current);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  const addBall = (x, y, color) => {
    const ball = Bodies.circle(x, y, 20, {
      render: { fillStyle: color },
      restitution: 1.2,
    });
    World.add(engineRef.current.world, [ball]);
  };

  const removeBallsAtPosition = (x, y) => {
    if (engineRef.current) {
      const bodies = engineRef.current.world.bodies.filter(
        (body) => !body.isStatic
      );
      const bodyToRemove = bodies.find(
        (body) =>
          Math.abs(body.position.x - x) < 20 &&
          Math.abs(body.position.y - y) < 20
      );
      if (bodyToRemove) {
        World.remove(engineRef.current.world, bodyToRemove);
      }
    }
  };

  const handleMouseDown = (e) => {
    if (sceneRef.current) {
      const rect = sceneRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (e.button === 0) {
        addBall(x, y, '#3498db');
      } else if (e.button === 2) {
        removeBallsAtPosition(x, y);
      }
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div
      ref={sceneRef}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        width: '800px',
        height: '600px',
        position: 'relative',
        border: '1px solid #ccc',
        overflow: 'hidden',
      }}
    />
  );
};

export default PhysicsSimulation;
