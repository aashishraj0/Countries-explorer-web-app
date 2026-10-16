/* eslint-disable no-magic-numbers */
const appRoot = document.getElementById('app-root');

const f = document.createElement('form');
let h = document.createElement('h1');
h.innerHTML = 'Countries Search';
f.style.textAlign = 'center';
let p = document.createElement('label');
p.setAttribute('for', 'f1');
p.innerHTML = 'Please choose type of search:';
let input1 = document.createElement('input');
input1.setAttribute('type', 'radio');
input1.setAttribute('value', 'By-Region');
input1.setAttribute('id', 'By-Region');
input1.setAttribute('class', 'f1');
input1.setAttribute('name', 'search');
input1.setAttribute('onclick', 'byRegion()');
let input2 = document.createElement('input');
input2.setAttribute('type', 'radio');
input2.setAttribute('value', 'By-Language');
input2.setAttribute('id', 'By-Language');
input2.setAttribute('class', 'f1');
input2.setAttribute('name', 'search');
input2.setAttribute('onclick', 'byLanguage()');
let l1 = document.createElement('label');
l1.setAttribute('for', 'By-Region');
l1.innerHTML = 'By Region';
let l2 = document.createElement('label');
l2.setAttribute('for', 'By-Language');
l2.innerHTML = 'By Language';
let b = document.createElement('br');
f.appendChild(h);
f.appendChild(p);
p.appendChild(input1);
p.appendChild(l1);
// p.appendChild(b);
p.appendChild(input2);
p.appendChild(l2);
f.appendChild(b);
let p1 = document.createElement('label');
p1.setAttribute('for', 'f2');
p1.style.paddingLeft = 0;
p1.innerHTML = 'Please choose search query: ';
let s = document.createElement('select');
s.setAttribute('id', 'f2');
s.setAttribute('name', 'select value');
s.options.add(new Option('Select value'));
function byRegion() {
    s.innerHTML = '';
    s.options.add(new Option('Select value'));
    let a = externalService.getRegionsList();
    for (const i in a) {
        if (i) {
            s.options.add(new Option(a[i], a[i]));
        }
    }
    d.innerHTML = 'No items, please choose search query';
}
function byLanguage() {
    s.innerHTML = '';
    s.options.add(new Option('Select value'));
    let a = externalService.getLanguagesList();
    for (const i in a) {
        if (i) {
            s.options.add(new Option(a[i], a[i]));
        }
    }
    d.innerHTML = 'No items, please choose search query';
}
console.log(s.options[s.selectedIndex].text);
s.addEventListener('change', () => {
    // if(s.options[s.selectedIndex].text)
    let radio = document.querySelector(
        "input[type='radio'][name='search']:checked"
    ).value;
    let search = s.options[s.selectedIndex].text;
    console.log(radio);
    if (radio === 'By-Language') {
        let lan = externalService.getCountryListByLanguage(search);
        console.log(Object.keys(lan[0]));
        // d.innerHTML=
        buildTable(lan);
    } else {
        let reg = externalService.getCountryListByRegion(search);
        // d.innerHTML=
        buildTable(reg);
    }
    console.log(search);
});
function buildTable(data) {
    let keys = [
        'Country name',
        'Capital',
        'World region',
        'Languages',
        'Area',
        'Flag',
    ];
    let tab = document.createElement('table');
    tab.setAttribute('id', 'ta');
    let tr = tab.insertRow(-1);
    for (let i = 0; i < keys.length; i++) {
        let theader = document.createElement('th');
        theader.innerHTML = keys[i];
        if (i === 0) {
            theader.setAttribute('onclick', 'functionSort(0)');
            theader.setAttribute('id', 'country');
            theader.innerHTML += '↑';
        }
        if (i === 4) {
            theader.setAttribute('onclick', 'functionSort(4)');
            theader.setAttribute('id', 'area');
            theader.innerHTML += '↕';
        }

        tr.appendChild(theader);
        tr.style.backgroundColor = 'greenyellow';
    }
    tab.appendChild(tr);

    tab.style.border = '1px solid black';
    tab.style.width = '100%';
    for (let i = 0; i < data.length; i++) {
        let trow = tab.insertRow(-1);
        let cell1 = trow.insertCell(-1);
        let cell2 = trow.insertCell(-1);
        let cell3 = trow.insertCell(-1);
        let cell4 = trow.insertCell(-1);
        let cell5 = trow.insertCell(-1);
        let cell6 = trow.insertCell(-1);
        cell1.innerHTML = data[i]['name'];
        cell2.innerHTML = data[i]['capital'];
        cell3.innerHTML = data[i]['region'];
        cell4.innerHTML = Object.values(data[i]['languages']);
        cell5.innerHTML = data[i]['area'];
        let img = document.createElement('img');
        img.setAttribute('src', data[i]['flagURL']);
        cell6.innerHTML = '';
        cell6.appendChild(img);
    }
    d.innerHTML = '';
    d.appendChild(tab);
    // d.innerHTML=tab
}
function functionSort(n) {
    console.log(this.column);
    let table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
    table = document.getElementById('ta');
    switching = true;
    dir = 'asc';
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 1].getElementsByTagName('TD')[n];
            if (dir === 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }

    if (dir === 'asc') {
        if (n === 0) {
            Object.assign(document.getElementById('country'), {
                className: 'af',
            });
            let pp = document.getElementById('country');
            pp.innerHTML = 'Country name ↑';
        }
        if (n === 4) {
            Object.assign(document.getElementById('area'), { className: 'af' });
            let pp = document.getElementById('area');
            pp.innerHTML = 'Area ↑';
        }
    } else if (dir === 'desc') {
        if (n === 0) {
            Object.assign(document.getElementById('country'), {
                className: 'df',
            });
            let pp = document.getElementById('country');
            pp.innerHTML = 'Country name ↓';
        }
        if (n === 4) {
            Object.assign(document.getElementById('area'), { className: 'df' });
            let pp = document.getElementById('area');
            pp.innerHTML = 'Area ↓';
        }
    }
}
p1.appendChild(s);
let d = document.createElement('div');
f.appendChild(p1);
f.appendChild(d);
appRoot.appendChild(f);
