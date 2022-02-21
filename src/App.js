import './App.css';
import {Switch, Route} from 'react-router-dom';
import Login from './component/logIn';
import Banner from './component/banner';


function App() {
  return (
    <>
    
             {/* <SignIn /> */}
             <Switch>
        <Route path="/register" component={Banner} />

        <Route exact path="/" component={Login} />
      </Switch>
    </>
  );
}

export default App;
