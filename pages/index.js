import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import kirlLogo from '/assets/kirl-logo-circle.png';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { HashLoader } from "react-spinners";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Home = () => {
  const [userInput, setUserInput] = useState("");

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    // console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;

    // console.log("OpenAI replied...", output.text);
    // let myobj = JSON.parse(output);
    console.log(output);
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  let docDefinition = {
    content: [apiOutput],
    // styles: {
    //   header: {
    //     fontSize: 18,
    //     bold: true,
    //   },
    // },
  };
  function handleDownload() {
    pdfMake.createPdf(docDefinition).download();
  }
  function handlePrint() {
    pdfMake.createPdf(docDefinition).print();
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>ABBIE - automate your lesson plans</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>ABBIE</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Welcome to ABBIE, the automated lesson plan generator. Please enter
              the GRADE and NUMBER OF STUDENTS for which you want lesson plan
              ideas.
            </h2>
          </div>
        </div>
      </div>

      <div className="prompt-container">
        <textarea
          placeholder="Example input ... 4th Grade, 22 students"
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
          <h2>
            Please wait 30-60 seconds for our magic helpers to do their work.
          </h2>
        </div>

        {/* New code I added here */}
        <HashLoader loading={isGenerating} color="#d67b36" />
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
              {/* <button onClick={() => window.print()}>Print PDF</button> */}
            </div>
            <div className="btn-container">
              <button className="download-btn" onClick={handleDownload}>
                Download PDF
              </button>
              <button className="print-btn" onClick={handlePrint}>
                Print PDF
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="badge-container grow">
        <a
          href="https://www.kirlnetworks.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={kirlLogo} alt="kirl logo" />
            <p>Brought to you by Kirl Networks</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
