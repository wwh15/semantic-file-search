import React from "react"

export default function App() {

  const [data, setData] = React.useState(
    {
      name:"",
      age:0, 
      date:"",
      programming:""

    }
  )

  // Using useEffect for single rendering
  React.useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setData({
                name: data.Name,
                age: data.Age,
                date: data.Date,
                programming: data.programming,
            });
        })
    );
}, []);

  return (
    
    <div className="App">
        <h1>HACKDUKE</h1>
        <header className="App-header">
            <h1>React and flask</h1>
            {/* Calling a data from setdata for showing */}
            <p>{data.name}</p>
            <p>{data.age}</p>
            <p>{data.date}</p>
            <p>{data.programming}</p>
            

        </header>
    </div>
  )
}
