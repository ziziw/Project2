//global variables
//select and store the list of students in a variable studentList.
const studentList = document.querySelector('.student-list').children;
//number of students to be shown per page.
const sdtPerPage = 10;
//select the .page div, and store in a variable pageDiv.
const pageDiv = document.querySelector('.page');

//parameter: list of students
//return: a number (the number of pages needed)
const pagesNeeded = (list) => {
  return Math.ceil(list.length / sdtPerPage);
}

//parameters: list of student, page number.
//show some students according to the page number.
const showPage = (list, page) => {
  const minimum = page * sdtPerPage - sdtPerPage;
  const maximum = page * sdtPerPage;

  for (let i = 0; i < list.length; i++){
    if (i >= minimum && i < maximum){
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

//If document has a .pagination div, remove it.
const removePagination = () => {
  let newDiv = document.querySelector('.pagination');
  if (document.contains(newDiv)){
    newDiv.remove();
  }
}

//parameter: list of students.
//create and append pagination. And add functionnality to the pagination.
const appendPageLinks = (list) => {

  //If document already has a .pagination div, remove it.
  removePagination();

  //call pagesNeeded function to determine the number of pages needed.
  //then store the result in a variable nbrOfPages.
  const nbrOfPages = pagesNeeded(list);

  const newDiv = document.createElement('div');
  newDiv.className = ('pagination');

  pageDiv.appendChild(newDiv);

  const newUl = document.createElement('ul');
  newDiv.appendChild(newUl);

  //for every page, create and append a page button.
  //add click event to every button.
  for (let i = 1; i <= nbrOfPages; i++){

    const newA = document.createElement('a');
    const newLi = document.createElement('li');
    newLi.appendChild(newA);
    newUl.appendChild(newLi);

    //for every button, set href to # and text content to the page number as requested.
    newA.href = '#';
    newA.textContent = i;

    //set the first page button to active.
    if (newA.textContent === '1'){
      newA.className = ('active');
    }

    //for every A button, add click event.
    newA.addEventListener('click', (event) => {
      const currPage = parseInt(event.target.textContent);
      const currNbrOfLis = newUl.childElementCount;

      //remove active class for every button.
      for (let j = 0; j < currNbrOfLis; j++){
        newUl.children[j].firstElementChild.className = '';
      }

      //set the current button to active.
      event.target.className = 'active';

      //call showPage function for the currently clicked page.
      showPage(list, currPage);
    });
  }
}

//parameter: list of students.
//create and append the search field to the .page-header div.
const appendSearchField = (list) => {
  const pageHeader = document.querySelector('.page-header');
  //select a list of all student names.
  const stuNames = document.querySelectorAll('h3');

  //create the searchField div and add className according to the example-exceeds.html and the design.css
  const searchField = document.createElement('div');
  searchField.className = "student-search";

  //create the searchBar input and add placeholder according to the example-exceeds.html and the design.css
  const searchBar = document.createElement('input');
  searchBar.placeholder = "Search for students...";

  //create the search button and add innerHTML according to the example-exceeds.html and the design.css
  const searchButt = document.createElement('button');
  searchButt.innerHTML = "Search";

  //create the no result message and append to the page div.
  const noResultsMsg = document.createElement('h1');
  pageDiv.appendChild(noResultsMsg);

  //append created elements accordingly.
  pageHeader.appendChild(searchField);
  searchField.appendChild(searchBar);
  searchField.appendChild(searchButt);

  //since both the button click event and search bar keyup event will do the same job,
  //I created a searchFunction so I don't repeat the same code.
  const searchFunction = () => {
    //create an empty array to store students that match the search criteria.
    const newList = [];
    //convert user input to upper case so the comparison is not case sensitive. Store in a variable userInput.
    const userInput = searchBar.value.toUpperCase();

    //loop over the list of all student names.
    for (let i = 0; i < stuNames.length; i++){
      const stuName = stuNames[i].textContent;

      //If student name contains the search bar value, add the student to the new list.
      //else, hide the student's display.
      //convert student name to upper case to avoid case sensitivity.
      if (stuName.toUpperCase().indexOf(userInput) > -1){
        newList.push(list[i]);
      } else {
        list[i].style.display = 'none';
      }
    }

    //if the new student list is empty, it means no student found.
    //Therefore, set the noResultMsg H1's textContent to No results.
    //call removePagination function to remove the pagination div.
    if (newList.length === 0){
      noResultsMsg.textContent = "No results";
      removePagination();
    //else, it means one or more students are found.
    //Set the noResultMsg H1 to empty.
    //Call showPage function by passing in the new student list as parameter.
    //Call the appendPageLinks function by passing in the new student list as parameter.
    } else {
      noResultsMsg.textContent = "";
      showPage(newList, 1);
      appendPageLinks(newList);
    }
  }

  //add click event to the search button, call searchFunction.
  searchButt.addEventListener('click', searchFunction);
  //add keyup event to the search bar, call searchFunction.
  searchBar.addEventListener('keyup', searchFunction);
}

//Call the showPage function to show the first page.
showPage(studentList, 1);
//Call the appendPageLinks function to create and append the pagination div.
appendPageLinks(studentList);
//Call the appendSearchField function to create and append the search field.
appendSearchField(studentList);
