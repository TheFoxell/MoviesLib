import React from 'react'
import { StyleSheet, Image } from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from "../components/Search";
import FilmDetail from '../components/FilmDetail';
import Favorites from "../components/Favorites";
import Home from '../components/Home'

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Derniers Films',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  }
})

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            title:'Rechercher'
        }
    },
    
    FilmDetail:{
        screen:FilmDetail
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites:{
        screen:Favorites,
        navigationOptions:{
            title:'Favoris'
        }
    }
})


const MoviesTabNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_fiber_new.png')}
            style={styles.icon}/>
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
          return <Image
            source={require('../Images/ic_search.png')}
            style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
        }
      }
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_favorite.png')}
            style={styles.icon}/>
        }
      }
    },
  },

  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
)

const styles = StyleSheet.create({
    icon: {
        width:30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNav)