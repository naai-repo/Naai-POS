// For Development
// const baseUrl = "http://localhost:8800"

// For Production
const baseUrl = "https://dev.naai.in"
export enum Urls {
    GetSingleService = `${baseUrl}/partner/service/single/`,
    GetArtistList = `${baseUrl}/appointments/singleArtist/list`,
    GetCustomerList = `${baseUrl}/partner/walkin/users/list`,
    AddWalkinBooking = `${baseUrl}/partner/walkin/add/booking`,
    FetchCoupon = `${baseUrl}/coupons/fetch`,
    AddWalkinUser = `${baseUrl}/partner/walkin/add/user`,
}

export const SALONID = "65e28c422ebce658ad29fda8";