export const isCardValid = (id) => {
    return fetch('http://rocket.ccvlab.eu:8080/json/isCardValid?cardIdentifier=' + id, {
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
            return response.json();
        }
    });
};