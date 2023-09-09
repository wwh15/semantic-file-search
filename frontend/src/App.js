import React from "react"

export default function App() {

  const [inputValue, setInputValue] = React.useState("")
  const [result, setResult] = React.useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/add_one', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: parseInt(inputValue) }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
//   // Using useEffect for single rendering
//   React.useEffect(() => {
//     // Using fetch to fetch the api from
//     // flask server it will be redirected to proxy
//     fetch("/data").then((res) =>
//         res.json().then((data) => {
//             // Setting a data from api
//             setData({
//                 name: data.Name,
//                 age: data.Age,
//                 date: data.Date,
//                 programming: data.programming,
//             });
//         })
//     );
// }, []);

  return (
    
    <div className="App">
        <h1>Semantic File Search Engine</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter a number"
            value = {inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        {result != "" && <p>Result: {result}</p>}


    </div>
  )
}
