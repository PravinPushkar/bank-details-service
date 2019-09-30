**GETTING ACCESS-TOKEN**

```sh
token=$(curl -X POST https://bank-details-service.herokuapp.com/authenticate -d "username=service&password=service" | jq -r '.token')
```

**FETCH BANK DETAILS API**

```sh
curl -G -H 'Content-Type: application/json' -H "access-token:$token" https://bank-details-service.herokuapp.com/api/bankDetails/ABHY0065006?"limit=10&offset=0" | jq -r
```

**FETCH BRANCH DETAILS API**
```sh
curl -G -H 'Content-Type: application/json' -H "access-token:$token" https://bank-details-service.herokuapp.com/api/branchDetails --data-urlencode "bankName=ABHYUDAYA COOPERATIVE BANK LIMITED" --data-urlencode "city=MUMBAI" --data-urlencode "limit=10" --data-urlencode "offset=0" | jq -r
```
