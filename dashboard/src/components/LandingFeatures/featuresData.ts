import React from "react";
import { FaMicrophoneAlt, FaDesktop, FaBrain, FaCommentDots, FaChartBar, FaShieldAlt } from "react-icons/fa";
export interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export const featuresData = [
  {
    icon: React.createElement(FaMicrophoneAlt, { size: 28 }),
    title: "Voice-first Interface",
    description: "Control and navigate the platform effortlessly using natural voice commands.",
  },
  {
    icon: React.createElement(FaDesktop, { size: 28 }),
    title: "Screen Intelligence",
    description: "Automatically detects and processes selected text or code from your current screen.",
  },
  {
    icon: React.createElement(FaBrain, { size: 28 }),
    title: "AI-Powered Insights",
    description: "Leverages Groq's powerful LLM for fast, contextual explanations of complex topics.",
  },
  {
    icon: React.createElement(FaCommentDots, { size: 28 }),
    title: "Voice Synthesis",
    description: "Hear detailed explanations and insights directly through high-quality voice output.",
  },
  {
    icon: React.createElement(FaChartBar, { size: 28 }),
    title: "Query Dashboard",
    description: "Easily view, manage, and track all past queries with timestamps and responses for easy reference.",
  },
  {
    icon: React.createElement(FaShieldAlt, { size: 28 }),
    title: "Privacy-focused",
    description: "Minimal permissions, anonymized queries, and secure local data storage.",
  },
];
