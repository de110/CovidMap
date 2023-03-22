import axios from "axios";

const serviceKey = process.env.VUE_APP_API_KEY;
export default {
    created() {
    },
    data() {
        return {
            data: [],
        };
    },
};

export function localApi(startCreateDt, endCreateDt) { // 지역 별 코로나 정보 API
    const url = "/one/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
    const serviceKey = process.env.VUE_APP_API_KEY;
    let pageNo = "1";
    let numOfRow = "10";

    return axios.get(url +
        url +
        "?serviceKey=" +
        serviceKey +
        "&pageNo" +
        pageNo +
        "&numOfRows=" +
        numOfRow +
        "&startCreateDt=" +
        startCreateDt +
        "&endCreateDt=" +
        endCreateDt).then(res => res.data.response.body.items.item);
}

export function MetropoliApi(startCreateDt) { // 광역시 기준 백신 접종 API
    const url = "/two/api/15077756/v1/vaccine-stat";

    let page = "1";
    let perPage = "10";

    return axios.get(url +
        "?page=" +
        page +
        "&perPage=" +
        perPage +
        "&returnType=JSON" +
        "&cond%5BbaseDate%3A%3AEQ%5D=" +
        startCreateDt +
        "%2000%3A00%3A00" +
        "&serviceKey=" +
        serviceKey).then(res => res.data.response.body.items.item);
}

export async function nationwideApi(startCreateDt, endCreateDt) { // 전국 확진자 수 API
    const url = "/one/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
    const serviceKey = process.env.VUE_APP_API_KEY;
    let pageNo = "1";
    let numOfRow = "10";

    return axios.get(
        url +
        "?serviceKey=" +
        serviceKey +
        "&pageNo" +
        pageNo +
        "&numOfRows=" +
        numOfRow +
        "&startCreateDt=" +
        startCreateDt +
        "&endCreateDt=" +
        endCreateDt
    ).then(res => res.data.response.body.items.item);
}

export async function nationGraphApi(startCreateDt, endCreateDt) { // 전국 확진자 수 API
    const url = "/one/openapi/service/rest/Covid19/getCovid19InfStateJson";
    const serviceKey = process.env.VUE_APP_API_KEY;
    let pageNo = "1";
    let numOfRow = "10";

    return axios.get(
        url +
        "?serviceKey=" +
        serviceKey +
        "&pageNo" +
        pageNo +
        "&numOfRows=" +
        numOfRow +
        "&startCreateDt=" +
        startCreateDt +
        "&endCreateDt=" +
        endCreateDt
    ).then(res => res.data.response.body.items.item);

}