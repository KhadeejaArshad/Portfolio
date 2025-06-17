import { useContext } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { savePlaces } from "../util/database";
import { PlaceContext } from "../store/place-context";


function AddPlaces({navigation}){
    const PlaceCtx=useContext(PlaceContext);
    async function createPlaceHandler(place){
        const response=await savePlaces(place);
        PlaceCtx.title=" "
        PlaceCtx.image=" "
        
        navigation.navigate('AllPlaces')
    }
        return <PlaceForm onCreatePlace={createPlaceHandler}/>

    
    

}
export default AddPlaces;