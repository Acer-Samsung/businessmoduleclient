import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH} from "../Tools/APIS";
import {Button, CardContent, Collapse, colors, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {Link} from "react-router-dom";
import Navbar from "../Components/Navbar";

const Businesses = () => {
    function ExpandMoreIcon() {
        return null;
    }

    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        axios.get(`${API_PATH}/api/v1/businesses`)
            .then((res) => {
                console.log(res)
                setVacancies(res.data.body.content)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    const [loading, setLoading] = useState(true);
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
                    borderRadius: "10px",
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
                                flexDirection: "column",
                            }}>
                                <Typography
                                    color={"black"}><span
                                    style={{fontWeight: "550"}}>Created at:</span> {item.createdAt}
                                </Typography>
                                <Typography
                                    color={"black"}><span style={{fontWeight: "550"}}>Address: </span>{item.address}
                                </Typography>
                            </div>


                            <Button variant={"outlined"} style={{margin: "10px 0 -15px 0"}} color={"primary"}><Link
                                to={"/aboutbusiness/"+item.id} style={{textDecoration: "none",color: colors.blue}}>More</Link></Button>
                        </CardContent>
                    </Collapse>
                </div>
            ))
            }
        </div>
    );
};

export default Businesses;