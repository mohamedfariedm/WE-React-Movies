 const apiConfig={
    baseUrl:"https://api.themoviedb.org/3",
    apiKey:"939a9733dd3a37aa03ec7329f21d4c45",
    originalImg:function(imgPath){
        return`https://image.tmdb.org/t/p/original/${imgPath}`
    },
    w500Img:function(imgPath){
            return`https://image.tmdb.org/t/p/w500/${imgPath}`
    }
}
export default apiConfig;