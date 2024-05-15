export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  address: string;
  age: number;
  profileImage: File | null;
  medicalhistory: Array<{
    path: string;
    date: string;
    description: string;
    doctor: string;
    hospital: string;
    location: string;
    notes: string;
    prescription: string;
    tests: string;
    treatment: string;
    type: string;
    user: string;
  }>;
  chat: Array<{ chatid: string; doctorid: string; doctor: string }>;
  appointment: Array<{
    appointmentid: string;
    doctorid: string;
    doctor: string;
    date: string;
  }>;
  payment: Array<{
    paymentid: string;
    amount: string;
    date: string;
    payementto: string;
  }>;
  instantcall: Array<{
    callid: string;
    doctorid: string;
    doctor: string;
    date: string;
  }>;
  Calllog: Array<{
    callid: string;
    doctorid: string;
    doctor: string;
    date: string;
  }>;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phoneNumber: string;
  urls: Array<{ value: string }>;
  username: string;
  password: string;
  age: number;
  dob: string;
  category: string;
  experience: string;
  aadhaar: string;
  clinic_location: boolean;
  current_location: boolean;
  detected_location: { lat: number; lng: number };
  home_location: boolean;
  location_terms: boolean;
  license: string;
  medicaldegree: Array<string>;
  degreepdf: File | null;
  profileImage: File | null;
  feedback: Array<{
    userid: string;
    username: string;
    rating: string;
    review: string;
  }>;
  chat: Array<{ chatid: string; userid: string; user: string }>;
  Calllog: Array<{
    callid: string;
    userid: string;
    user: string;
    date: string;
    time: string;
  }>;
  appointment: Array<{
    appointmentid: string;
    userid: string;
    user: string;
    date: string;
  }>;
  payment: Array<{
    paymentid: string;
    amount: string;
    date: string;
    payementto: string;
  }>;
  instantcall: Array<{
    callid: string;
    userid: string;
    user: string;
    date: string;
  }>;
  isProfileComplete: boolean;
  isAccountComplete: boolean;
  isCategoryComplete: boolean;
  isLocationComplete: boolean;
  isEducationComplete: boolean;
  registration: string;
}

export interface Token {
  id: string;
}

export interface Info {
  name: string;
  location: Array<{}>;
  loginAs: string;
}
export interface Backend {
  rootapi: string;
}
export interface RootState {
  user: User;
  doctor: Doctor;
  token: Token;
  info: Info;
  backend: Backend;
}
