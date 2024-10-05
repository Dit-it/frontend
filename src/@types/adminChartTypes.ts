export interface IMajorTypeOfLitterData {
  coastCode: string | null; // 해안 코드
  coastGeom: string | null; // 해안 지오메트리
  coastName: string | null; // 해안 이름
  litterTypeName: string; // 쓰레기 유형 이름
  sigunguCode: string; // 시군구 코드
  sigunguName: string; // 시군구 이름
  totalCleanupLitter: number; // 총 정리된 쓰레기 양
}

export interface IPieData {
  name: string;
  population: number;
  color: string;
}

export enum litterName {
  fishing = '폐어구류',
  floating = '부표류',
  trash = '생활쓰레기류',
  bigTrash = '대형 투기쓰레기류',
  tree = '초목류',
}

export interface ICoastData {
  coastCode: number;
  coastLonlat: ICoastLonlat; // JSON 형태의 문자열
  coastName: string;
  sigunguCode: string;
  sigunguName: string;
  totalCleanupLitter: number;
}

export interface ICoastLonlat {
  type: string;
  coordinates: [number, number];
}

export interface ICoastDataDropdown {
  label: string;
  value: [number, number];
}
