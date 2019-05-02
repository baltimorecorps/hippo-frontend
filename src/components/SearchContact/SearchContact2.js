import React from 'react';

import SearchBar from './SearchBar';
import ContactListFromApi2 from './ContactListFromApi2';
import {Container} from 'semantic-ui-react'

class SearchContact2 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }


    /*onSearchSubmit = async (term) => {
        const response = await unsplash.get('/search/photos', {
            params: { query: term }

        });
        this.setState({images: response.data.results});
    }*/
    onSearchSubmit = () =>{

            fetch("https://randomuser.me/api/?results=15",{responseType:'json',})
              .then(res => res.json())
              .then(
                (json) => {
                    this.setState({items: json.results});
                    console.log(json);
                    console.log(json.results);

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  console.log(error.message);
                }
              )
    }
    componentDidMount(){
        this.onSearchSubmit();
    }



    render (){
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <Container>
                    <SearchBar onSubmit={this.onSearchSubmit}/>
                    <ContactListFromApi2 items={this.state.items} />
                </Container>


                {/*<ContactList images={this.state.items} />*/}
             </div>
        );
    }
}
export default SearchContact2;
