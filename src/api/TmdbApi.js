import axios from "axios"
import apiConfig from "./apiConfig"
import toast from "react-hot-toast"
const{baseUrl,apiKey}=apiConfig
export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi={
    getMoviesList:function(type,sort,pageNum){
        return axios.get(`${baseUrl}/${sort}/${type}?api_key=${apiKey}&page=${pageNum}`)
    },
    getTvList:function(type){
        return axios.get(`${baseUrl}/tv/${type}?api_key=${apiKey}`)
    },
    getVideos:function(cat,id){
        return axios.get(`${baseUrl}/${cat}/${id}/videos?api_key=${apiKey}`)
    },
    detail:function(cat,id){
        return axios.get(`${baseUrl}/${cat}/${id}?api_key=${apiKey}`)
    },
    serch:function(cat,term){
        return axios.get(`${baseUrl}/search/${cat}?api_key=${apiKey}&query=${term}`)
    },
    multySerch:function(cat,term){
        return axios.get(`${baseUrl}/search/multi/${cat}?api_key=${apiKey}&query=${term}`)
    },
    credits:function(cat,id){
        return axios.get(`${baseUrl}/${cat}/${id}/credits?api_key=${apiKey}`)
        // https://api.themoviedb.org/3/movie/575264/similar?language=en-US&page=1
    },
    creditsSimilar:function(cat,id,bar){
        return axios.get(`${baseUrl}/${cat}/${id}/${bar}?api_key=${apiKey}&language=en-US&page=1`)

    },

}
export default tmdbApi;