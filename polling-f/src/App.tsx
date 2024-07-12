import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [renderData, setRenderData] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [intervalId, setIntervalId] = useState<any>(null);

  const postData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/shakir", {
        msg: inputValue,
      });
      console.log(response.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const fetchData = async () => {
    console.log("getting data...");
    try {
      const response = await fetch("http://localhost:3000/ana");
      if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
      }
      const data = await response.text();
      console.log(data);
      setRenderData(data);

      if (data !== "") {
        clearInterval(intervalId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
    if (renderData === "") {
      const id = setInterval(fetchData, 1000);
      setIntervalId(id);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{renderData === "" ? null : <div>{renderData}</div>}</div>
    </div>
  );
}

export default App;
