import React, { useState, useEffect } from 'react';
import { getAllArt, addBid } from './function.js';

const Main = () => {
    const [arts, setArts] = useState([]);
    const [errorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllArt();
                if (result) {
                    setArts(result.data);
                }
            } catch (error) {
                console.error("Error fetching arts:", error);
            }
        };
        fetchData();
    }, []);


    const handleBidSubmit = async (artId, user, bidAmount) => {
        try {
            // ...existing code to check highest bid
    
            const result = await addBid(artId, { user, bid: bidAmount });
            if (result.status === 200) {
                setArts(prevArts => {
                    const updatedArts = prevArts.map(art => {
                        if (art._id === artId) {
                            return { ...art, bids: [...art.bids, { user, bid: bidAmount }] };
                        }
                        return art;
                    });
                    return updatedArts;
                });
            }
        } catch (error) {
            console.error("Error adding bid:", error);
        }
    };
    

    return (
        <div className="App">
            <div className="photo-gallery">
                {arts.map((art) => (
                    <div className="photo-container" key={art._id}>
                        <div className="photo">
                            <img src={art.src} alt={art.alt} width="200" />
                        </div>
                        <div className="comments-section">
                            <h4>Bids</h4>
                            <ul>
                                {art.bids.map((bid, index) => (
                                    <li key={index}><strong>{bid.user}:</strong> ${bid.bid}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="addbid">
                            <form className="comment-form" onSubmit={(e) => {
                                e.preventDefault();
                                const user = e.target.elements.user.value;
                                const bidAmount = e.target.elements.bidAmount.value;
                                handleBidSubmit(art._id, user, bidAmount);
                                e.target.reset();
                            }}>
                                <input type="text" name="user" placeholder="Your name" />
                                <input type="number" name="bidAmount" placeholder="Add a higher bid" />
                                <button type="submit">Submit Your Higher Bid</button>
                            </form>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
