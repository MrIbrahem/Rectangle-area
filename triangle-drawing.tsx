"use client"

import { useEffect, useRef } from "react"

interface TriangleDrawingProps {
  side1: number
  side2: number
  base: number
}

export function TriangleDrawing({ side1, side2, base }: TriangleDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // If any side is 0 or invalid, don't draw
    if (!side1 || !side2 || !base) return

    // Find the longest side and rearrange sides
    const sides = [side1, side2, base]
    sides.sort((a, b) => b - a) // Sort in descending order
    const [longestSide, otherSide1, otherSide2] = sides

    // Calculate angles using law of cosines
    const angleTop = Math.acos(
      (otherSide1 * otherSide1 + otherSide2 * otherSide2 - longestSide * longestSide) / (2 * otherSide1 * otherSide2),
    )

    // Check if triangle is possible
    if (isNaN(angleTop)) return

    // Calculate other angles
    const angleLeft = Math.acos(
      (otherSide1 * otherSide1 + longestSide * longestSide - otherSide2 * otherSide2) / (2 * otherSide1 * longestSide),
    )

    // Scale factor to fit triangle in canvas
    const scale = (canvas.width * 0.8) / longestSide
    const margin = canvas.width * 0.1 // 10% margin

    // Calculate points
    // Base points (longest side)
    const leftBaseX = margin
    const rightBaseX = margin + longestSide * scale
    const baseY = canvas.height * 0.7 // Position base at 70% of height

    // Calculate top point using angles
    const topX = leftBaseX + otherSide1 * scale * Math.cos(angleLeft)
    const topY = baseY - otherSide1 * scale * Math.sin(angleLeft)

    // Draw triangle
    ctx.beginPath()
    ctx.moveTo(leftBaseX, baseY) // Start at left base point
    ctx.lineTo(topX, topY) // Line to top point
    ctx.lineTo(rightBaseX, baseY) // Line to right base point
    ctx.closePath()

    // Fill with yellow color
    ctx.fillStyle = "#FFD700"
    ctx.fill()

    // Draw border
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 1
    ctx.stroke()
  }, [side1, side2, base])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
      className="w-full border-2 border-dashed border-gray-300 rounded-lg bg-white"
    />
  )
}

