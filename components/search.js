import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import movies from '../Helpers/moviesData'
import FilmItem from '../components/filmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component{

    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading : false
        }
        this.searched_text = ""
    }

    _loadfilm(){

        if(this.searched_text.length > 0){
            this.setState({isLoading: true})
            getFilmsFromApiWithSearchedText(this.searched_text, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
               
                this.setState( {
                films: this.state.films.concat(data.results),
                isLoading:false
                })
            }
        )}
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _searchFilms(){
        this.page = 0,
        this.totalPages = 0,
        this.setState({
                films:[]
            }, this._loadfilm())
    }

    _displayDetailForFilm = (idfilm) => {
        this.props.navigation.navigate("FilmDetail", {idfilm: idfilm})
    }
        
    _searchTextInputChanged(text){
        this.searched_text = text
    }


    render(){
        return(
            <View style={styles.search_container}>
                <TextInput onSubmitEditing={ () => this._searchFilms()} onChangeText={ (text) => this._searchTextInputChanged(text)} style={styles.text_input} placeholder="Titre du film"/>
                <Button style={styles.search_button}title="Rechercher" onPress={() => this._searchFilms()}/>

                <FlatList

                    data={this.state.films}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={ ({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
                    onEndReachedThreshold={1}
                    onEndReached={() =>{
                        console.log("reached")
                        if(this.page < this.totalPages){
                            this._loadfilm()
                        }
                    }}                
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({

    search_container:{
        backgroundColor: '#fff',
        //alignItems: 'center',
    },

    text_input: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },

    search_button:{
        
    },

    loading_container:{
        position:'absolute',
        left:0,
        right:0,
        top:100,
        bottom:0,
        alignItems:'center',
        justifyContent:'center'
    }
})


export default Search