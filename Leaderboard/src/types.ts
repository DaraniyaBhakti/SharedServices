export interface LeaderboardItem {
  account_id: number;
  total_point: number;
  is_active?: boolean | null;
  created_by?: string | null;
  updated_by?: string | null;
  account_user_name?: string | null;
  member_since: Date;
  profile_picture: string;
  position?: number;
}

export interface LeaderboardItemResponse {
  id: number;
  type: string;
  attributes: LeaderboardItem;
}
