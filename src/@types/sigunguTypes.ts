export interface ISigunguData {
  coastYn: boolean; // 해안 여부 (true/false)
  sigunguCode: string; // 시군구 코드
  sigunguName: string; // 시군구 이름
  sigunguLonlat: string; // 시군구 좌표
  sigunguPolygon: string; // 시군구의 다각형 정보 (GeoJSON 형태의 문자열)
}

export interface ISigunguDropData {
  label: string;
  value: string;
}

export interface ICoastData {
  coastCode: string;
  coastName: string;
  coastlineLen: number;
  coastLonlat: string;
  sigunguCode: string;
  coastGeom: string;
}

export interface ICoastDropData {
  label: string;
  value: string;
}