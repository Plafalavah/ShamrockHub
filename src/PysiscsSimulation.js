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
        restitution: 1.2,
      }),
      Bodies.circle(400, 100, 20, {
        render: { fillStyle: '#e74c3c' },
        restitution: 1.2,
      }),
    ];
    World.add(engineRef.current.world, initialBalls);

    // Collision Detection: Change color based on speed
    Events.on(engineRef.current, 'collisionStart', (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        const velocityA = Math.sqrt(bodyA.velocity.x ** 2 + bodyA.velocity.y ** 2);
        const velocityB = Math.sqrt(bodyB.velocity.x ** 2 + bodyB.velocity.y ** 2);

        if (velocityA > velocityB) {
          bodyB.render.fillStyle = bodyA.render.fillStyle; // A transfers its color to B
        } else if (velocityB > velocityA) {
          bodyA.render.fillStyle = bodyB.render.fillStyle; // B transfers its color to A
        }
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
      restitution: 1,
    });
    World.add(engineRef.current.world, [ball]);
  };

  const handleMouseDown = (e) => {
    if (sceneRef.current) {
      const rect = sceneRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (e.button === 0) {
        // Left-click: Add a blue ball
        addBall(x, y, '#3498db');
      } else if (e.button === 2) {
        // Right-click: Remove balls at the clicked position
        addBall(x, y, '#e74c3c');
      }
    }
  };

  return (
    <div
      ref={sceneRef}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()} // Prevent default context menu on right-click
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
