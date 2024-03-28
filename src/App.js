import logo from './logo.svg';
import './App.css';
import useFetch from './useFetch';
import TodoList from "./toDoList"

function App() {
  const {data, loading, error, refresh} = useFetch("https://jsonplaceholder.typicode.com/posts");
  console.log(loading);
  if (loading)
  {
    return (
      <h1>Loading...</h1>
    );
  }
  else if (error)
  {
    return (
      <>
        <h1>Sorry, Error occured while loading the content of the page</h1>
        <button onClick={() => refresh("https://jsonplaceholder.typicode.com/posts")}>Click me to Refresh the page!</button>
        </>
    );
  }
  
  console.log(data);
  return (
    <div className="App">
      <TodoList></TodoList>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      The data is successfully loaded!
      <button onClick={() => refresh("https://jsonplaceholder.typicode.com/posts")}>Click me to Refresh the page!</button>
      <h1>
        Posts:
      </h1>
      {
        data?.map((elem, ind) => 
          <ul>
            <li>ID: {elem.id} </li>
            <li>title: {elem.title}</li>
            <li>Body: {elem.body}</li>
          </ul>
        )
      }
    </div>
  );
  
}

export default App;
