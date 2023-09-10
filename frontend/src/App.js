import React from "react"

// defines React component App as default export from module
export default function App() {

  const [inputValue, setInputValue] = React.useState("") 
  const [matches, setMatches] = React.useState(0)
  const [result, setResult] = React.useState([]) 


  function Star({ percentage }) {
    return (
      <div className="star">
        <span className="star-empty">☆</span>
        <div className="star-fill" style={{ width: `${percentage}%` }}>
          ★
        </div>
      </div>
    );
  }
  // resultArr is updated when result is updated
  function Rating({ value }) {
    return (
      <div className="rating">
        {[...Array(5)].map((_, index) => {
          const fillPercentage = Math.min(Math.max((value - index) * 100, 0), 100);
          return <Star key={index} percentage={fillPercentage} />;
        })}
      </div>
    );
  }

  const resultArr = result.map(item => {
    const roundedRating = Math.round(item.Rating * 100) / 100;
    const isRatingValid = !isNaN(roundedRating) && item.Rating !== null;
    
    return (
        <div className="result">
            <h1 className="result-name">
                {item.Name} 
            </h1>
            <p className="result-rating">
                {isRatingValid 
                    ? <>
                        {roundedRating} <Rating value={roundedRating} />  reviewed by {item.Rating_Volume}
                      </>
                    : "No reviews"
                }
            </p>
            <p className="result-description">
                {item.Description}
            </p>
            <p className="result-genre">
                Genre: {item.Genre}
            </p>
        </div>
    );
});// creates array of paragraph elements, each item in result is its own paragraph

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
    <div className="App"> 
      <h1> Semantic Podcast Search Engine </h1> 
  
      <form onSubmit={handleSubmit}> 
        <input 
          type="text"
          placeholder="Enter a search term"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
  
        <input
          type="number"
          placeholder="How many entries?"
          value={matches}
          onChange={(e) => setMatches(e.target.value)}
        />
  
        <button type="submit"> Search </button>
      </form>
  
      {/* Renders the results only if result array has items */}
      {result.length > 0 && resultArr} 
    </div>
  )
}
