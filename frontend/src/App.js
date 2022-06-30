import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <Router>
      <div className="Container dark">
        <div className="app">
          <Header />
          <Route path="/" exact component={NotesListPage} />
          <Route path="/note/:id" component={NotePage} />
        </div>
      </div>
    </Router>
  );
}

export default App;