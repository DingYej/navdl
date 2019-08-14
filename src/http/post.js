// import qs from "qs"

export function posthttp(url, params) {
    return fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: stringify(params)
    })
}


function stringify(obj) {
    var result = ""; // 接受最后的结果  {name:iwen,age:20}
    var item;
    for (item in obj) { // &user_id=iwen&age=20&sex=nan
        result += "&" + item + "=" + encodeURIComponent(obj[item]);
    }
    if (result) {
        result = result.slice(1) // user_id=iwen&age=20&sex=nan
    }
    return result;
}

// ajax：用js的ajax：obj
