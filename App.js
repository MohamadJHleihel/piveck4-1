import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';

export default function App() {
  const [mytext, setMytext] =useState("Hej Hej");
  const [mynumber,setmynumber] = useState(0);
  const [categories, setCategories] = useState (["Appelsin, Bannan"]);
  
  
  function loadjoke() {
    fetch('https://api.chucknorris.io/jokes/random')
    .then (response => response.json())
    .then(json => {
     console.log(json.value);
     setMytext(json.value);
    })
    .catch(error => {
     console.log("Nu blev det fel");
    });
  }
  function loadCategories (){
    fetch('https://api.chucknorris.io/jokes/categories')
    .then (response => response.json())
    .then(json => {
     console.log(json);
     setCategories(json);
    })
    .catch(error => {
     console.log("Nu blev det fel");
    });
  }



  function loadJokeForCategory(){

    console.log ("nu ladda från kategori");
    console.log(jokecat);
    fetch('https://api.chucknorris.io/jokes/random?category='+ jokecat)
    .then (response => response.json())
    .then(json => {
     console.log(json.value);
     setMytext(json.value);
    })
    .catch(error => {
     console.log("Nu blev det fel");
    });
  }



   useEffect(() =>{
    console.log("Hurra use effect");

   
    loadCategories();
    
    console.log("Detta är i slutet");


   }, []);
  


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.butttonStyle}>{mytext}</Text>
      <Text>{mynumber}</Text>
      <Button title='plus' onPress ={() => {
        setmynumber(mynumber+1);
      }}/>

      <Button style={styles.butttonStyle} title ='New Random Joke' onPress={() => {
        loadjoke();
      }
      
    }/>

    <FlatList 
    data ={categories}
    renderItem ={(item) => (
     <TouchableOpacity onPress={() => {
      loadJokeForCategory(item.item);
     }}>
     <Text>{item.item}</Text>
    </TouchableOpacity>
    
    )}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:100,
  },
  butttonStyle :{
    color:'green',
    backgroundColor:'lightblue',
  }
});
