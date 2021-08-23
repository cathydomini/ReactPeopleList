import './Pagination.css';


const Pagination = ({itemPerPage, totalData, paginate, currentPage , handlePrev, handleNext})=>{
  const pageNumbers = [];
 
  for (let i = 1; i<= Math.ceil(totalData / itemPerPage); i ++){
      pageNumbers.push(i);
  }
  
  if (pageNumbers.length >0){
    return (
        <ul className="pagination">   
        <li><button onClick={handlePrev}>Prev</button></li>
        {         
            pageNumbers.map((number) =>(
                <li key = {number} 
                    id ={number}
                    onClick={()=>paginate(number)}
                    className ={currentPage === number ? "active":null}
                    >
                    
                        {number}
                    
                </li>
            ))
        }      
        <li><button onClick={handleNext}>Next</button></li>
        </ul>
    )
  }else{
        return null;
  }

} 
export default Pagination;