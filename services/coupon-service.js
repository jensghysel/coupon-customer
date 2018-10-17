export const baseUrl = 'http://rocket.ccvlab.eu:8080/json/';

export const ids = [];

export const isCardValid = (id) => {
    return fetch(baseUrl + 'cards/isCardValid?cardIdentifier=' + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status !== 200) {
            if (response._bodyText.includes('NotFoundException')) {
                return null;
            } else {
                return response;
            }
        } else {
            ids.push(id);
            return response.json();
        }
    });
};

export const removeCard = (id) => {
    let index = ids.indexOf(id);
    if (index > -1) {
        ids.splice(ids.indexOf(id), 1);
    }
};

export const getCoupons = () => {
    return new Promise(function (resolve, reject) {
        if (ids && ids.length > 0) {
            fetch(baseUrl + 'customers/customerLoyaltyInfo?cardIdentifier=' + ids[0], {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(r => {
                    resolve(r.customer.balance.couponQuantitys);
                });
            }).catch(e => {
                reject(e);
            });
        } else {
            resolve([]);
        }
    });
};

export const allCoupons = () => {
    return fetch(baseUrl + "coupons/all").then(response => response.json()).catch(ex => console.log(ex));
};

export const assignCoupon = (couponId, cardId) => {
    return fetch(baseUrl + 'customers/customerLoyaltyInfo?cardIdentifier=' + ids[0], {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customerId: cardId,
            couponId: couponId,
            startDate: new Date()
        })
    });
};