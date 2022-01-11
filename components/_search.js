import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from '../components/filmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList'


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
            }, 
        this._loadfilm())
    }

    _displayDetailForFilm = (idfilm) => {
        console.log('test')
        this.props.navigation.navigate("FilmDetail", {idfilm: idfilm})
    }
        
    _searchTextInputChanged(text){
        this.searched_text = text
    }


    render(){
        return(
            <View style={styles.search_container}>
                <TextInput 
                onSubmitEditing={ () => this._searchFilms()} 
                onChangeText={ (text) => this._searchTextInputChanged(text)} 
                style={styles.text_input} 
                placeholder="Titre du film"
                />

                <Button style={styles.search_button}title="Rechercher" onPress={() => this._searchFilms()}/>

                <FilmList
                    films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadfilm} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                />
                {this._displayLoading()}

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