import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = ({}) => {
  const [isLoading, setIsloading] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [result, setResult] = useState("");
  const [sentenceNumber, setSentenceNumber] = useState(3);
  const selectFile = async e => {
    /* Source:https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
    const textFile = e.target.files[0];
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;
      setTextValue(text);
    };
    reader.readAsText(textFile);
  };
  if (isLoading) {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto ml-auto">
            <Navbar.Brand href="#home">
              Automatic Text Summarization using LSA
            </Navbar.Brand>
          </Nav>
        </Navbar>
        <div className="loader-container">
          <div className="loader"></div>
          {/* <h1 className="loading">Loading</h1> */}
        </div>
      </>
    );
  }
  const saveInputTextToState = event => {
    setTextValue(event.target.value);
    console.log(textValue);
  };
  const tokenize = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://automatic-text-summarization.herokuapp.com/tokenize-document",
        { textDocument: textValue }
      );
      setResult(response.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setIsloading(false);
    }
  };
  const removeStopWords = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://automatic-text-summarization.herokuapp.com/remove-stopword",
        { textDocument: textValue }
      );
      setResult(response.data);
      console.log(response.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setIsloading(false);
    }
  };
  const stemDocument = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://automatic-text-summarization.herokuapp.com/stem-document",
        { textDocument: textValue }
      );
      setResult(response.data);
      console.log(response.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setIsloading(false);
    }
  };
  const generateTfIdf = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://automatic-text-summarization.herokuapp.com/tf-idf",
        { textDocument: textValue }
      );
      var pretty = JSON.stringify(response.data, undefined, 2);
      setResult(pretty);
      console.log(response.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setIsloading(false);
    }
  };
  const generateSVD = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://automatic-text-summarization.herokuapp.com/generate-svd",
        { textDocument: textValue }
      );
      var pretty = JSON.stringify(response.data, undefined, 2);
      setResult(pretty);
      console.log(response.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setIsloading(false);
    }
  };
  const addSentenceNumberToState = event => {
    setSentenceNumber(event.target.value);
    console.log(sentenceNumber);
  };
  const summarizeText = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://automatic-text-summarization.herokuapp.com/lsa-summarization",
        { textDocument: textValue, numberOfSentence: sentenceNumber }
      );
      var pretty = JSON.stringify(response.data, undefined, 2);
      setResult(pretty);
      console.log(response.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
      setIsloading(false);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto ml-auto">
          <Navbar.Brand href="#home">
            Automatic Text Summarization using LSA
          </Navbar.Brand>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col className="mt-5 border" sm={7}>
            <div class="input-group">
              <div class="custom-file mt-2 mb-1">
                <input
                  type="file"
                  accept=".txt"
                  class="custom-file-input"
                  id="inputGroupFile04"
                  onChange={selectFile}
                  aria-describedby="inputGroupFileAddon04"
                />
                <label class="custom-file-label" for="inputGroupFile04">
                  <Card.Title className="text-center">
                    Choose a text file
                  </Card.Title>
                </label>
              </div>
              <div></div>
            </div>
            <Card>
              <Card.Header>
                <Card.Title className="text-center">
                  or Copy and Paste Your Text into the Box
                </Card.Title>
              </Card.Header>
              <Form.Control
                style={{ overflowY: "scroll" }}
                as="textarea"
                value={textValue}
                rows="12"
                onChange={saveInputTextToState}
              />
            </Card>
            <InputGroup size="md" className="my-2">
              <InputGroup.Prepend>
                <Button onClick={summarizeText} variant="primary">
                  Summarize Text
                </Button>
              </InputGroup.Prepend>
              <FormControl
                aria-describedby="basic-addon1"
                type="number"
                min={1}
                placeholder="Enter No. of sentences"
                onChange={addSentenceNumberToState}
              />
            </InputGroup>
             <ButtonToolbar className="p-2 border my-2">
              <Button className="m-2" variant="primary" onClick={tokenize}>
                Tokenize
              </Button>
              <Button className="m-2" variant="dark" onClick={removeStopWords}>
                Remove Stopword
              </Button>
              <Button className="m-2" variant="primary" onClick={stemDocument}>
                Stem
              </Button>
              <Button className="m-2" variant="dark" onClick={generateTfIdf}>
                TF-IDF Matrix
              </Button>
              <Button className="m-2" variant="primary" onClick={generateSVD}>
                SVD Matrix
              </Button>
            </ButtonToolbar> 
          </Col>
          <Col className="mt-5" sm={5}>
            <Card>
              <Card.Header>
                <Card.Title className="text-center">Summary</Card.Title>
              </Card.Header>
              <Form.Control
                style={{ overflowY: "scroll" }}
                as="textarea"
                rows="13"
                value={result}
              />{" "}
            </Card>
          </Col>
        </Row>
      </Container>
      <Navbar bg="dark" variant="dark" className="p-5 "></Navbar>
    </>
  );
};

export default App;
