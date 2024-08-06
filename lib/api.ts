// For Development
// const baseUrl = "http://localhost:8800"

// For Production
const baseUrl = "https://dev.naai.in";

export enum Urls {
  GetSingleService = `${baseUrl}/partner/service/single/`,
  GetArtistList = `${baseUrl}/appointments/singleArtist/list`,
  GetSalonData = `${baseUrl}/partner/salon/single`,
  GetCustomerList = `${baseUrl}/partner/walkin/users/list`,
  AddWalkinBooking = `${baseUrl}/partner/walkin/add/booking`,
  FetchCoupon = `${baseUrl}/coupons/fetch`,
  AddWalkinUser = `${baseUrl}/partner/walkin/add/user`,
  SearchingServices = `${baseUrl}/pos/search/services`,
  GetArtistInfo = `${baseUrl}/partner/artist/single`,
  ClearDues = `${baseUrl}/partner/walkin/clear/dues`,
  UpdateCustomerInfo = `${baseUrl}/customer/user/update`,
  GetSingleBookingInfo = `${baseUrl}/appointments/booking/info`,
  GetSingleUser = `${baseUrl}/customer/user/`,
  ShortenUrl = `${baseUrl}/url/shorten`,
  ApplyMembership = `${baseUrl}/membership/apply/membership`,
  GetProducts = `${baseUrl}/salon/inventory/products`,
  GetMemberships = `${baseUrl}/membership/get`,
  GetAllStaff = `${baseUrl}/partner/salon/staff`
}
