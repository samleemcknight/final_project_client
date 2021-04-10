import React, {useState, useEffect} from 'react'
import { Text, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Redirect } from 'react-router-native'

import AuthModel from '../../models/auth'

const styles = require('../../style/styles')

export default function Signup(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(email)
  }, [email])

  useEffect(() => {
    setUsername(username)
  }, [username])

  useEffect(() => {
    setPassword(password)
  }, [password])

  const register = () => {
    
    AuthModel.register({
      username: username,
      password: password,
      email: email
    }).then(res => {
      console.log(res)
    })
  }

  return(
    <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text style={{fontSize: 35, marginTop: -20, marginBottom: 50}} >Create an Account:</Text>
      <TextInput 
        style={styles.loginForm}
        placeholder="email"
        autoCapitalize="none"
        onChangeText={(email) => {setEmail(email)}}
        onSubmitEditing={() => {}}
        value={email}/>
      <TextInput 
        style={styles.loginForm}
        placeholder="username"
        autoCapitalize="none"
        onChangeText={(text) => {setUsername(text)}}
        onSubmitEditing={() => {}}
        value={username}/>
      <TextInput 
        style={styles.loginForm}
        placeholder="password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(password) => {setPassword(password)}}
        onSubmitEditing={() => {}}
        value={password}/>
      <TouchableOpacity
        style={{backgroundColor: "#1CAAB3", width: "40%", borderRadius: 25, padding: 6, marginTop: 10}}
        onPress={register}
        >
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}