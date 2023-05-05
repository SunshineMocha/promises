console.log('test');

// FETCH IN PARALLELO


// function parallelFetch(){

//     const BASE_URL = 'https://www.pokeapi.co/api/v2/'

//     const names = ['bulbasaur', 'lucario', 'umbreon', 'luxio', 'sticazzi'];

//     const fetches = [];

//     for (const name of names) {
//         const pokeUrl = BASE_URL + 'pokemon/' + name;
//         console.log("url:", pokeUrl);
//         const request = fetch(pokeUrl)
//                         .then(resp => resp.json())
//                         .catch(err => {
//                             console.log(err.message);
//                             return null;
//                         });
//         fetches.push(request);
//     }

//     Promise.all(fetches).then(data => {
//         const filteredData = data.filter(elem => elem !== null);
//         console.log("risultato della promise all", filteredData);
//     });
// }

// parallelFetch();

// FETCH IN SEQUENZA

// function sequentialFetch(){
//     const bulbasaUrl = 'https://www.pokeapi.co/api/v2/pokemon/bulbasaur'

//     fetch(bulbasaUrl)
//     .then(resp=> resp.json())
//     .then(bulbasaur => {
//         // console.log(bulbasaur);
//         const newUrl = bulbasaur.location_area_encounters;
//         // console.log(newUrl);
//         return fetch(newUrl)
//         .then(resp => resp.json())
//         .then(enc => {
//             const newObj = {name: bulbasaur.name, firstEncounter: enc[0].location_area.name}
//             return newObj;
//         })
//     }).then(obj => console.log(obj));
// }

// sequentialFetch();

function getAllPokemon(){

    const pokeUrl = 'https://www.pokeapi.co/api/v2/pokemon';

    fetch(pokeUrl)
        .then(resp => resp.json())
        .then(data => {

            const requests = [];
            for (const result of data.results) {

                const detailUrl = result.url;
                const request = fetch(detailUrl)
                    .then(resp => resp.json())
                    .catch(err => null)
                requests.push(request);
            }

            return Promise.all(requests);
        }).then(data => console.log(data));

}

getAllPokemon();