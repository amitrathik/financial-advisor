const AccountService = {
    get(id = ""){
        const url = `${process.env.API_URL}/domains` + (id ? `/${id}` : "" )
        return fetch(url,{
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            if (response.error) {
                throw response;
              } else {
                return response;
            }
        });
    },
    create(data){
        return fetch(`${process.env.API_URL}/domains`,{
            method: "POST",
            body: JSON.stringify({data}),
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            if (response.error) {
                throw response;
              } else {
                return response;
            }
        });
    }
}

export default AccountService;