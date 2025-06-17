import { useState,useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { getPlaces } from "../util/database";

function AllPlaces(){
    const [loadedPlaces,setLoadedPlaces]= useState([]);

    const isFocused=useIsFocused();
    useEffect(() =>{
        async function loadPlaces(){
            const places=await getPlaces();
            console.log("places:",places);
            
            setLoadedPlaces(places);


            
        }
        if(isFocused){
            loadPlaces();
            //setLoadedPlaces((curPlaces) =>[...curPlaces, route.params.place])
        }
    },[isFocused])

    return <PlacesList places={loadedPlaces}/>

}
export default AllPlaces;