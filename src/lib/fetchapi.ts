//Common get api api function

import { ERROR_DATA_TEXT } from "./constants";

const getApiData = async (url: string) => {
    var result = {
        data: "",
        err: "",
        loading: false
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(ERROR_DATA_TEXT);
        }
        const data = await response.json();
        return result = {
            ...result,
            loading: false,
            data: data
        };
    } catch (err: any) {
        return result = {
            ...result,
            loading: false,
            err: err
        };
    }
};

export default getApiData;
