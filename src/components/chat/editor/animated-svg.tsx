"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { generateArrayKey } from "@/lib/utils/array-utils";

interface AnimatedSvgProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "pulse" | "morph" | "wave" | "loader";
  primaryColor?: string;
  secondaryColor?: string;
  duration?: number;
  pathsCount?: number;
}

export const AnimatedSvg = ({
  className,
  width = 200,
  height = 120,
  variant = "morph",
  primaryColor = "rgba(0, 206, 209, 0.9)",
  secondaryColor = "rgba(64, 224, 208, 0.5)",
  duration = 10,
  pathsCount = 3,
}: AnimatedSvgProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<Array<{ id: number; d: string }>>([]);

  // Generate random path data for morph effect - wrapped in useCallback to avoid dep changes
  const generatePathData = React.useCallback(() => {
    const createRandomPath = (index: number) => {
      const amplitude = 10 + Math.random() * 20; // Random amplitude
      const frequency = 0.01 + Math.random() * 0.02; // Random frequency
      const phaseShift = Math.random() * Math.PI * 2; // Random phase shift

      let d = `M 0 ${height / 2}`;

      // Create a smooth wave-like path with random variations
      for (let x = 0; x <= width; x += 5) {
        const y =
          height / 2 +
          amplitude * Math.sin(x * frequency + phaseShift) +
          index * 15; // Offset by index

        d += ` L ${x} ${y}`;
      }

      // Close the path at the bottom right and back to the start
      d += ` L ${width} ${height} L 0 ${height} Z`;

      return d;
    };

    const initialPaths = Array.from({ length: pathsCount }, (_, i) => ({
      id: i,
      d: createRandomPath(i),
    }));

    setPaths(initialPaths);
  }, [width, height, pathsCount]);

  useEffect(() => {
    generatePathData();

    // Regenerate paths every few seconds for the morph effect
    if (variant === "morph") {
      const interval = setInterval(() => {
        generatePathData();
      }, duration * 1000);

      return () => clearInterval(interval);
    }
  }, [variant, duration, generatePathData]);

  const renderVariant = () => {
    switch (variant) {
      case "morph":
        return (
          <>
            {paths.map((path, i) => (
              <motion.path
                key={path.id}
                d={path.d}
                initial={{ d: path.d }}
                animate={{ d: path.d }}
                transition={{
                  duration: duration / 2,
                  ease: "easeInOut",
                }}
                fill={`rgba(${Number.parseInt(
                  primaryColor.substring(5, 8),
                )}, ${Number.parseInt(primaryColor.substring(10, 13))}, ${Number.parseInt(
                  primaryColor.substring(15, 18),
                )}, ${0.2 + i * 0.2})`}
                style={{
                  filter: "blur(10px)",
                }}
              />
            ))}
          </>
        );

      case "pulse":
        return (
          <g>
            <motion.circle
              cx={width / 2}
              cy={height / 2}
              r={40}
              fill={primaryColor}
              animate={{
                r: [40, 45, 40],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={width / 2}
              cy={height / 2}
              r={30}
              fill={secondaryColor}
              animate={{
                r: [30, 40, 30],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </g>
        );

      case "wave":
        return (
          <g>
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={generateArrayKey(i)}
                d={`M 0 ${height / 2} Q ${width / 4} ${height / 2 + 20} ${
                  width / 2
                } ${height / 2} Q ${(3 * width) / 4} ${height / 2 - 20} ${width} ${height / 2}`}
                stroke={`rgba(${Number.parseInt(
                  primaryColor.substring(5, 8),
                )}, ${Number.parseInt(primaryColor.substring(10, 13))}, ${Number.parseInt(
                  primaryColor.substring(15, 18),
                )}, ${0.3 + i * 0.1})`}
                strokeWidth={3}
                fill="none"
                initial={{ y: i * 10 }}
                animate={{
                  y: [i * 10, i * 10 + 20, i * 10],
                  d: [
                    `M 0 ${height / 2} Q ${width / 4} ${height / 2 + 20} ${
                      width / 2
                    } ${height / 2} Q ${(3 * width) / 4} ${height / 2 - 20} ${width} ${height / 2}`,
                    `M 0 ${height / 2} Q ${width / 4} ${height / 2 - 20} ${
                      width / 2
                    } ${height / 2} Q ${(3 * width) / 4} ${height / 2 + 20} ${width} ${height / 2}`,
                    `M 0 ${height / 2} Q ${width / 4} ${height / 2 + 20} ${
                      width / 2
                    } ${height / 2} Q ${(3 * width) / 4} ${height / 2 - 20} ${width} ${height / 2}`,
                  ],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </g>
        );

      case "loader":
        return (
          <g>
            <motion.circle
              cx={width / 2}
              cy={height / 2}
              r={40}
              fill="none"
              stroke={primaryColor}
              strokeWidth={6}
              strokeDasharray="251.2"
              animate={{
                rotate: [0, 360],
                strokeDashoffset: [251.2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                transformOrigin: "center",
              }}
            />
            <motion.circle
              cx={width / 2}
              cy={height / 2}
              r={25}
              fill="none"
              stroke={secondaryColor}
              strokeWidth={4}
              strokeDasharray="157"
              animate={{
                rotate: [0, -360],
                strokeDashoffset: [0, 157],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                transformOrigin: "center",
              }}
            />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <motion.svg
      ref={svgRef}
      className={cn("overflow-visible", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: variant === "morph" ? "blur(2px)" : "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>Animated SVG</title>
      {renderVariant()}
    </motion.svg>
  );
};
