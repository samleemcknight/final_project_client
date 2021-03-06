import React, { useState, useEffect } from 'react'
import {View, Text, Button, Alert, ScrollView} from 'react-native'
import {Link, Route, NativeRouter} from 'react-router-native'

import EditCookbook from './EditCookbook'

import CookbookModel from '../models/cookbook'
import CookbookCard from './CookbookCard'

const styles = require("../style/styles")

export default function ShowCookbook(props) {
  const [recipe, setRecipe] = useState()
  
  useEffect(() => {
    CookbookModel.show(props.match.params.id, "title")
    .then(res => {
      setRecipe(res.recipe)
    })
  }, [])

  const deleteRecipe = () => {
    CookbookModel.deleteRecipe(props.match.params.id)
    // automatically redirects after 700ms
    setTimeout(() => {
      props.history.push("/Cookbook")
    }, 700);
  }

  const deleteDialog = () => {
    Alert.alert(
      "Delete Recipe?",
      "Are you sure you want to delete this recipe? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: deleteRecipe,
        }
      ]
    )
  }

  return (
    <NativeRouter>
    <ScrollView style={{flex:1, marginTop: 100}}>
      { recipe 
      ? 
      <>
      <CookbookCard {...recipe} /> 
      <Text style={{padding: 10, fontSize: 18}} >
        <Text style={{fontWeight: "bold"}}>Ingredients: </Text><Text>{recipe.ingredients}</Text>
      </Text>
      <Text style={{padding: 10, fontSize: 18}} >
        <Text style={{fontWeight: "bold"}}>Instructions: </Text><Text>{recipe.instructions}</Text>
      </Text>
      <Link style={{marginBottom: 5}} to={`/Edit/${recipe.id}`} >
        <Text style={{textAlign: "center", fontSize: 18, color: "blue"}} >Edit</Text>
      </Link>
      <View style={{marginBottom: 20}} >
        <Button title="Remove from Favorites" onPress={deleteDialog} color="red"/>
      </View>
      </>
      :
      <Text>Loading...</Text>
      }
      <Route exact path="/Edit/:id" render={() => <EditCookbook recipe={recipe} history={props.history} />} />
    </ScrollView>
    </NativeRouter>
  )
}