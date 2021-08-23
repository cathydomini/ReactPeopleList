const ListPeople = ({data, handleUserClick})=>{
    return (<div>
      {data.map((user, index) => (   
          <div key={index} >
              <a href="!#" data-user={JSON.stringify(user)} onClick={handleUserClick}>           
                <img src={user.picture.thumbnail} alt={user.name.first} />          
                <div>First Name:  {user.name.first} </div>
                <div>Last Name: {user.name.last}</div>
                <div>User Name: {user.login.username}</div>
                <hr />
              </a>  
         </div>
         
       ))}
      
   </div>);
  }

  export default ListPeople;