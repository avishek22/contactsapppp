import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {View,Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect } from 'react/cjs/react.development'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ContactsComponent from '../../components/ContactsComponent'
import { useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../../context/Provider'
import getContacts from '../../context/actions/contacts/getContacts'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Contacts=()=>{
    const {setOptions,toggleDrawer}=useNavigation()
    const [sortBy,setSortBy]=useState(null)
    const[modalVisible,setModalVisible]=useState(false)
    const {
        contactsDispatch,
        contactsState: {
          getContacts: {data, loading, error},
        },
      } = useContext(GlobalContext);
    //console.log(`data`, data)
       useEffect(() => {
         getContacts()(contactsDispatch);
       }, []);

      const getSettings=async()=>{
        const sortPref=await AsyncStorage.getItem('sortBy')
        if(sortPref){
          setSortBy(sortPref)
        }

      }
       useFocusEffect(
         React.useCallback(()=>{
           getSettings()

           return ()=>{

           }
         },[])
       )
    //console.log(contactsState)
    useEffect(()=>{
        setOptions({headerLeft:()=><TouchableOpacity onPress={()=>{
            toggleDrawer()
        }}><MaterialIcon name="menu" size={21} style={{padding:10}} ></MaterialIcon></TouchableOpacity>})
    })
    return (
        <ContactsComponent modalVisible={modalVisible} setModalVisible={setModalVisible} data={data} loading={loading} sortBy={sortBy}></ContactsComponent>
    )
}

export default Contacts