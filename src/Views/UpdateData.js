import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom';

export default class UpdateData extends Component {

    constructor(props) {
        super(props)
        this.id = props.match.params.id
        this.state = { 
            book:{}
        }
        this.findbyid(this.id);
    }

    findbyid(id){
        fetch(`http://localhost:3000/api/getbyid/${id}`)
         .then(res => res.json())
         .then((data) => {
            console.log(data)
            this.setState({ book: data })
        })
         .catch(console.log)
    }
      
      changeHandle = (e) =>{
        this.setState({book:{...this.state.book,[e.target.name]:e.target.value}})
     }

       submitHandler =(e) =>{
        var requestOptions = {
            method: 'PUT',
            body: JSON.stringify(this.state.book),
            headers: {
                'Content-Type': 'application/json'
            }
          };

        fetch(`http://localhost:3000/api/books/${this.id}`, requestOptions)
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
        const {book} =this.state
        return (
           
            <div class="mainContainer">
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

            <form onSubmit= {this.submitHandler}>
            
            <div className="s"> 
            <h2>Update books</h2>
            <div class="form-group">
           <div class="row">
               <label>Title</label>
               <div class="col"><input type="text"  name="title"  className="form-control" value={book.title} onChange={this.changeHandle}/></div>
            </div>        	
           </div>

           <div class="form-group">
           <div class="row">
               <label>Author</label>
               <div class="col"><input type="text" className="form-control" name="author" value={book.author} onChange={this.changeHandle}/></div>
            </div>        	
           </div>

           <div class="form-group">
           <div class="row">
               <label>Publication Date</label>
               <div class="col"><input type="text" className="form-control" name="p_date" value={book.p_date} onChange={this.changeHandle} /></div>
            </div>        	
           </div>
           
           <div class="form-group">
           <div class="row">
               <label>ISBN</label>
               <div class="col"><input type="text" className="form-control"  name="isbn" value={book.isbn} onChange={this.changeHandle}/></div>
                </div>        	
           </div>
           <button class="btn-save-update" type="submit">Update</button>
            </div>  
              
              </form>
           </div>
           
                       )
    }
}