"use client"

import { useEffect, useRef } from "react"

export default function DvdBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener("resize", resize)

    const logo = {
      x: 150,
      y: 150,
      w: 120,
      h: 60,
      dx: 3,
      dy: 2,
      color: "#ff00ff",
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // Draw DVD rectangle
      ctx.fillStyle = logo.color
      ctx.fillRect(logo.x, logo.y, logo.w, logo.h)

      // Draw text
      ctx.fillStyle = "white"
      ctx.font = "bold 24px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("DVD", logo.x + logo.w / 2, logo.y + logo.h / 2)

      // Move logo
      logo.x += logo.dx
      logo.y += logo.dy

      // Bounce off walls
      if (logo.x <= 0 || logo.x + logo.w >= width) {
        logo.dx *= -1
        logo.color = randomColor()
      }
      if (logo.y <= 0 || logo.y + logo.h >= height) {
        logo.dy *= -1
        logo.color = randomColor()
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  function randomColor() {
    const colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff5722", "#4caf50", "#2196f3"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full" />
}
