import axios, {AxiosInstance} from "axios";
class ApiWrapper {
    private axiosInstance: AxiosInstance
    constructor (baseURL: string) {
        this.axiosInstance = axios.create({ baseURL, headers: {
                "Cache-Control": "no-cache",
                "Access-Control-Allow-Origin": `*`,
                'Access-Control-Allow-Credentials':"true",
            }, })
    }
    async axiosCaller (method: string, url: string, params: any = null) {
        const requestData: any = {
            method,
            url
        }

        if (method === 'GET') {
            requestData.params = params
        } else if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'POST_FORM') {
            requestData.data = params
            if (params instanceof FormData) {
                requestData.headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }
        const response = await this.axiosInstance.request(requestData)
        return response
    }
}
const api = new ApiWrapper('/api')
const player = new ApiWrapper('/player')
export const ApiService = {
    async  getGameRecord  (gameID : string)  {
        // https://api-gw.sports.naver.com/schedule/games/20240730HHKT02024/record
       return  api.axiosCaller('GET',`/schedule/games/${gameID}/record`)
    },
    async getPlayerRanking (param : any) {
        param = {
            category: 'kbo',
            year: 2024,
            type: 'pitcher',
            playerOrder: 'era',
        }
    return player.axiosCaller('GET','/record/ajaxHtmlPlayerRecord.nhn', param)
    }
}
