import './style.css';
// TODO: required imports
import { Country } from './models/Country';
import { Result } from './models/Result';
import { Countries } from './models/Countries.enum';
import { Sports } from './models/Sports.enum';
import { Medals } from './models/Medals.enum';

const countrySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('country-slt')
);
const medalSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('medal-slt')
);
const sportSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('sport-slt')
);

const addButton: HTMLElement = document.getElementById('add-btn');
//TODO: add an eventlistener to the button to trigger addMedal
addButton.addEventListener('click', addMedal);

let countries: Array<Country> = [];

init();

// This function sets up some display elements
function init() {
  let count = 0;
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      countrySelect.add(newOption);
    }
  }

  //TODO: populate the Sport select
  let count_sport = 0;
  for (let s in Sports) {
    if (isNaN(Number(s))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = s;
      newOption.value = count_sport.toString();
      count_sport++;
      sportSelect.add(newOption);
    }
  }

  //TODO: populate the Medal select
  let count_medal = 0;
  for (let m in Medals) {
    if (isNaN(Number(m))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = m;
      newOption.value = String(m);
      count_medal++;
      medalSelect.add(newOption);
    }
  }
}

// This function adds a medal to the countries tally
function addMedal() {
  //TODO: complete this function
  let countryexists: boolean = false;
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name == String(Countries[countrySelect.value])) {
      countryexists = true;
    }
  }
  if (!countryexists) {
    countries.push(new Country(Countries[countrySelect.value]));
  }

  for (let i = 0; i < countries.length; i++) {
    if (countries[i].name == String(Countries[countrySelect.value])) {
      countries[i].results.push({
        sport: Sports[sportSelect.value],
        medal: Medals[medalSelect.value]
      });
    }
  }

  displayTable();
}

// This function refreshes the medal tally table
function displayTable() {
  const resultsBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById('results-body')
  );

  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.createElement('tbody')
  );
  newBody.id = 'results-body';

  // TODO: create the rows required for the new table body element
  for (let i = 0; i < countries.length; i++) {
    let row = document.createElement('tr');

    let country = document.createElement('td');
    let countrytext = document.createTextNode(countries[i].name);
    country.appendChild(countrytext);
    row.appendChild(country);

    let gold = document.createElement('td');
    let goldtext = document.createTextNode(
      String(countries[i].totalMedalType(Medals['Gold']))
    );
    gold.appendChild(goldtext);
    row.appendChild(gold);

    let silver = document.createElement('td');
    let silvertext = document.createTextNode(
      String(countries[i].totalMedalType(Medals['Silver']))
    );
    silver.appendChild(silvertext);
    row.appendChild(silver);

    let bronze = document.createElement('td');
    let bronzetext = document.createTextNode(
      String(countries[i].totalMedalType(Medals['Bronze']))
    );
    bronze.appendChild(bronzetext);
    row.appendChild(bronze);

    let total = document.createElement('td');
    let totaltext = document.createTextNode(String(countries[i].totalMedals()));
    total.appendChild(totaltext);
    row.appendChild(total);

    newBody.appendChild(row);
  }

  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}