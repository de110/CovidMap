import axios from "axios";
import cheerio from "cheerio";
const log = console.log;

function getData(url, parentTag, tag) {
    let resultnum = [];
    try {
        axios.get(url).then((html) => {
            const $ = cheerio.load(html.data);
            let parent = $(parentTag);
            
            parent.each(function (i) {
                //   resultnum =$(this).find(tag).text()
                resultnum[i] = $(this).find(tag).text()
            });
            //  log(resultnum);
              
        });
    } catch (error) {
        log(error);
    }

    // return JSON.parse(JSON.stringify(resultnum))
    return resultnum
}
export {
    getData
}

// import axios from "axios";
// import cheerio from "cheerio";
// const log = console.log;

// function getData(url, parentTag, tag) { async (url) => {
//     try {
//         return await axios.get(url)
//     } catch (err) {
//         log(err)
//     }
// }
//     getData().then(html => {
//         let resultArr = [];
//         const $ = cheerio.load(html.data);
//         let parent = $(parentTag);
            
//         parent.each(function (i) {
//             resultArr[i] = $(this).find(tag).text()
//         });
//         return resultArr;
//     })
// }

// export {
//     getData
// }

// import axios from "axios";
// import cheerio from "cheerio";
// const log = console.log;

// const getData = async (url, parentTag, tag) => {
//     let resultArr = [];
//     try {
        
//         axios.get(url).then((html) => {
//             const $ = cheerio.load(html.data);
//             let parent = $(parentTag);
                    
//             parent.each(function (i) {
//                 // resultArr[i] = $(this).find("em").text() + $(this).find("span.num").text()
//                 resultArr[i] = $(this).find(tag).text()
//                 // resultArr[i] =JSON.parse(JSON.stringify(resultArr[i]));
//             });
//             //  log(resultArr);
//         });
//     } catch (error) {
//         log(error);
//     }
//     // log(resultArr)
//     return resultArr;
// }

// export {
//     getData
// }