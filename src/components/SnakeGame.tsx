"use client";
import { useEffect, useRef, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<number[][]>([[10, 10]]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState<number[]>([15, 15]);
  const [gameOver, setGameOver] = useState(false);

  const canvasSize = 300;
  const scale = 15;

  const resetGame = () => {
    setSnake([[10, 10]]);
    setDirection("RIGHT");
    setFood([15, 15]);
    setGameOver(false);
  };

  // Key controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // Game loop
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const interval = setInterval(() => {
      if (gameOver) return;

      const newSnake = [...snake];
      const head = [...newSnake[newSnake.length - 1]];

      switch (direction) {
        case "UP": head[1]--; break;
        case "DOWN": head[1]++; break;
        case "LEFT": head[0]--; break;
        case "RIGHT": head[0]++; break;
      }

      newSnake.push(head);

      if (head[0] === food[0] && head[1] === food[1]) {
        setFood([Math.floor(Math.random() * (canvasSize / scale)), Math.floor(Math.random() * (canvasSize / scale))]);
      } else {
        newSnake.shift();
      }

      if (
        head[0] < 0 || head[1] < 0 ||
        head[0] >= canvasSize / scale || head[1] >= canvasSize / scale ||
        newSnake.slice(0, -1).some((seg) => seg[0] === head[0] && seg[1] === head[1])
      ) {
        setGameOver(true);
      }

      setSnake(newSnake);

      // Draw canvas
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      newSnake.forEach(([x, y], i) => {
        ctx.fillStyle = `rgb(0, ${150 + i * 5}, 0)`; // neon green
        ctx.fillRect(x * scale, y * scale, scale, scale);
      });
      ctx.fillStyle = "#ff00ff"; // neon pink food
      ctx.fillRect(food[0] * scale, food[1] * scale, scale, scale);
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="border-2 border-pink-500" />
      {gameOver && <div className="text-pink-500 font-bold">💀 Game Over! 💀</div>}
      <button onClick={resetGame} className="px-4 py-2 rounded-full bg-pink-500 text-black hover:bg-pink-400 transition">
        Restart Game
      </button>
    </div>
  );
}
