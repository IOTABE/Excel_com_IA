// script.js - Porsche Dashboard functionality
// Dependencies: SheetJS (xlsx.full.min.js) and Chart.js (v4) via CDN (loaded in HTML)

// Global variables
const embeddedData = [{"sale_id":6,"SaleDateSanitized":"INVALID","customer_name":"Michael Adams","PorscheModelSanitized":"718 Cayman","ModelYear":2022,"Price":79500.0,"Mileage":9800,"PayMethod":"Credit Card","City":"Boston","StateSanitized":"MA","salesperson":"kevin","DeliveryStatusSanitized":"Delivered"},{"sale_id":7,"SaleDateSanitized":"2024-03-14","customer_name":"SOPHIA Miller","PorscheModelSanitized":"911 Turbo S","ModelYear":2024,"Price":235000.0,"Mileage":1200,"PayMethod":"Wire Transfer","City":"Seattle","StateSanitized":"WA","salesperson":"AMANDA scott","DeliveryStatusSanitized":"Delivered"},{"sale_id":8,"SaleDateSanitized":"2024-04-18","customer_name":"Daniel-Jones","PorscheModelSanitized":"Cayenne Coupe","ModelYear":2023,"Price":112750.0,"Mileage":6400,"PayMethod":"Financing","City":"Austin","StateSanitized":"TX","salesperson":"Brian Hall","DeliveryStatusSanitized":"In Transit"},{"sale_id":9,"SaleDateSanitized":"INVALID","customer_name":"Olivia Brown","PorscheModelSanitized":"Macan S","ModelYear":2021,"Price":68900.0,"Mileage":28,"PayMethod":"Cash","City":"Denver","StateSanitized":"CO","salesperson":"jessica","DeliveryStatusSanitized":"Pending"},{"sale_id":10,"SaleDateSanitized":"2024-05-22","customer_name":"Ethan Wilson","PorscheModelSanitized":"Taycan 4S","ModelYear":2024,"Price":121000.0,"Mileage":0,"PayMethod":"Bank Transfer","City":"Los Angeles","StateSanitized":"CA","salesperson":"Thomas King","DeliveryStatusSanitized":"Delivered"},{"sale_id":11,"SaleDateSanitized":"2024-08-06","customer_name":"Ava Martinez","PorscheModelSanitized":"Panamera 4","ModelYear":2023,"Price":104500.0,"Mileage":14500,"PayMethod":"Credit Card","City":"Miami","StateSanitized":"FL","salesperson":"LISA ray","DeliveryStatusSanitized":"Cancelled"},{"sale_id":12,"SaleDateSanitized":"2024-07-11","customer_name":"Noah Davis","PorscheModelSanitized":"911 Carrera S","ModelYear":2020,"Price":96300.0,"Mileage":41000,"PayMethod":"Lease","City":"New York","StateSanitized":"NY","salesperson":"Mark Evans","DeliveryStatusSanitized":"Delivered"},{"sale_id":13,"SaleDateSanitized":"INVALID","customer_name":"Isabella Garcia","PorscheModelSanitized":"Cayenne E-Hybrid","ModelYear":2022,"Price":89750.0,"Mileage":11744,"PayMethod":"Wire Transfer","City":"San Diego","StateSanitized":"CA","salesperson":"nancy reed","DeliveryStatusSanitized":"Pending Approval"},{"sale_id":14,"SaleDateSanitized":"2024-08-19","customer_name":"Liam Rodriguez","PorscheModelSanitized":"718 Boxster","ModelYear":2021,"Price":73500.0,"Mileage":22300,"PayMethod":"Debit Card","City":"Chicago","StateSanitized":"IL","salesperson":"George Bell","DeliveryStatusSanitized":"Shipped"},{"sale_id":15,"SaleDateSanitized":"2024-09-02","customer_name":"Mia Hernandez","PorscheModelSanitized":"Macan GTS","ModelYear":2024,"Price":95000.0,"Mileage":3500,"PayMethod":"Financing","City":"Phoenix","StateSanitized":"AZ","salesperson":"Helen Brooks","DeliveryStatusSanitized":"In Transit"},{"sale_id":16,"SaleDateSanitized":"2024-09-17","customer_name":"James Lopez","PorscheModelSanitized":"Taycan Turbo","ModelYear":2023,"Price":153200.5,"Mileage":11,"PayMethod":"ACH Payment","City":"Dallas","StateSanitized":"TX","salesperson":"samuel price","DeliveryStatusSanitized":"Delivered"},{"sale_id":17,"SaleDateSanitized":"INVALID","customer_name":"Charlotte Young","PorscheModelSanitized":"911 GT3","ModelYear":2024,"Price":241000.0,"Mileage":750,"PayMethod":"Wire Transfer","City":"Las Vegas","StateSanitized":"NV","salesperson":"PETER Ford","DeliveryStatusSanitized":"Pending"},{"sale_id":18,"SaleDateSanitized":"2024-05-11","customer_name":"Benjamin Allen","PorscheModelSanitized":"Panamera Turbo S","ModelYear":2022,"Price":132000.0,"Mileage":19250,"PayMethod":"Cash","City":"San Jose","StateSanitized":"CA","salesperson":"Angela Green","DeliveryStatusSanitized":"Delivered"},{"sale_id":19,"SaleDateSanitized":"2024-12-12","customer_name":"Amelia King","PorscheModelSanitized":"Cayenne Turbo GT","ModelYear":2024,"Price":188000.0,"Mileage":2100,"PayMethod":"Crypto Payment","City":"Houston","StateSanitized":"TX","salesperson":"Victor Stone","DeliveryStatusSanitized":"Awaiting Delivery"},{"sale_id":20,"SaleDateSanitized":"2024-12-25","customer_name":"Lucas Wright","PorscheModelSanitized":"911 Carrera Cabriolet","ModelYear":2023,"Price":127800.0,"Mileage":12000,"PayMethod":"Credit Card","City":"Atlanta","StateSanitized":"GA","salesperson":"rachel turner","DeliveryStatusSanitized":"Delivered"}];
let rawData = embeddedData.map(item => ({
  Model: item.PorscheModelSanitized,
  ModelYear: item.ModelYear,
  City: item.City,
  PayMethod: item.PayMethod,
  Price: item.Price,
  Horsepower: item.Horsepower || 0,
  FuelConsumption: item.FuelConsumption || 0
}));
let filteredData = [];
let charts = {};

// Utility to get unique values for a column
function uniqueValues(data, key) {
  return [...new Set(data.map(row => row[key]))].filter(v => v !== undefined && v !== null);
}

// Populate filter dropdowns
function populateFilters() {
  const modelSelect = document.getElementById('modelSelect');
  const yearSelect = document.getElementById('yearSelect');
  const citySelect = document.getElementById('citySelect');
  const paySelect = document.getElementById('paySelect');

  const models = uniqueValues(rawData, 'Model');
  const years = uniqueValues(rawData, 'ModelYear');
  const cities = uniqueValues(rawData, 'City');
  const pays = uniqueValues(rawData, 'PayMethod');

  [modelSelect, yearSelect, citySelect, paySelect].forEach(sel => sel.innerHTML = '<option value="">All</option>');

  models.forEach(v => modelSelect.appendChild(new Option(v, v)));
  years.forEach(v => yearSelect.appendChild(new Option(v, v)));
  cities.forEach(v => citySelect.appendChild(new Option(v, v)));
  pays.forEach(v => paySelect.appendChild(new Option(v, v)));
}

// Apply filters to raw data
function applyFilters() {
  const model = document.getElementById('modelSelect').value;
  const year = document.getElementById('yearSelect').value;
  const city = document.getElementById('citySelect').value;
  const pay = document.getElementById('paySelect').value;

  filteredData = rawData.filter(row => {
    return (!model || row['Model'] === model) &&
           (!year || String(row['ModelYear']) === year) &&
           (!city || row['City'] === city) &&
           (!pay || row['PayMethod'] === pay);
  });
}

// Render charts using filtered data
function renderCharts() {
  // Bar chart: vehicle count per model
  const countByModel = {};
  filteredData.forEach(r => {
    const m = r['Model'];
    countByModel[m] = (countByModel[m] || 0) + 1;
  });
  const barData = {
    labels: Object.keys(countByModel),
    datasets: [{ label: 'Vehicles per Model', data: Object.values(countByModel), backgroundColor: 'rgba(255, 99, 132, 0.6)' }]
  };
  if (charts.bar) charts.bar.destroy();
  const barCtx = document.getElementById('barChart').getContext('2d');
  charts.bar = new Chart(barCtx, { type: 'bar', data: barData, options: { responsive: true, plugins: { legend: { position: 'top' } } } });

  // Line chart: average price over years
  const priceByYear = {};
  filteredData.forEach(r => {
    const y = r['ModelYear'];
    if (!priceByYear[y]) priceByYear[y] = { sum: 0, count: 0 };
    priceByYear[y].sum += parseFloat(r['Price'] || 0);
    priceByYear[y].count += 1;
  });
  const yearsSorted = Object.keys(priceByYear).sort((a, b) => a - b);
  const avgPrices = yearsSorted.map(y => (priceByYear[y].sum / priceByYear[y].count).toFixed(2));
  const lineData = { labels: yearsSorted, datasets: [{ label: 'Avg Price', data: avgPrices, borderColor: 'rgba(54, 162, 235, 0.8)', tension: 0.4, fill: false }] };
  if (charts.line) charts.line.destroy();
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  charts.line = new Chart(lineCtx, { type: 'line', data: lineData, options: { responsive: true } });

  // Scatter plot: horsepower vs fuel consumption
  const scatterPoints = filteredData.map(r => ({ x: parseFloat(r['Horsepower'] || 0), y: parseFloat(r['FuelConsumption'] || 0) }));
  const scatterData = { datasets: [{ label: 'HP vs Fuel', data: scatterPoints, backgroundColor: 'rgba(75, 192, 192, 0.7)' }] };
  if (charts.scatter) charts.scatter.destroy();
  const scatterCtx = document.getElementById('scatterChart').getContext('2d');
  charts.scatter = new Chart(scatterCtx, { type: 'scatter', data: scatterData, options: { responsive: true, scales: { x: { title: { display: true, text: 'Horsepower' } }, y: { title: { display: true, text: 'Fuel Consumption (L/100km)' } } } } });

  // Top 10 most expensive vehicles table
  const top10 = [...filteredData].sort((a, b) => parseFloat(b['Price']) - parseFloat(a['Price'])).slice(0, 10);
  const tbody = document.getElementById('topTableBody');
  tbody.innerHTML = '';
  top10.forEach(row => {
    const tr = document.createElement('tr');
    ['Model', 'ModelYear', 'City', 'Price'].forEach(k => {
      const td = document.createElement('td');
      td.textContent = row[k] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// Initialize dashboard after DOM load




// Attach event listeners after DOM load
window.addEventListener('DOMContentLoaded', () => {
  populateFilters();
  applyFilters();
  renderCharts();
  ['modelSelect', 'yearSelect', 'citySelect', 'paySelect'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => { applyFilters(); renderCharts(); });
  });
});
