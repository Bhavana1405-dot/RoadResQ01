import { useState } from "react";
import Chat from "@/components/ui/Chat";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700"
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
      {isOpen && <Chat />}
    </div>
  );
}
