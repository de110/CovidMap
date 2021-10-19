import axios from "axios";

export default {
    created() {
        const url =
            "/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=rp3lvczaoVPpOPI%2FsYJJJzknBUNL0LPaAo5HCXybKpsIm1YJjvR%2BtxFV0qoMH38Xq1jLsRN%2B%2BvvOp4XWFw4jkw%3D%3D&pageNo=1&numOfRow=10&startCreateDt=20210829&endCreateDt=20210829";
        axios.get(url).then((response) => {
            this.data = response.data.response.body.items.item;
        });
    },
    data() {
        return {
            data: [],
        };
    },
};