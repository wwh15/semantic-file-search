import React from "react"

// defines React component App as default export from module
export default function App() {

  const [inputValue, setInputValue] = React.useState("") 
  const [matches, setMatches] = React.useState(0)
  const [result, setResult] = React.useState([]) 

  // resultArr is updated when result is updated
  const resultArr = result.map(item =>
     <div className="result">
      <h1 className="result-name">
        {item.Name} 
      </h1>
      <p className="result-description">
        {item.Description}
      </p>
      <p>
        {item.Rating}
      </p>
     </div>
     ) // creates array of paragraph elements, each item in result is its own paragraph

  // async function to handle form submission
  const handleSubmit = async (e) => { 
    e.preventDefault(); // prevents empty form submissions (cause page to refresh)

    try {
      const response = await fetch('/process_string', { // fetches data from server, awaits until fetched
        method: 'POST', // sets HTTP method to POST
        headers: {
          'Content-Type': 'application/json', // content sent is JSON formatted
        },
        body: JSON.stringify({ inputString: inputValue, number: matches }), // sends current value of inputValue
      });

      if (response.ok) { // checks if HTTP response is 200-299
        const data = await response.json(); // parses JSON response from server, assigns to data, awaits till json parsed
        setResult(data.output); // updates result with output from parsed response
      }
    } catch (error) {
      console.error('Error:', error); // logs errors to console
    }
  };


  // JSX return statement, defines component (App) render
  return (
    <div className = "App"> 
        {/*renders heading for component*/}
        <h1> Semantic Podcast Search Engine </h1> 

        {/*creates form element onSubmit, when form is submitted handleSubmit called*/}
        <form onSubmit = {handleSubmit}> 
          {/*renders input search bar, value bound to inputValue*/}
          <input 
            type = "text"
            placeholder = "Enter a search term"
            value = {inputValue}
            onChange = {(e) => setInputValue(e.target.value)} // updates inputValue when event object (e) {input} is changed
          />
          {/* renders number input for how many entries on screen */}
          <input
            type = "number"
            placeholder = "How many entries?"
            value = {matches}
            onChange={(e) => setMatches(e.target.value)}
          />
          {/*renders button that submits form*/}
          <button type = "submit"> Process </button>
        </form>

        {/*renders paragraph containing results only result is not empty*/}
        {result != "" && <p> Result: {resultArr} </p>} 
    </div>
  )
}
