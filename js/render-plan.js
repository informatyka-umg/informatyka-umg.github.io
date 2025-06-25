// Import the plan data
import { data } from "../plany/plan-informatyka-umg-dzienne.js";

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the container where we'll render the plan
    const planContainer = document.getElementById('plan-container');

    // Get the semesters data
    const semestry = data.semestry;

    // Loop through each semester
    for (const semesterNumber in semestry) {
        // Create a section for this semester
        const semesterSection = document.createElement('div');
        semesterSection.className = 'semester-section mb-5';

        // Add a heading for the semester
        const semesterHeading = document.createElement('h3');
        semesterHeading.className = 'font-alt mb-4 fw-bold text-decoration-underline';
        semesterHeading.textContent = `Semestr ${semesterNumber}`;
        semesterSection.appendChild(semesterHeading);

        // Get the categories for this semester
        const categories = semestry[semesterNumber];

        // Loop through each category in this semester
        for (const categoryName in categories) {
            // Create a section for this category
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section mb-4';

            // Add a heading for the category
            const categoryHeading = document.createElement('h4');
            categoryHeading.className = 'font-alt mb-3';
            categoryHeading.textContent = categoryName;
            categorySection.appendChild(categoryHeading);

            // Get the courses for this category
            const courses = categories[categoryName];

            // Create a table for the courses
            const table = document.createElement('table');
            table.className = 'table table-striped table-bordered w-100 thick-borders';

            // Create the table header
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Add header cells
            const headers = ['Przedmiot', 'Rygor', 'Liczba godzin', 'Punkty ECTS', 'Prowadzący', 'Opis', 'Narzędzia, języki, technologie'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create the table body
            const tbody = document.createElement('tbody');

            // Loop through each course in this category
            for (const courseName in courses) {
                const courseData = courses[courseName];

                // Create a row for this course
                const row = document.createElement('tr');

                // Add the course name cell
                const nameCell = document.createElement('td');
                nameCell.textContent = courseName;
                row.appendChild(nameCell);

                // Add cells for each property
                const properties = ['Rygor', 'Liczba godzin', 'Punkty ECTS', 'Prowadzący', 'Opis', 'Narzędzia, języki, technologie'];
                properties.forEach(property => {
                    const cell = document.createElement('td');
                    cell.textContent = courseData[property] || '-';
                    row.appendChild(cell);
                });

                tbody.appendChild(row);
            }

            table.appendChild(tbody);
            categorySection.appendChild(table);

            semesterSection.appendChild(categorySection);
        }

        // Add the semester section to the plan container
        planContainer.appendChild(semesterSection);
    }

    // Add legend after all tables have been processed
    const legend = document.createElement('div');
    legend.className = 'legend mt-4 mb-4 small text-muted';
    legend.innerHTML = '<strong>Legenda:</strong><br>W - wykład, C - ćwiczenia, L - laboratorium, P - projekt<br>WI - Wydział Informatyki<br>ZIS - Zakład Informatyki Stosowanej i Sztucznej Inteligencji<br>ZIS - Zakład Inżynierii Systemów<br>ZM - Zakład Matematyki<br>ZPI - Zakład Podstaw Informatyki<br>ZSA - Zakład Systemów Autonomicznych';
    planContainer.appendChild(legend);
});
