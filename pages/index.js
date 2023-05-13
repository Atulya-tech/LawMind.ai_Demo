import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileSelected = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    let text = userInput + userInput2;
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
  
    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: text }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  const onUserChangedText2 = (event) => {
    setUserInput2(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Verdict AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Transforming the Legal Landscape : The AI-Powered Solution for Smarter, Faster, and More Accurate Legal Services</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="Prosecution Arguments"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <textarea
            placeholder="Defense Arguments"
            className="prompt-box"
            value={userInput2}
            onChange={onUserChangedText2}
          />
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
      </div>
    </div>
  );
};

export default Home;