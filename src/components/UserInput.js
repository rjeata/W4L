import React, { useState } from 'react';

function UserInputForm() {
    // values for user input
    const [InputData, setInputData] = useState({
        keyword: '',
        maxPrice: '',
        opennow: '',
        maxDistance: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...InputData,
            [name]: value
        });
    };

    // send user input to API after submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(InputData)
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        // display for user input
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="keyword"
                value={InputData.keyword}
                onChange={handleInputChange}
                placeholder="What type of restaurant?"
            />
            <input
                type="text"
                name="maxPrice"
                value={InputData.maxPrice}
                onChange={handleInputChange}
                placeholder="Max price, 0 to 4?"
            />
            <input
                type="text"
                name="opennow"
                value={InputData.opennow}
                onChange={handleInputChange}
                placeholder="Open now? Y/ N"
            />
            <input
                type="text"
                name="maxDistance"
                value={InputData.maxDistance}
                onChange={handleInputChange}
                placeholder="Maximum distance?"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserInputForm;
