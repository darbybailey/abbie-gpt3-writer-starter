import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}


const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>KIRL NETWORKS</ h1>
          </div>
          <div className="header-subtitle">
            <h2>Welcome to the classroom lesson plan idea generator. Please enter the  GRADE and NUMBER OF STUDENTS for which you want lesson plan ideas.</h2>
          </div>
        </div>
	</div>

<div className="prompt-container">
  <textarea
    placeholder="4th Grade, 22 students"
    className="prompt-box"
    value={userInput}
    onChange={onUserChangedText}
  />
  <div className="prompt-buttons">
    <a className="generate-button" onClick={callGenerateEndpoint}>
        <p>Generate</p>
    </a>
  </div>

          <div className="header-subtitle">
            <h2>Please wait 10-30 seconds for our magic helpers to do their work. Please do not hit refresh or the "Generate" button more than once. Your lesson plan text will appear below shortly.</h2>
          </div>

  {/* New code I added here */}
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

      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
