import axios from 'axios';
import * as cheerio from 'cheerio';
import { getQuery } from 'h3';
import qs from 'qs'


export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        // 외부 웹페이지 요청
        const req = {
            'pageNum':query.page*1,
            'pageSize':50,
            // 'parameterList':'ONE_TO_ONE'
        }

        const { data } = await axios.get('http://gs25.gsretail.com/gscvs/ko/products/event-goods-search?'+qs.stringify(req));
        const cleanedData = data.replace(/\\"/g, '"');
        const modifiedData = JSON.parse(cleanedData);

        const items = []
        modifiedData.results.forEach((v) => {
            const prodName = v.goodsNm
            const parts = prodName.split(')'); // ')'를 기준으로 분리
            let brand = ''
            let name = v.abrGoodsNm
            if (parts.length >= 2 && prodName.indexOf('(') > prodName.indexOf(')')) {
                brand = '';
            } else if (parts.length >= 2) {
                brand = parts[0];
            }

            // const name = v.abrGoodsNm // "골드치킨마요덮밥(컵밥)"

            let type = ''
            switch(v.eventTypeNm){
                case '1+1':
                    type = '1to1'
                    break
                case '2+1':
                    type = '2to1'
                    break
            }
            items.push({
                brand:brand,
                name:name,
                prodName:prodName,
                type:type,
                price:v.price,
                image:v.attFileNm
            })
        })

        return {
            items,
            query
        };
    } catch (error) {
        console.log(error)
        return { error: '데이터를 가져오는 중 문제가 발생했습니다.' };
    }
});