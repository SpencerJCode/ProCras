import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';

const Flashzone = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const studyDeck = location.state.studyDeck;

    
}

export default Flashzone