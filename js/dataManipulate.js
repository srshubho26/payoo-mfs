async function loadData(){
    const requestURL = "../data/data.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    const json = await response.json();
    return json;
}

async function uploadData(data) {
    const dataList = await loadData();
    const newData = [...dataList, data];
    const makeJSON = JSON.stringify(newData);
    // fetch("../data/data.json", {
    //     method: "POST",
    //     body: newData,
    //     headers:{
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // })

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => console.log(json));
        });

        
}