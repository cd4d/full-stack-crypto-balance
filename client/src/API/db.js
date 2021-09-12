const DB_URL = process.env.REACT_APP_DB_URL
const DB_AUTH = DB_URL + 'dj-rest-auth/'

export async function login(credentials) {
    try {
        const response = await fetch(DB_AUTH + 'login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": credentials.username,
                "password": credentials.password
            })
        })
        if (!response.ok) {
            let err = new Error()
            err.message = `An error has occurred: ${response.status}`;
            err.status = response.status
            throw err
        }
        if (response.status >= 200 && response.status <= 299) {
            console.log('connected', response);
            return response;
        }
    } catch (error) {
        console.log(error);
        return error
    }


}
