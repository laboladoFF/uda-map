import React, { Component } from 'react';
import './search.css'

class Search extends Component{
    state = {
        query: ''
    }

    render(){
        return(
            <div className='mapSearch'>
                <input type="text" 
                    placeholder="Search" 
                    value={this.state.query} 
                    onChange = {(event) => this.updateQuery(event.target.value)}
                />
                <button className='btnSearch' value='搜索'>搜索</button>
                <div>
                    <ul>

                    </ul>
                </div>
            </div>
            
        );
    }
}

export default Search;