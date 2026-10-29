// Renders a study plan as semester tabs.
// Usage: <div id="plan-container" data-plan="plany/plan-....js"></div>
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const PROPERTIES = ['Rygor', 'Liczba godzin', 'Punkty ECTS', 'Prowadzący', 'Opis'];

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function renderCategory(categoryName, courses) {
    const section = el('div', 'category-section mb-4');
    section.appendChild(el('h4', 'font-alt mb-3', categoryName));

    const wrapper = el('div', 'table-responsive');
    const table = el('table', 'table table-striped table-bordered w-100 thick-borders');
    const headerRow = el('tr');
    ['Przedmiot', ...PROPERTIES].forEach(h => headerRow.appendChild(el('th', '', h)));
    const thead = el('thead');
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = el('tbody');
    for (const courseName in courses) {
        const row = el('tr');
        row.appendChild(el('td', 'fw-bold', courseName));
        PROPERTIES.forEach(p => {
            const value = courses[courseName][p];
            row.appendChild(el('td', '', value === undefined || value === '' ? '-' : String(value)));
        });
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    wrapper.appendChild(table);
    section.appendChild(wrapper);
    return section;
}

function renderPlan(planContainer, data) {
    const semestry = data.semestry;
    const nav = el('ul', 'nav nav-tabs tpl-minimal-tabs animate justify-content-center mb-40');
    nav.setAttribute('role', 'tablist');
    const content = el('div', 'tab-content section-text');

    Object.keys(semestry).forEach((semesterNumber, index) => {
        const paneId = `semestr-${semesterNumber}`;
        const active = index === 0;

        const li = el('li');
        const link = el('a', 'nav-link' + (active ? ' active' : ''), `Sem. ${ROMAN[semesterNumber - 1] || semesterNumber}`);
        link.href = `#${paneId}`;
        link.setAttribute('data-bs-toggle', 'tab');
        link.setAttribute('role', 'tab');
        link.setAttribute('aria-controls', paneId);
        link.setAttribute('aria-selected', active ? 'true' : 'false');
        li.appendChild(link);
        nav.appendChild(li);

        const pane = el('div', 'tab-pane fade' + (active ? ' show active' : ''));
        pane.id = paneId;
        pane.setAttribute('role', 'tabpanel');

        const categories = semestry[semesterNumber];
        for (const categoryName in categories) {
            pane.appendChild(renderCategory(categoryName, categories[categoryName]));
        }
        content.appendChild(pane);
    });

    planContainer.appendChild(nav);
    planContainer.appendChild(content);

    const legend = el('div', 'legend mt-4 mb-4 small text-muted');
    legend.innerHTML = '<strong>Legenda:</strong><br>W - wykład, C - ćwiczenia, L - laboratorium, P - projekt<br>' +
        'WI - Wydział Informatyki<br>WE - Wydział Elektryczny<br>KF/WM - Katedra Fizyki / Wydział Mechaniczny<br>' +
        'SJO - Studium Języków Obcych<br>SWFiS - Studium Wychowania Fizycznego i Sportu<br>' +
        'WZNJ - Wydział Zarządzania i Nauk o Jakości<br>' +
        'ZIS - Zakład Inżynierii Systemów<br>ZISiSI - Zakład Informatyki Stosowanej i Sztucznej Inteligencji<br>' +
        'ZM - Zakład Matematyki<br>ZPI - Zakład Podstaw Informatyki<br>ZSA - Zakład Systemów Autonomicznych';
    planContainer.appendChild(legend);
}

document.addEventListener('DOMContentLoaded', async () => {
    const planContainer = document.getElementById('plan-container');
    if (!planContainer) return;
    const planPath = planContainer.dataset.plan || 'plany/plan-informatyka-umg-dzienne.js';
    try {
        const { data } = await import(new URL(planPath, document.baseURI).href);
        renderPlan(planContainer, data);
    } catch (e) {
        console.error(e);
        planContainer.textContent = 'Nie udało się wczytać planu studiów.';
    }
});
