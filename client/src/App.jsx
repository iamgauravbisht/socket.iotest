import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (socket == null || inputText == null) return;

  //   const handler = (text) => {
  //     socket.emit("send-changes", text);
  //   };

  //   socket.on("text-change", handler);

  //   return () => {
  //     socket.off("text-change", handler);
  //   };
  // }, [socket, inputText]);

  useEffect(() => {
    if (socket == null || inputText == null) return;

    const handler = (text) => {
      setInputText(text);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, inputText]);

  useEffect(() => {
    if (socket != null && inputText != null) {
      socket.emit("send-changes", inputText);
    }
  }, [socket, inputText]);

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
}

export default App;
