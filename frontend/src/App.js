import React from "react"

export default function App() {

  const [inputValue, setInputValue] = React.useState("")
  const [result, setResult] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/process_string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputString: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    
    <div className="App">
        <h1>Semantic File Search Engine</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a search term"
            value = {inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Process</button>
        </form>

        {result != "" && <p>Result: {result}</p>}


    </div>
  )
}
