import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom';
import '../CSS/list.css'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookList:[],
            search:""
        };
        this.handleClickEvent = this.handleClickEvent.bind(this);
        
    }
    
    componentDidMount(){
         this.getAllData()
    }
    
    //for search
    changeHandle = (e) =>{
        this.setState({
             [e.target.name]: e.target.value
            })

        if(e.target.value != null && e.target.value != ""){
            this.handleClickSearch(e.target.value)
        }else{
            this.getAllData()
        }
     }

     //for search 
     handleClickSearch(text){
       var requestOptions = {
        method: 'POST',
        body:JSON.stringify({"name":text}),
        headers: {
            'Content-Type': 'application/json'
        }
      };

    fetch(`http://localhost:3000/api/search`, requestOptions)
    .then(res => res.json())
    .then((e) => {
        this.setState({bookList:e})
     })  
     .catch(console.log)
       
       console.log(this.state);
   }

    

    getAllData(){
        fetch(`http://localhost:3000/api/books`)
         .then(res => res.json())
         .then((data) => {
             console.log(data)
            this.setState({ bookList: data })
        })
         .catch(console.log)
    }

    handleClickEventU(id){
        this.props.history.push(`/update/${id}`)
    }
    handleClickEvent(event){
        var requestOptions = {
            method: 'DELETE'
          };
            
        const id = event;
        fetch(`http://localhost:3000/api/books/${id}`, requestOptions)
         .then(res => res.json())
         .then((data) => {
            this.getAllData();  
        })
         .catch(console.log)

    }

    render() {
        return (
            <div class="mainContainer">
             <div>
             
             </div>  

               <div id="addbutoon"><Link  to="/save">Add Books</Link></div>
                <input id="searchbox" type="text" placeholder="Search.." 
                name="search" 
                value={this.state.title} 
                onChange={this.changeHandle}
                />

                <table  align="center" className="table-bar">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Author</th>
                            <th scope="col">Publication Date</th>
                            <th scope="col">Action</th>
                        </tr>
                        {this.state.bookList.map((booksLists, index)=>(
                            <tr key = {index}>
                                <td>{booksLists.book_id}</td>
                                <td>{booksLists.title}</td>
                                <td>{booksLists.isbn}</td>
                                <td>{booksLists.author}</td>
                                <td>{booksLists.p_date}</td>
                                <td>
                                    <button onClick={() => this.handleClickEvent(booksLists.book_id)}>Delete</button>
                                    <button onClick={() => this.handleClickEventU(booksLists.book_id)}>Update</button>
                                </td>
                            </tr>           
                        ))}
                    </thead>
                </table>
            
            </div>
        )
    }
}