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
            //items.push($(el).text())

            items.push({
                name:$(el).find('.itemTxtWrap > .itemtitle > p > a').text(),
                price:$(el).find('.itemTxtWrap > span > a').text(),
                type:$(el).find('.itemTit span:nth-child(2)').text()
            })

        })
        const title = $('title').text();
        const headings = [];
        $('h1, h2').each((_, el) => {
            headings.push($(el).text());
        });

        return {
            items,
            query
        };
    } catch (error) {
        return { error: '데이터를 가져오는 중 문제가 발생했습니다.' };
    }
});