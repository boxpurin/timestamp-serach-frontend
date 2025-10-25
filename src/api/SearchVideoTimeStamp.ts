import { SearchQuery } from "../types/searchQuery";
import { ApiResponseError } from "../types/Error";
import { TimeStampSearchResult } from "../domain/timeStampDataType";


/// RESTful API サーバーからタイムスタンプ情報を取得するAPI
export async function SearchVideoTimeStamp(params: SearchQuery): Promise<TimeStampSearchResult> {
    let q = new URLSearchParams();
    q.append("q", params.keyword);
    q.append("page", params.page.toString());
    q.append("perPage", params.perPage.toString());

    switch (params.searchPattern) {
        case "dateRange": {
            q.append("startFrom", params.startDate.toISOString());
            q.append("startTo", params.endDate.toISOString());
            break;
        }
        case "dateIn": {
            q.append("startAt", params.startDate.toISOString());
            break;
        }
    }

    if (params.allowDateRange) {
        q.append("startFrom", params.startDate.toISOString());
        q.append("startTo", params.endDate.toISOString());
    }

    q.append("parts", "videoDetails");

    console.log(import.meta.env.VITE_API_SERVER_HOST);
    console.log(q);

    var req = new Request(`${import.meta.env.VITE_API_SERVER_HOST}/api/v1/timestamp/search?${q}`,
        {
            method: "GET",
            headers: {
                Authorization: `${import.meta.env.API_KEY}`
            },
            mode: "cors",
            cache: "default"
        }
    );

    const res = await fetch(req);
    if (!res.ok) {
        throw new ApiResponseError(res.status);
    }

    const ret: TimeStampSearchResult = await res.json();

    return ret;
}