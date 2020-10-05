const API_URL = "https://restcountries.eu/rest/v2/all";

export const getCountries = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};
