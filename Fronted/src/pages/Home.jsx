import React from "react";
import { useState,useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css" 
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown";
import axios from "axios";
const Home = () => {
  const [code, setCode] = useState(`function add(a, b) {
                return a + b;
               }`);
  const [review, setReview] = useState(``);
   useEffect(() => {
    prism.highlightAll()
  }, [])
 async function ReviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/code-review', { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error reviewing code:", error);
    }
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-green-500 text-2xl font-bold mt-6 mb-10 text-center">
        Welcome to the Code Review App
      </h1>

      {/* Panel Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Panel 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between min-h-[500px]">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Code Editor</h2>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              className="bg-gray-100 rounded-md"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            />
          </div>
          <button
            onClick={ReviewCode}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded self-end"
          >
            Review
          </button>
        </div>
        {/* Panel 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between min-h-[500px]">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Output</h2>
            <pre className="whitespace-pre-wrap text-gray-800">
              <Markdown>
                {review}

              </Markdown>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
