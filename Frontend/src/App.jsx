import React, { useState, useEffect, useCallback } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import './App.css';
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const API_ENDPOINT = 'http://localhost:3000/ai/get-review'; 

function App() {
  const [code, setCode] = useState(`function sum(a, b){ return a+b }`);
  const [review, setReview] = useState(null); // Initialize to null

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const reviewCode = useCallback(async () => {
    try {
      const response = await axios.post(API_ENDPOINT, { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please check the backend."); // Provide user feedback
    }
  }, [code]); // Add code as a dependency, so it updates when the code changes.

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code","Fira mono" monospace ',
              fontSize: 20,
              height: "100%",
              width: "100%",
              borderRadius: "1rem",
              color: "white"
            }}
          />
        </div>
        <button onClick={reviewCode} className="review">Review</button>
      </div>
      <div className="right">
        {review ? (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        ) : (
          <p className='loader'></p>
        )}
      </div>
      
    </main>
  );
}

export default App;