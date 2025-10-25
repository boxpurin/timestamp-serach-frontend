import { TimeStampData } from "../domain/timeStampDataType";
import { ColDef } from "ag-grid-community";
import { CustomCellRendererProps } from "ag-grid-react";
import * as Mui from "@mui/material";
import { ValueFormatterParams } from "ag-grid-community";

// サムネイルURLに動画URLを埋め込む
const ThumbnailCellRenderer = (params: CustomCellRendererProps<GridRow>) => {
  if (params.data === undefined) {
    return <Mui.Box />;
  }
  return (
    <Mui.Box>
      <a
        href={`https://www.youtube.com/watch?v=${params.data.videoId}&t=${params.data.seconds}`}
        target="_blank"
        rel="noreferrer"
      >
        <img src={params.data.thumbnailUrl} title={params.data.videoTitle} />
      </a>
    </Mui.Box>
  );
};

const secondValueFormatter = (params: ValueFormatterParams) => {
  const seconds = params.value as number;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  // 各値を2桁にゼロ埋め
  const padded = (num: number) => String(num).padStart(2, "0");

  return `${padded(h)}:${padded(m)}:${padded(s)}`;
};

const dateValueFormatter = (params: ValueFormatterParams) => {
  return params.value !== undefined
    ? (params.value as Date).toLocaleString()
    : "";
};

export const columnsDefs: ColDef<GridRow>[] = [
  {
    headerName: "サムネイル",
    field: "thumbnailUrl",
    tooltipField: "videoTitle",
    cellRenderer: ThumbnailCellRenderer,
    sortable: false,
    width: 160,
    autoHeight: true,
  },
  {
    headerName: "タイトル",
    field: "videoTitle",
    tooltipField: "videoTitle",
    width: 300,
    sortable: false,
    cellStyle: { textAlign: "left", alignContent: "center" },
  },
  {
    headerName: "時間",
    field: "seconds",
    width: 100,
    valueFormatter: secondValueFormatter,
    cellStyle: { textAlign: "left", alignContent: "center" },
  },
  {
    headerName: "内容",
    field: "description",
    tooltipField: "description",
    sortable: false,
    cellStyle: { textAlign: "left", alignContent: "center" },
  },
  {
    headerName: "公開/配信日時",
    field: "actualStartAt",
    width: 180,
    valueFormatter: dateValueFormatter,
    cellStyle: { textAlign: "left", alignContent: "center" },
  },
];

export class GridRow {
  id: number = 0;
  videoId: string = "";
  videoTitle: string = "";
  thumbnailUrl: string = "";
  seconds: number = 0;
  description: string = "";
  publishedAt?: Date = undefined;
  actualStartAt?: Date = undefined;

  constructor(id?: number, timestampData?: TimeStampData) {
    console.log(timestampData?.videoDetails)
    if (timestampData !== undefined) {
      this.id = id || 0;
      this.videoId = timestampData.videoId;
      this.videoTitle = timestampData.videoDetails?.title || "";
      this.seconds = timestampData.elapsedTime;
      this.description = timestampData.description;
      this.thumbnailUrl = timestampData.videoDetails?.thumbnailUrl || "";
      this.publishedAt =
        timestampData.videoDetails !== undefined
          ? new Date(timestampData.videoDetails.publishedAt)
          : undefined;
      this.actualStartAt =
        timestampData.videoDetails !== undefined
          ? new Date(timestampData.videoDetails.actualStartAt)
          : undefined;
    }

    console.log(this);
  }
}
