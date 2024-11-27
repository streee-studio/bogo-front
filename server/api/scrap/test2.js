import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';



export default defineEventHandler(async (event) => {
    const { data } = await axios.get('http://alb.or.kr/z/view.php?id=game&category=1&no=9462',{
        responseType: 'arraybuffer', // 바이너리 데이터로 받기
        // reponseEncoding: 'binary',  // 기본 UTF-8 디코딩을 방지
    });
    const decodedData = iconv.decode(response.data, 'EUC-KR');


    // Cheerio로 HTML 파싱
    const $ = cheerio.load(decodedData);

    const dataset = []
    const records = []


    records.push($('title').text())
    $('table').each((_, el) => {
        records.push($(el).text())
    })

    dataset.push($('table').length)


    return {
        dataset,
        records
    }
    try {
        // 외부 웹페이지 요청
        // const { data } = await axios.get('https://www.gmbaseball.co.kr/teamPage/intro/getTeamPlayer.hs?teamSeq=9');

        // const records = []
        //
        //
        // records.push($('title').text())
        // $('table').each((_, el) => {
        //     records.push($(el).text())
        // })
        /*
        // HTML에서 원하는 데이터 추출
        const items = []
        $('.prod_list').each((_,el) => {
            //items.push($(el).text())

            items.push({
                name:$(el).find('.prod_text > .name').text(),
                price:$(el).find('.prod_text > .price > strong').text(),
                type:$(el).find('.badge span').text()
            })

        })
        const title = $('title').text();
        const headings = [];
        $('h1, h2').each((_, el) => {
            headings.push($(el).text());
        });

         */
        return {
            dataset
            // records
        };
    } catch (error) {
        return { error: '데이터를 가져오는 중 문제가 발생했습니다.' };
    }
});