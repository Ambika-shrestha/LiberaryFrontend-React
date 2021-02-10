import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom';
import '../CSS/list.css'

export default class SavaData extends Component {

    constructor(props) {
        super(props)
        this.state = { 
           // savebookdata:{
                title: '' ,
                author: '',
                p_date:'',
                isbn: ''
            //}
        }
      }
      
      changeHandle = (e) =>{
        this.setState({ [e.target.name]: e.target.value})
     }

       submitHandler =(e) =>{
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
          };

        fetch(`http://localhost:3000/api/create`, requestOptions)
        .then(res => res.json())
        .then((e) => {
            alert(e.message)
            this.props.history.goBack();

          // return res;
         })  
         .catch(console.log)
           e.preventDefault()
           console.log(this.state);
       }

    render() {
        const {title, author, isbn, p_date} =this.state
        return (

          <div class="mainContainer">
            <form onSubmit= {this.submitHandler}>
            
            <div class="nav-bar">
                 <a class="active" href="#home">Library</a>
                  <a>
                  <Link  to="/save">Add Books</Link>
                  </a>
                  <div class="search-container">
                  <input  id="searchbox" type="text" placeholder="Search.." 
                  name="search" 
                  value={this.state.title} 
                  onChange={this.changeHandle}
                />

                  </div>
                </div>

            <div className="s"> 
            <h2>Add new books</h2>

            <div class="form-group">
           <div class="row">
               <label>Title</label>
               <div class="col"><input type="text"  name="title"  className="form-control" value={title} onChange={this.changeHandle}/></div>
            </div>        	
           </div>

           <div class="form-group">
           <div class="row">
               <label>Author</label>
               <div class="col"><input type="text" className="form-control" name="author" value={author} onChange={this.changeHandle}/></div>
            </div>        	
           </div>

           <div class="form-group">
           <div class="row">
               <label>Publication Date</label>
               <div class="col"><input type="text" className="form-control" name="p_date" value={p_date} onChange={this.changeHandle} /></div>
            </div>        	
           </div>
           
           <div class="form-group">
           <div class="row">
               <label>ISBN</label>
               <div class="col"><input type="text" className="form-control"  name="isbn" value={isbn} onChange={this.changeHandle}/></div>
                </div>        	
           </div>
           <br></br>
           <button class ="btn-save" type="submit">Submit</button>
            </div>  
              
          
              </form>
             </div>
          
                       )
    }
}