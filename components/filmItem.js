import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {getImageFromApi} from '../API/TMDBApi'

class FilmItem extends React.Component {
    
    _displayFavoriteImage(){
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }
    
    render(){
        const {film, displayDetailForFilm} = this.props
        return(
            <TouchableOpacity 
            onPress={()=> displayDetailForFilm(film.id)}
            style={styles.main}>
                <Image 
                    style={styles.image}
                    source={{uri:getImageFromApi(film.poster_path)}}
                />

                <View style={styles.Content}>
                    
                    <View style = {styles.Header}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.movie_title}> {film.title} </Text>
                        <Text style={styles.Vote}> {film.vote_average} </Text>
                    </View>

                    <View style={styles.Description}>
                        <Text style={styles.Description_text} numberOfLines={6}> {film.overview} </Text>
                    </View>

                    <View style={styles.Date}>
                        <Text style={styles.Date_text}> Sorti le {film.release_date} </Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:'row'
    },

    image:{
        flex:1,
        backgroundColor:'gray',
        width:120,
        height:180,
        margin:5,
    },

    Content:{
        flex:2,
        flexDirection:'column',
        margin:5,
    },

    Header:{
        flex:2,
        flexDirection:'row',
    },

    movie_title:{
        flex:3,
        paddingRight:5,
        fontWeight:'bold',
        fontSize:20,
        flexWrap:'wrap',
    },

    Vote:{
        flex:1,
        fontWeight:'bold',
        fontSize:26,
        color:'#666666'
    },

    Description:{
        flex:4,
    },

    Description_text:{
        fontStyle:'italic',
        color:'#666666'
    },

    Date:{
        flex : 1,
    },

    Date_text:{
        textAlign:'right',
        fontSize:14
    },

    favorite_image:{
        width: 25,
        height: 25,
        marginRight: 5
    }


})


export default FilmItem