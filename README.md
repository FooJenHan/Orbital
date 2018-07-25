# NUS Module Mappings

#### TeamFAC
##### Team members:

1) *Enzio Kam Hai Hong*

2) *Foo Jen Han*

*Proposed Level of Achievement: **Apollo 11***

#### Problems / Motivation for project

Every academic year, many students in NUS will apply for Student Exchange Programme (SEP), and one very important stage of this application is to get the approval for the mapping of overseas modules at the partner universities, to the equivalent of NUS’s modules.

The information is presented in a PDF file (as is the case for the Faculty of Science), and it is extremely tedious and takes a long time to search for the relevant modules that students want to take at their partner universities. There is too much information presented to the student which is irrelevant to the student. There is also no way to keep track of modules that the student is interested in, unless it is done manually by writing or typing the information down.

#### Aim

We aim to create a web application with a database of module mappings to make the searching process for possible module mappings faster and easier via different filtering criteria, and to be able to track and store a list of modules (with their mappings) that the student intends to take on exchange. The project will start by targeting modules from the Faculty of Science.

#### Technical Tools / Dependencies

The framework used for the project is *Django*, with a *PostgreSQL* database.
On top of *HTML*, *CSS*,  and *JavaScript* (including *JQuery*), other dependencies include: 

- Materialize.css
- tablesort.js
- intercooler.js
- select2.js
- jquery.csv.js

Python dependencies can be found in the repository's [Pipfile](https://github.com/EnzioKam/Orbital/blob/master/Pipfile).

# Core Features

*Project can be found [here](https://nusmm.herokuapp.com/)*.

#### 1) Search function to get a list of modules that can be mapped to NUS

There is one search box, and two multiple-selection pillboxes that can be used to search for module mappings. The first search box will search by NUS module code (with or without the prefix), Partner University (PU) module’s title. The subsequent pillboxes search for the PU’s name and NUS module prefix respectively. Users can type to search for the PU names or prefixes they want that are available in the system’s database, and click to select them. Both pillboxes allow users to choose multiple names or prefixes.

The module mappings are stored in a table displayed on the mainpage of the website. It will initially be empty, and including search queries into the search box, and/or selecting options in the two pillboxes will then show the module mappings relevant to the query and selections made. For example, typing “1101” into the search box, selecting “AARHUS UNIVERSITY” in the pillbox for PU name, and selecting the prefixes “LSM” and “MA”, will show all the module mappings from Aarhus University, with the NUS module code “LSM1101” or “MA1101”.

Mapping data is obtained from the *PostgreSQL* database through *Django*, and the filtering functions are implemented through *JQuery* and *JavaScript*.

#### 2) A list of modules to be maintained on the website that the student keeps in mind as potential partner universities.

Continuing from the table in Feature 1, each mapping entry in the table will have a checkbox in that row. Clicking on the the checkbox will select the row entry which can be saved later, by pressing the *Save selected* button at the top of the table. Alternatively, users can press the *Select all* button to select all the mappings that are currently shown in the table, followed by the *Save selected* button to save all of them. We make use of *Materialize.css*’s toast elements to notify users when they have saved their selected modules, and when they attempt to save when no selections have been made. The modules that are saved are stored in the browser’s localStorage by storing them as *JavaScript* arrays and converted to *JSON* strings.

Pressing *Selected* at the sidebar will lead users to another webpage, which will contain a list of all the modules that have been selected, and grouped by the respective PU’s into separate tables. The data is obtained by getting the stored *JSON* string from localStorage and parsing them back into *JavaScript* arrays. Each table will then have a *Select all* button, similar to the table in the mainpage, and a *Delete all* button, to remove the entries selected for that table, which is the reverse operation of *Save selected* in the mainpage.

The *Select all*, *Save selected* and *Selected Modules* buttons and related functions are implemented using *JQuery* and *JavaScript*. Tables and the data are dynamically generated using *JavaScript* and styled using *Materialize.css* to add the responsiveness of the table and checkboxes.

#### 3) Administrator (Admin) Panel

For the Admin Panel, we make use of *Django*’s default Admin Panel provided, and make modifications and extensions from there. *Django*’s Admin Panel has default CRUD functionality for stored data. We create the *Django* models in the back-end, specifying the type and format each data to be stored in a Mapping object. This will allow admin and staff users to be able to do simple CRUD operations on the stored data. We designed the *Django* model to ensure that there will not be repeat entries with the exact same data, so each entry will have a set of data which will be unique.

We further extended this by implementing Comma Separated Values (CSV) file importing to import the data. This will allow for easier mass updating of new mapping entries by admin and staff users before the start of each SEP application period. This was done by implementing the import_csv method in the custom ModelAdmin for our data model in *Django*.

# Additional Features

#### 1) Graduation Planner
 
To allow NUS students to track modules taken throughout their candidature, we created a graduation planner to allow students to key in modules which they have taken. Users can access it from any of the site’s pages through the *Planner* sidebar link. 

There are 2 forms that students can use to key in their modules. The first is a form that supports NUS modules, where students can search from a dropdown list of all NUS modules. Autocomplete helps to narrow the search as students type. This was implemented using *select2*, and module data is obtained from *NUSMods API* AY18/19 module information. The second form allows users to key in custom modules, such as exchange modules or depreciated modules no longer in *NUSMods API* AY18/19 module information. Both forms are validated and require users to fill in the mandatory fields before submission.

A tab allows users to choose how added modules are displayed; by grouping under academic year and semesters, or by module prefix. Delete buttons in each row allow users to remove entries. Users can download the graduation planner modules as CSV and by Download Planner button and upload previously downloaded CSV files by Upload Planner button. On upload, module data from the CSV file will be rendered on screen.

#### 2)  Selected Modules
 
On the *Selected* page that stores module mappings that have been selected on the mainpage, we included buttons to download selected mappings as CSV files and upload previously downloaded CSV files. Upon upload, all mappings will be rendered on screen, similar to CSV features of graduation planner as mentioned previously.

For each row in the tables displayed, a click on the NUS module code opens up a *Materialise.css* Modal, showing the module code, the module codes of it's pre-requisites on the right, and the module codes of the modules it unlocks on the left. Clicking on any module code in the modal will direct the user to that module's corresponding *NUSMods* webpage, if it is available. The module data is obtained from *NUSMods API*.

#### 3)  UI

Changes to the UI were made to both the overall layout and individual webpages. For overall layout, the color scheme was changed and *Materialize.css* toast and tooltip elements were added to help guide new users who may not be familiar in using the features in the site. All tables now include sorting by different columns for users who may want to see their data in a different order.

For the main page, the original two search boxes have been replaced with only one *Materialize.css* search box (using input-field) and two *select2* pillboxes, with a clearer indication of where exactly users can type in.

For the *Selected* page, we include a description of what the page is used for and what users can do in that page. The card containing the PU name for each table now also includes the sum of module credits for both NUS modules and PU modules for the modules selected for that particular PU. To reduce clutter for the tables in Selected, PU codes in the table and now replaced by a button for each row, that when clicked on will copy the relevant PU code into the clipboard.

# Problems encountered

#### 1) Data format

The data for SEP module mappings for the Faculty of Science is only available in PDF format. Thus, we are unable to directly obtain the data to be used for our project. We circumvented this by using creating a Python script which uses the [tabula-py](https://github.com/chezou/tabula-py) module to convert the data into String format, modify and rearrange it in Python, and output to readable CSV format to update the database.

#### 2) Data handling in front-end (Performance optimisation)

Originally, all the module mapping data from the database in the back-end was sent to the front-end, and the filtering was done using *JavaScript* on the mainpage. This resulted in very slow load times when searching for module mappings in the mainpage due to the fact that the client had to always download all the data and preload it.

To improve load times for searching, we refactored the searching process. The combined search queries are sent to the back-end whenever there are changes detected in any of the search boxes. All the querying of data and filtering is done in the back-end before the data is sent back to the front-end, and the table entries are updated.

However, we realised that some queries will still result in large amounts of data being sent over to the front-end, which can still cause long loading times. We thus improved this by adding pagination to the main page’s table, so that not all the table entries need to be rendered at once. This also helped improve the UX, as the user will only have to click on the pagination arrows or page numbers to maneuver between different sections of the data, instead of scrolling through a large amount of entries

## Testing

Using Django, we implemented simple tests used to test the functionality of our data model, and to check if the correct html pages are rendered. The application is tested locally, and then deployed on Heroku. Manual testing of all the features to ensure that they work is done after each deployment.

Initial User Testing was done with a small group 4 of users, who are NUS students, to collate feedback on the features, UI and UX. From the feedback gained, we made improvements to the UI and UX including alignment of elements, sizing of the table, handling overflow in the tables, and more responsive elements to guide users to using features.

Subsequent testing involved the use of Hotjar, an external 3rd-party application that helps track page-views and page-clicks on our site. Second round of user-testing was done with a larger group of 20 NUS students. Quantitative feedback on our website was obtained through Hotjar, which gave us an indication of which features were being used most frequently, and which were used least frequently. In addition, qualitative feedback on user experience was provided to us by a feedback survey and direct communication to us.
