import React, {Component} from 'react';
import './App.css'

function Option (props){
    return(
        <div className="filter-locations">
            <h2>LOCATION</h2>
            <div className='map-option'>
                <select 
                    tabIndex="1"
                    placeholder="请选择" 
                    className="select-location"
                    aria-label="下拉菜单"
                    onChange={(event) => props.filterLocation(event.target.value)}
                    >
                    <option value="全部" >全部</option>
                    <option value="博物馆">博物馆</option>
                    <option value="餐厅">餐厅</option>
                </select>
            </div>
            <div className="filter-locations-results">
                <ol className='locations' 
                    aria-label="列表"
                    tabIndex="2"
                >
                    {Array.isArray(props.locationsNow) &&props.locationsNow.map((location) => (
                        <li key={location.id}>
                            {location.title}
                        </li>
                    ))}
                </ol>    
            </div>
        </div>
        )
    }

export default Option