import axios from 'axios';
import * as cheerio from 'cheerio';
import { getQuery } from 'h3';
import qs from 'qs'


export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        // 외부 웹페이지 요청
        const req = {
            // pageIndex:200,
            pageIndex:query.page*1,
            listType:1
        }
        const { data } = await axios.get('https://emart24.co.kr/goods/event?search=&page='+query.page+'&category_seq=&align=');

        // Cheerio로 HTML 파싱
        const $ = cheerio.load(data);

        // HTML에서 원하는 데이터 추출
        const items = []
        $('.itemList .itemWrap').each((_,el) => {
            const prodName = $(el).find('.itemTxtWrap > .itemtitle > p > a').text()
            const parts = prodName.split(')'); // ')'를 기준으로 분리
            const brand = parts[0]; // "오뚜기"
            const name = parts.slice(1).join(')'); // "골드치킨마요덮밥(컵밥)"

            let type = ''
            switch($(el).find('.itemTit span:nth-child(2)').text()){
                case '1 + 1':
                    type = '1to1'
                    break
                case '2 + 1':
                    type = '2to1'
                    break
            }

            if(type != ''){
                items.push({
                    brand:brand,
                    name:name,
                    prodName:prodName,
                    type:type,
                    price:$(el).find('.itemTxtWrap > span > a').text(),
                    image:$(el).find('.itemSpImg > img').attr('src')
                })
            }



        })

        return {
            items,
            query
        };
    } catch (error) {
        return { error: '데이터를 가져오는 중 문제가 발생했습니다.' };
    }
});