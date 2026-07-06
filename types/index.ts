export type Gender = "male" | "female" | "other";
export type RelationshipType =
  | "marriage"
  | "biological_child"
  | "adopted_child";
export type UserRole = "admin" | "editor" | "member";
export type BranchType = "chi" | "phai" | "nhanh";
export type BranchPermission =
  | "manage_members"
  | "manage_events"
  | "review_requests";
export type ContentType = "pha_ky" | "post" | "notable_person";
export type PublishStatus = "draft" | "published" | "archived";
export type ContactSubmissionType = "contact" | "genealogy_update" | "feedback";
export type ContactStatus = "new" | "in_review" | "resolved" | "rejected";

export interface Profile {
  id: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUserData {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface Person {
  id: string;
  full_name: string;
  gender: Gender;
  birth_year: number | null;
  birth_month: number | null;
  birth_day: number | null;
  death_year: number | null;
  death_month: number | null;
  death_day: number | null;
  avatar_url: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;

  // Private fields (optional, as they might not be returned for members)
  phone_number?: string | null;
  occupation?: string | null;
  current_residence?: string | null;

  // Lunar Date
  death_lunar_year: number | null;
  death_lunar_month: number | null;
  death_lunar_day: number | null;

  // New fields
  is_deceased: boolean;
  is_in_law: boolean;
  birth_order: number | null;
  generation: number | null;
  other_names: string | null;

  // Ho Van Toc enrichment fields
  common_name?: string | null;
  dharma_name?: string | null;
  birth_place?: string | null;
  hometown?: string | null;
  education?: string | null;
  position_title?: string | null;
  merits?: string | null;
  biography?: string | null;
  branch_id?: string | null;
}

export interface Relationship {
  id: string;
  type: RelationshipType;
  person_a: string; // UUID
  person_b: string; // UUID
  note?: string | null;
  created_at: string;
  updated_at: string;
}

// Helper types for UI
export interface PersonWithDetails extends Person {
  spouses?: Person[];
  children?: Person[];
  parents?: Person[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  event_date: string | null; // ISO string or date string
  created_at: string;
  created_by: string | null;
}

export interface Branch {
  id: string;
  name: string;
  slug: string;
  type: BranchType;
  parent_id: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileBranchPermission {
  profile_id: string;
  branch_id: string;
  permission: BranchPermission;
  created_at: string;
  updated_at: string;
}

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  type: ContentType;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContentEntry {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  summary: string | null;
  body: string;
  cover_image_url: string | null;
  status: PublishStatus;
  published_at: string | null;
  author_id: string | null;
  category_id: string | null;
  related_person_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicEvent {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  organizer: string | null;
  audience: string | null;
  event_type: string | null;
  banner_url: string | null;
  status: PublishStatus;
  is_public: boolean;
  registration_enabled: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  profile_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  type: ContactSubmissionType;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  related_person_id: string | null;
  status: ContactStatus;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}
