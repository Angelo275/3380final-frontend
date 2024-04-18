import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "mongodb+srv://AngeloPal:300363695@cluster0.aqefx3v.mongodb.net/ArtList",
    // baseURL: "https://3380final-backend-5iv2.vercel.app/art",
    headers: {
        "Content-Type": "application/json",
    },
});


export default instance;