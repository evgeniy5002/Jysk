

var req = {
    Category: [],
    Manufacturer: [],
    Price: [],
    Discount: false,
    Delivery: false
}
let GetAllCallback = null;
let ValCallback = null;

export const GetReq = () => {
    return req;
};

export const SetCategory = (value) => {
    req.Category = value;
}
export const SetManufacturer = (value) => {
    req.Manufacturer = value;
}
export const SetDiscount = (value) => {
    req.Discount = value;
}
export const SetDelivery = (value) => {
    req.Delivery = value;
}
export const SetMinPrice = (value) => {
    req.Price[0] = value;
}
export const SetMaxPrice = (value) => {
    req.Price[1] = value;
}

export const SetGetAllCallback = (callback) => {
    GetAllCallback = callback
}
export const triggerCallback = () => {
    if (GetAllCallback) {
        GetAllCallback()
    }
}