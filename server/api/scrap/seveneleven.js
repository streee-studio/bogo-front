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
            intCurrPage:query.page*1,
            intPageSize:50,
            pTab:1
        }
        const { data } = await axios.post('https://www.7-eleven.co.kr/product/listMoreAjax.asp',qs.stringify(req));

        // Cheerio로 HTML 파싱
        const $ = cheerio.load(data);

        // HTML에서 원하는 데이터 추출
        const dataset = $('li').length
        const items = []
        const itemIds = []

        $('li').each((_,el) => {
            //items.push($(el).text())

            const name = $(el).find('.infowrap > .name').text()
            if(name != ''){
                const id = $(el).find('.btn_product_01').attr('href').match(/fncGoView\('(\d+)'\)/)[1]

                const parts = name.split(')'); // ')'를 기준으로 분리
                const brand = parts[0]; // "오뚜기"
                const product = parts.slice(1).join(')'); // "골드치킨마요덮밥(컵밥)"

                if(!itemIds.includes(id)){
                    itemIds.push(id)
                    items.push({
                        prodName:name,
                        price:$(el).find('.infowrap > .price > span').text(),
                        type:$(el).find('.ico_tag_06').text(),
                        id:id,
                        name:product,
                        brand:brand,

                    })
                }


            }


        })
        const title = $('title').text();
        const headings = [];
        $('h1, h2').each((_, el) => {
            headings.push($(el).text());
        });

        return {
            items,
            query,
        };
    } catch (error) {
        return { error: '데이터를 가져오는 중 문제가 발생했습니다.' };
    }
});