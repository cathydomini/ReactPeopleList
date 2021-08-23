import React, {useEffect, useState} from 'react';
import './App.css';
import Pagination from './components/Pagination';
import Detail from './components/Detail';
import ListPeople from './components/ListPeople';
import {  Route, Switch, useHistory } from 'react-router-dom';



const App = ()=> {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchUser, setSearchUser] =useState("");
  const [dataHolder, setHolder] = useState([]);
  const itemPerPage = 10; //show 10 users at a time
  const history = useHistory();


  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then(data => data.json())
      .then(json_result => {
        setData(json_result.results);
        setHolder(json_result.results);  
       // console.log(JSON.stringify(json_result));

      });
  }, []);
   

  //show search ui
  const Search = () => {
     return (
       <div>
         <input
            type="text"
            autoFocus ={true}
            value={searchUser}
            size="30"
            maxLength="50" 
            placeholder="search user"
            onChange={handleSearchInput}
         />
       </div>
     )
  };

  //handle search input,  search by first name, last name or username
  const handleSearchInput = event =>{
    setSearchUser(event.target.value);

    let newData = [];
    if (event.target.value !== "") {
        newData = dataHolder;
        newData = newData.filter(item=>{
          const first = item.name.first.toLowerCase();
          const last = item.name.last.toLowerCase();
          const username = item.login.username.toLowerCase();
          const filter = event.target.value.toLowerCase();
         return (first.includes(filter) ||  last.includes(filter) ||  username.includes(filter))
        });
    }else{
        newData = dataHolder;
    }
    //set current to 1 
    if (Math.ceil(data.length/ itemPerPage) < itemPerPage){
      setCurrentPage(1);
    }
   setData(newData);
    
  }

  //when page number is clicked
   const paginate = (pageNumber)=>{
      setCurrentPage(pageNumber);    
   }

 //when next is clicked
   const handleNext = ()=>{
     //show 5 page number for the pagination
      if (currentPage < Math.ceil(data.length/ itemPerPage)){
        setCurrentPage(currentPage + 1)
      }
    }
  //when prev is clicked
   const handlePrev = ()=>{
     if (currentPage>1){
        setCurrentPage(currentPage - 1);
     }
   }
  //when user list is clicked and redirect to detail page
  const handleUserClick = (event)=>{  
    event.preventDefault();
    let userObj = JSON.parse(event.currentTarget.dataset.user);
    
     //pass data to history,so Detail component get it
     history.push({
       pathname:`/detail/${userObj.name.first}`,
        state: userObj 
      });
       
   }

  //get current display item
    const endIndex = currentPage * itemPerPage; //1 * 10 =10
    const startIndex = endIndex - itemPerPage // 10-10 =0
    const currentData = data.slice(startIndex, endIndex);

  //list user with pagination UI 
    const Main = ()=>{
        return(
           <>
              <Search onChange={handleSearchInput} /><br />
              <Pagination itemPerPage={itemPerPage} totalData={data.length} paginate={paginate} currentPage={currentPage} handlePrev={handlePrev} handleNext={handleNext} />
              <br />       
              <ListPeople data={currentData}  handleUserClick= {handleUserClick} />
             
            </>
        )  
    }
    return (
         <div className="container">          
           <Switch>                    
            <Route path="/detail" component={Detail} />
            <Route path="/" component={Main} />           
           </Switch>
          </div>
        );
}
export default App;
