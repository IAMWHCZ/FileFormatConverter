export interface SupportFileType {
  id: number;
  type: string;
  displayName: string;
  description?: string | null;
  relationSupportFileTypes: SupportFileType[];
}

export interface FileSwitchRelation {
  id: number;
  toFileTypeId: number;
  fromFileTypeId: number;
  toFileType: SupportFileType;
  fromFileType: SupportFileType;
}
