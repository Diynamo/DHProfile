//-----------------------------------------------------------------------
// GET
//-----------------------------------------------------------------------

// Returns the number of NFTs left to purchase
export async function getCristianoCards() {
    try {
        const response = await fetch(`https://api.dreamhunter.io/cristianoCards/get`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        const result = await response.json();
        return (result.cristianoCards);
    } catch (err) {
        console.log(err);
    }
}

//-----------------------------------------------------------------------
// SET
//-----------------------------------------------------------------------


// Returns the number of NFTs left to purchase
export async function setCristianoCards(n, timestamp) {
    let cards = 0;

    try {
        const response = await getCristianoCards()
        cards = response - n;

    } catch (err) {
        console.log(err);
    }

    const data = {
        cristianoCards: cards,
        timestamp: timestamp 
    }

    try {
        const response = await fetch(`https://api.dreamhunter.io/cristianoCards/set/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        const result = await response.json();
        if (!result) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
    }
}