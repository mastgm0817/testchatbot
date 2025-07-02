import React from "react";
import { createRoot } from "react-dom/client";
import { FloatingChatBot } from "./components/FloatingChatBot";
import "./index.css";

// 글로벌 함수로 export
(window as any).renderChatbotWidget = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    createRoot(container).render(<FloatingChatBot />);
  }
}; 