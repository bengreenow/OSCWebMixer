export type ServiceType = {
  type: string;
  id: string;
  archived_at: string;
  attachment_types_enabled: boolean;
  created_at: string;
  custom_item_types: CustomItemType[];
  deleted_at: string;
  name: string;
  permissions: string;
  sequence: number;
  standard_item_types: StandardItemType[];
  updated_at: string;
  links: Links;
  relationshipNames: string[];
};

export type CustomItemType = {
  name: string;
  color: string;
};

export type StandardItemType = {
  name: string;
  color: string;
};

export type Links = {
  self: string;
};

export type Plan = {
  type: string;
  id: string;
  can_view_order: boolean;
  created_at: string;
  dates: string;
  files_expire_at: string;
  items_count: number;
  last_time_at: string;
  multi_day: boolean;
  needed_positions_count: number;
  other_time_count: number;
  permissions: string;
  plan_notes_count: number;
  plan_people_count: number;
  planning_center_url: string;
  prefers_order_view: boolean;
  public: boolean;
  rehearsable: boolean;
  rehearsal_time_count: number;
  series_title: string | null;
  service_time_count: number;
  short_dates: string;
  sort_date: string;
  title: string | null;
  total_length: number;
  updated_at: string;
  links: any; // This should be replaced with an appropriate type if known
  service_type: any; // This should be replaced with an appropriate type if known
  previous_plan: any; // This should be replaced with an appropriate type if known
  next_plan: any; // This should be replaced with an appropriate type if known
  attachment_types: any[]; // This should be replaced with an appropriate type if known
  series: any; // This should be replaced with an appropriate type if known
  created_by: any; // This should be replaced with an appropriate type if known
  updated_by: any; // This should be replaced with an appropriate type if known
  linked_publishing_episode: any; // This should be replaced with an appropriate type if known
  relationshipNames: string[]; // This should be replaced with an appropriate type if known
};
