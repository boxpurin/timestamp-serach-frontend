import { SearchQuery } from "../types/searchQuery";
import { ApiResponseError } from "../types/Error";
import { TimeStampSearchResult } from "../domain/timeStampDataType";


/// RESTful API サーバーからタイムスタンプ情報を取得するAPI
export async function SearchVideoTimeStamp(params: SearchQuery): Promise<TimeStampSearchResult> {
    let q = new URLSearchParams();
    q.append("q", params.keyword || ' ');
    q.append("page", params.page.toString());
    q.append("perPage", params.perPage.toString());

    console.log(params.searchPattern);

    switch (params.searchPattern) {
        case "dateRange": {
            console.log("search dateRange");
            q.append("startFrom", params.startDate.toISOString());
            q.append("startTo", params.endDate.toISOString());
            break;
        }
        case "dateIn": {
            console.log("search dateIn");
            q.append("startAt", params.startDate.toISOString());
            break;
        }
    }

    if (params.allowDateRange) {
        q.append("startFrom", params.startDate.toISOString());
        q.append("startTo", params.endDate.toISOString());
    }

    q.append("parts", "videoDetails");

    console.log(params.startDate.toISOString());
    console.log(params.endDate.toISOString());

    var req = new Request(`/api/v1/timestamp/search?${q}`,
        {
            method: "GET",
            headers: {
                Authorization: `${import.meta.env.VITE_API_KEY || ''}`
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