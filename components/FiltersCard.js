import React from 'react'

export default function FiltersCard({ data, name, f_data, handleFilter }) {
   
    return (
        <div className="filter-card">
            <p className="header">{name}</p>
            <ul className="list">
                {data.map((item, index) => (
                    <>
                        {name==="ram"&&  <li>
                       
                       <input type="checkbox" checked={f_data.ram == item?true:false} onClick={()=>handleFilter(name,item)} name={`${name}+${index}`} style={{marginRight:"10px"}}/>
                       <label for={`price${index}`}>{item}</label>
                        </li>}
                        {name==="colours"&&  <li>
                       
                       <input type="checkbox" checked={f_data.colours == item?true:false} onClick={()=>handleFilter(name,item)} name={`${name}+${index}`} style={{marginRight:"10px"}}/>
                       <label for={`price${index}`}>{item}</label>
                        </li>}
                        {name==="internal_memory"&&  <li>
                       
                       <input type="checkbox" checked={f_data.internal_memory == item?true:false} onClick={()=>handleFilter(name,item)} name={`${name}+${index}`} style={{marginRight:"10px"}}/>
                       <label for={`price${index}`}>{item}</label>
                        </li>}
                        {name==="brands"&&  <li>
                       
                       <input type="checkbox" checked={f_data.brands == item?true:false} onClick={()=>handleFilter(name,item)} name={`${name}+${index}`} style={{marginRight:"10px"}}/>
                       <label for={`price${index}`}>{item}</label>
                        </li>
                        }
                        {name==="price"&&  <li>
                       
                       <input type="checkbox" checked={f_data.price.includes(item)} onClick={()=>handleFilter(name,item)} name={`${name}+${index}`} style={{marginRight:"10px"}}/>
                       <label for={`price${index}`}>{item}</label>
                        </li>
                        }
                  
                    </>
                   
             ))}
            </ul>
            
        </div>
    )
}
