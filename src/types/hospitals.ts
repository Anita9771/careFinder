export interface NewHospitalType{
    Address?: string;
    Email?: string;
    Location?: GeoPoint;
    Name?: string;
    Phone?: string;
    Region?: string;
    id?: string;
}
    
export interface GeoPoint {
    latitude: number;
    longitude: number;
}

export interface AddHospitalType{
  Address?: string;
  Email?: string;
  Location?: GeoPoint;
  Name?: string;
  Phone?: string;
  Region?: string;
}