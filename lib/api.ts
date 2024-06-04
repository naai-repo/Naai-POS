const baseUrl = "https://m.naai.in"

export enum Urls {
    GetSingleService = `${baseUrl}/partner/service/single/`,
    GetArtistList = `${baseUrl}/appointments/singleArtist/list`,
    GetCustomerList = `${baseUrl}/partner/walkin/users/list`,
    AddWalkinBooking = `${baseUrl}/partner/walkin/add/booking`,
    FetchCoupon = `${baseUrl}/coupons/fetch`,
}

export const SALONID = "65e28c422ebce658ad29fda8";