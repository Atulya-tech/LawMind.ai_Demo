import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');

  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);  // Add this line
  const onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    let text = userInput;
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(selectedFile);
      await new Promise((resolve) => {
        fileReader.onload = () => {
          text = fileReader.result;
          resolve();
        };
      });
    }
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: text }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
    const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>what's poppin? <br/> Need Feedback?</h1>
          </div>
          <div className="header-subtitle">
            <h2>input the link or paste the content you would like feedback on</h2>
          </div>
        </div>
        {<div className="prompt-container">
        <textarea
placeholder="paste content or upload a file (.txt, .docx, .pdf)"
className="prompt-box"
  value={userInput}
  onChange={onUserChangedText}                                   
/>
<input type="file" onChange={onFileSelected} />
  <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>

  {}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
</div>
}
        

        
      </div>
      <div className="badge-container grow">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

