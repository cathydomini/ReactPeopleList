import { useHistory, useLocation } from "react-router-dom";
import './Detail.css'

const Detail = () => {
   
    const history = useHistory();
    const location = useLocation();  //get data passed from main used history
   
    if (location.state){
        return (
            <div className="detail">
                
                <h1>User Details</h1>
                <div>Name:{location.state.name.first} {location.state.name.last}</div>
                <div>Email:{location.state.email}</div>
                <div>Location:{location.state.location.street.number} {location.state.location.street.name}
                            {location.state.location.city} {location.state.location.postcode} {location.state.location.country}
                </div>       
                
                <button onClick={() => history.goBack()}>Back</button>
            </div>
        )
    }else{
        return  <button onClick={() => history.goBack()}>Back</button>;
    }
}

export default Detail;