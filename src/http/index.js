export const getArticle = async function (category, pageNo = 1) {
  let URL = `http://gank.io/api/data/${category}/10/${pageNo}`;
  try{
    let res = await fetch(URL)
    console.log(res)
    return res.json()
  }catch(e){
    console.log(e)
  }
}