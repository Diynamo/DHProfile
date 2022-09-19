import decrypt from "./decrypt";
//-----------------------------------------------------------------------
// GET
//-----------------------------------------------------------------------

// Return the list of users registered in the database
export async function getUsers() {
    try {
        const response = await fetch(`https://api.dreamhunter.io/routes/list`);

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

// Get user data by address
export async function getUser(id) {
    try {
        const response = await fetch(`https://api.dreamhunter.io/user/${id}`);

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

// Get user data by username
export async function getUserName(id) {
    try {
        const response = await fetch(`https://api.dreamhunter.io/user/name/${id}`);

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

// Check if user is subscribed
export async function checkUser(id) {
    try {
        const response = await fetch(`https://api.dreamhunter.io/user/${id}`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }

        let result = await response.json();
        result = (JSON.parse(decrypt(result)))
        if (!result) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
    }
}

// Add an unsubscribed user to the database
export async function addFirst(newUser) {
    try {

        const response = await fetch(`https://api.dreamhunter.io/user/addFirst`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })

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

// Change a user's last login date
export async function updateLogin(id) {
    try {

        const response = await fetch(`https://api.dreamhunter.io/user/lastLogin/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
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

// Change a user's data
export async function updateUser(id, detail) {
    try {

        const response = await fetch(`https://api.dreamhunter.io/user/update/${id}`, {
            method: "POST",
            body: detail,
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

// Delete User Data
export async function deleteUser(id) {
    const detail = {
        username: null,
        bio: null,
        email: null,
        showNft: false,
        profilePic: null,
        coverPic: null,
        social: null,
    }

    try {

        const response = await fetch(`https://api.dreamhunter.io/user/update/${id}`, {
            method: "POST",
            body: JSON.stringify(detail),
            headers: {
                'Content-Type': 'application/json'
            },
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

//-----------------------------------------------------------------------
// SET
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// CHECK
//-----------------------------------------------------------------------