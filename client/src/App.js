import React from "react";

function App() {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>{!data ? "Loading..." : data}</h1>
    </div>
  );
}

export default App;
