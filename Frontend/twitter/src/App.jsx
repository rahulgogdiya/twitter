import "./App.css";
import Book from "./components/Book";
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <>
      <div>
        <Book />
        <Toaster/>
      </div>
    </>
  );
}

export default App;
