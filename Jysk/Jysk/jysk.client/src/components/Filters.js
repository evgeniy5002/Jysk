var req = {
    Category: "",
    Manufacturer: "",
    Rating: 0,
    Price: 0,
    Discount: 0,
    Delivery: false
}
let Callback = null;

export const GetReq = () => req;

export const SetCategory = (value) => {
    req.Category = value;
}

export const SetCallback = (callback) => {
    Callback = callback
}

export const triggerCallback = () => {
    if (Callback) {
        Callback()
    }
}