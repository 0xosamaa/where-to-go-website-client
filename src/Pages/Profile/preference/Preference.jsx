import Card from "./Card.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getFavoriteVendors} from "../../../Redux/Slices/profileSlice.js";
import {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {vendorSearch} from "../../../Redux/Slices/searchSlice.js";
import RiseLoader from "react-spinners/RiseLoader.js";
import {useTheme} from "@mui/material/styles";


const Preference = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const Places = useSelector(state => state.profile.favoriteVendors);
    const customer = useSelector(state => state.profile.customer);
    const loading = useSelector(state => state.profile.loading);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    useEffect(() => {
        let totalPages = 0;
        if (customer.favoritePlaces?.length < 3) {
            totalPages = 1;
        }
        else {
            totalPages = Math.ceil(customer.favoritePlaces.length / 3);
        }
        setPagination({
            currentPage: 1,
            totalPages: totalPages,
        })
        dispatch(getFavoriteVendors(pagination.currentPage)).then((res) => {
            console.log(res);
        });
    },[]);

    const handlePageChange = (event, page) => {
        /*setLoading(true);
        dispatch(vendorSearch(`page=${page}`)).then((data) => {
            const { currentPage, totalPages } = data.payload.pagination;
            setPagination({ currentPage, totalPages });
            setLoading(false);
        });*/
        dispatch(getFavoriteVendors(page)).then((res) => {
            if(res.meta.requestStatus === 'fulfilled') {
                setPagination({
                    currentPage: page,
                    totalPages: pagination.totalPages,
                })
            }
        });

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "auto",
            });
        }, 0);
    };

    const override = {
        display: "block",
        margin: "30vh auto",
    };

    return (
        <>
            {loading? (
                <RiseLoader
                    color={theme.palette.primary.main}
                    loading={loading}
                    cssOverride={override}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ):(
                <>
                    <div style={{paddingTop:"150px"}} className="img-container w-100 d-flex flex-column justify-content-between align-items-start">
                        {Places.map((place) => {
                            return (
                                <>
                                    <Card key={place._id} page={pagination.currentPage} place={place} />
                                    <hr style={{ width: '100%', color: '#9095A0', borderWidth: 2, margin: '24px 0' }}/>
                                </>
                            )
                        })
                        }
                    </div>
                    <Pagination
                        count={pagination.totalPages}
                        page={pagination.currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        style={{ marginTop: 48, alignSelf: "center" }}
                    />
                </>
            )}
        </>
    )
}

export default Preference;