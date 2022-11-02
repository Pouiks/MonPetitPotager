import React, {useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import baseUrl from '../Config/baseUrl';
import Button from '../Components/Button';
import DetailPlant from '../Components/PlantDetail';
import ImgTop from '../Components/ImgTop';


const PlantDetail = () => {
    const navigate = useNavigate();
    const [plant, setPlant] = useState('')

    const getPlant = (id) => {
        try {
                axios.get(baseUrl + '/plants/' + id).then((res) => {
                setPlant(res.data.plant);
            });
        } catch(error){
            console.error(error);
        }
    }

    const params = useParams();

    useEffect(() => {
        getPlant(params.id)
    }, [params.id])

    return (
        <div>
        <ImgTop src="/images/shovel-planted-soil-garden-flowerpots.jpg" alt="image decorative" />
        <Button onClick={() => navigate(-1)} content="< Retour"/>
        <DetailPlant plant={plant}/>
        </div>
    )
}

export default PlantDetail;