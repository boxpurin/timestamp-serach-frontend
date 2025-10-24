import { SearchQuery } from "../types/searchQuery";
import { ApiResponseError } from "../types/Error";


/// RESTful API サーバーからタイムスタンプ情報を取得するAPI
export async function SearchVideoTimeStamp<T>(params: SearchQuery): Promise<[T]> {
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

    q.append("part", "videoTitle,thumbnailUrl,actualStartAt");

    var req = new Request(`${import.meta.env.API_SERVER_HOST}/api/v1/timestamps/search?${q}`,
        {
            method: "GET",
            headers: {
                Authorization: `${import.meta.env.API_KEY}`
            },
            mode: "cors",
            cache: "default"
        }
    );

    const res = (await fetch(req));
    if (!res.ok) {
        throw new ApiResponseError(res.status);
    }

    const items: [T] = await res.json();

    return items;
}