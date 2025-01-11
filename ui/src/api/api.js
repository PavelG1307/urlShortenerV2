import axios from 'axios';

export default class Api {
    static apiUrl = process.env.REACT_APP_API_URL;

    static async createShortUrl(originalUrl) {
        const resp = await axios.post(`${this.apiUrl}/shorten`, { originalUrl })
        return resp?.data?.shortUrl;
    }
}