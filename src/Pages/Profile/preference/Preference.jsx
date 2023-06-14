import Card from "./Card.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getFavoriteVendors} from "../../../Redux/Slices/profileSlice.js";
import {useEffect} from "react";


const Preference = () => {
    const dispatch = useDispatch();
    const Places = useSelector(state => state.profile.favoriteVendors);

    useEffect(() => {
        dispatch(getFavoriteVendors()).then((res) => {
            console.log(res);
        });
    },[]);

    return (
        <>
            <div style={{paddingTop:"150px"}} className="img-container w-100 d-flex flex-column justify-content-between align-items-start">
                {Places.map((place) => {
                    return (
                        <>
                            <Card place={place} />
                            <hr style={{ width: '100%', color: '#9095A0', borderWidth: 2, margin: '24px 0' }}/>
                        </>
                    )
                })
                }
            </div>
        </>
    )
}

export default Preference;