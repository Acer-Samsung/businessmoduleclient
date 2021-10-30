import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {Button, CardContent, Collapse, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Navbar from "../Components/Navbar";

const Businesses = () => {
    function ExpandMoreIcon() {
        return null;
    }
    const [vacancies,setVacancies] = useState([]);

    useEffect(()=>{
        axios.get(`${API_PATH}/api/v1/businesses`)
            .then((res)=>{
                console.log(res)
                setVacancies(res.data.body.content)
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
    },[])
    const [loading,setLoading] = useState(true);
    const [expandedId, setExpandedId] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };

    return (
        <div>
            <Navbar/>
            {vacancies.map((item, i) => (
            <div style={{
                width: "80%",
                marginLeft: "10%",
                border: "0.5px solid black",
                borderRadius:"10px",
                position: "relative",
                padding: "10px",
                boxSizing: "border-box",
                marginTop: "10px",
                marginBottom: "10px",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{display: 'flex'}}>
                        <Typography variant={"h5"} fontWeight={600} color={"black"}>
                            {item.name} {item.businessType}
                        </Typography>
                    </div>

                    <ExpandMore
                        onClick={() => handleExpandClick(i)}
                        aria-expanded={expandedId === i}
                        aria-label="show more"
                    ><ExpandMoreIcon/>
                    </ExpandMore>
                </div>

                <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                    <CardContent>

                        <div style={{
                            display: "flex",
                            flexDirection:"column",
                        }}>
                            <Typography
                                color={"black"}><span style={{fontWeight:"550"}}>Created at:</span> {item.createdAt}
                            </Typography>
                            <Typography
                                color={"black"}><span style={{fontWeight:"550"}}>Address: </span>{item.address}
                            </Typography>
                            <Typography
                                color={"black"}>{item.description ?( <span style={{fontWeight:"550"}}>Description:</span>  `${item.description}`) : ""}
                            </Typography>
                            <Typography
                                color={"black"}>{item.motto ? <span style={{fontWeight:"550"}}>Motto:</span> `${item.motto}` : ""}
                            </Typography>
                        </div>



                    </CardContent>
                </Collapse>
            </div>
            ))
            }
        </div>
    );
};

export default Businesses;