export type Data = string[];

export type IExportData = Data[];

export interface IJsonData {
  id: number;
  date: string;
  category: string;
  description: string;
  income: number;
  expense: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}
export interface IPickCsvFile {
  fileCopyUri?: string | null;
  name?: string;
  size?: number;
  type?: string;
  uri?: string;
}

interface INativaEvent {
  timestamp: number;
}

export interface IEventType {
  type: string;
  nativeEvent: INativaEvent;
}

export interface IDatasets {
  data: number[];
}
export interface IBarChartData {
  labels: string[];
  datasets: IDatasets[];
}
