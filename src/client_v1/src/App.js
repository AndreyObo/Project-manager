import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Users from "./Pages/Users/Users"
import Ogranization from "./Pages/Organization/Ogranization"
import Header from "./Components/Header/Header"
import Projects from "./Pages/Projects/Projects"
import SideBar from './Components/SideBar/SideBar'
import Task from './Pages/Task/Task'
import './App.css';


function App() {



  return (
    <div className="App"> {/*Корневой элемент приложения*/}

  
      <BrowserRouter> {/*Компонент для навигации по приложению*/}
      <div>
      <Header/> {/*Строка заголовка*/}
      </div>
       <div className="MainContainer"> 
        <SideBar/>
        <div className="Wrap">
       <Routes>
         {/*Маршруты приложения*/}
       <Route path='/'>
          <Route index element={<Users/>} />
       </Route>
       <Route path='/users'>
          <Route index element={<Users/>} />
       </Route>
       <Route path='/orgs'>
          <Route index element={<Ogranization/>} />
       </Route>
       <Route path='/proj'>
       <Route index element={<Projects/>} />
       </Route>
       <Route path='/tasks'>
       <Route index element={<Task/>} />
       </Route>
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
