import { GestureResponderEvent } from "react-native";

interface Attributes {
  title: string;
  summary: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  allow_publish: boolean | string;
  is_active: boolean;
  resume: null | string;
}

export interface SummaryData {
  id: string;
  type: string;
  attributes: Attributes;
}
export interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  buttonText?: string;
  backgroundColor?: string;
  fontSize?: number;
  width?: string | number;
  icons?: string;
  height?: string | number;
  testID?: string;
}

export interface TemplateDataTypes {
  id: number;
  title: string;
  templateUrl: string;
}

export interface ProfileTemplate {
  name: string;
  age: number;
  years_of_experience: number;
  experience_summary: string;
  education_summary: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  experience_file: string;
  education_file: string;
}

export interface ResponseProfileTemplate {
  data: null | {
    id: string;
    type: string;
    attributes: ProfileTemplate;
  };
}
export interface ResponseLogin {
  meta: {
    token: string;
    id: number;
  };
}

export interface FileResponse {
  uri: string;
  name: string;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
}

export interface ProfileData {
  age: number;
  created_at: string;
  created_by: string;
  education_file: string;
  education_summary: string;
  experience_file: string;
  experience_summary: string;
  name: string;
  updated_at: string;
  updated_by: string;
  years_of_experience: number;
}
