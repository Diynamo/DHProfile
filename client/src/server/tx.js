import decrypt from "./decrypt";

//-----------------------------------------------------------------------
// GET
//-----------------------------------------------------------------------

// Return the list of users registered in the database
export async function getTx() {
    try {
        const response = await fetch(`https://api.dreamhunter.io/tx`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        const result = await response.json();
        return (JSON.parse(decrypt(result)));
    } catch (err) {
        console.log(err);
    }
}

// Get user tx by hash
export async function getTxHash(hash) {
    try {
        const response = await fetch(`https://api.dreamhunter.io/tx/hash${hash}`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        const result = await response.json();
        if (!result) {
            return null;
        }
        return (JSON.parse(decrypt(result)));
    } catch (err) {
        console.log(err);
    }
}

// Get user tx by id
export async function getTxId(id) {
    try {
        const response = await fetch(`https://api.dreamhunter.io/tx/id/${id}`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        const result = await response.json();
        if (!result) {
            return null;
        }
        return (JSON.parse(decrypt(result)));
    } catch (err) {
        console.log(err);
    }
}