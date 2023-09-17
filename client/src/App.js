import React from "react";

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return(
    <div>
      {data.length > 0
        ? data.map((subject, i) => <div key={i}>{subject.name}</div>)
        : "Loading..."}
    </div>
  );
}

export default App;
