import { useState } from "react";
import axios from "axios";

export default function TruthOrDare() {
  const [result, setResult] = useState("");

  const chooseTruthOrDare = async (choice) => {
    if (choice === "truth") {
      const response = await axios.get("/api/truths");
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      setResult(response.data.data[randomIndex].text);
    } else {
      const response = await axios.get("/api/dares");
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      setResult(response.data.data[randomIndex].text);
    }
  };

  return (
    <div>
      <button onClick={() => chooseTruthOrDare("truth")}>Truth</button>
      <button onClick={() => chooseTruthOrDare("dare")}>Dare</button>
      {result && <p>{result}</p>}
    </div>
  );
}
