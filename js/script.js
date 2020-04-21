/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const studentList = document.querySelector('.student-list');
const studentItems = studentList.children;
const pageHeader = document.querySelector('.page-header');
const stuNames = document.querySelectorAll('h3');

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const pagesNeeded = (listItems) => {
  return Math.ceil(listItems.length / 10);
}

const showPage = (listItems, page) => {
  const minimum = page * 10 - 10;
  const maximum = page * 10 - 1;

  for (let i = 0; i < listItems.length; i++){
    if (i >= minimum && i <= maximum){
      listItems[i].style.display = "";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

const removePagination = () => {
  let pageDiv = document.querySelector('.pagination');
  if (document.contains(pageDiv)){
    pageDiv.remove();
  }
}

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = (listItems) => {

  removePagination();

  /*Determine how many pages are needed for the list
    by dividing the total number of list items
    by the max number of items per page*/

  const nbrOfPages = pagesNeeded(listItems);

  //Create a div, give it the “pagination” class, and append it to the .page div
  const newDiv = document.createElement('div');
  newDiv.className = ('pagination');

  const pageDiv = document.querySelector('.page');
  pageDiv.appendChild(newDiv);

  //Add a ul to the “pagination” div to store the pagination links
  const newUl = document.createElement('ul');
  newDiv.appendChild(newUl);

  //for every page, add li and a tags with the page number text

  for (let i = 1; i <= nbrOfPages; i++){

    const newA = document.createElement('a');
    const newLi = document.createElement('li');

    newA.textContent = i;

    if (newA.textContent === '1'){
      newA.className = ('active');
    }

    /*Add an event listener to each a tag.
      When they are clicked call the showPage function
      to display the appropriate page*/

    newA.addEventListener('click', (event) => {
      const currPage = parseInt(event.target.textContent);
      const currNbrOfLis = newUl.childElementCount;

      //Loop over pagination links to remove active class from all links
      for (let j = 0; j < currNbrOfLis; j++){
        newUl.children[j].firstElementChild.className = '';
      }

      /*Add the active class to the link that was just clicked.
        You can identify that clicked link using event.target*/
      event.target.className = 'active';

      showPage(listItems, currPage);
    });

    newLi.appendChild(newA);
    newUl.appendChild(newLi);

  }
}

const appendSearchField = (listItems) => {

  const searchField = document.createElement('div');
  searchField.className = "student-search";

  const searchBar = document.createElement('input');
  searchBar.placeholder = "Search for students...";

  const searchButt = document.createElement('button');
  searchButt.innerHTML = "Search";

  const noResultsMsg = document.createElement('h1');
  studentList.appendChild(noResultsMsg);

  pageHeader.appendChild(searchField);
  searchField.appendChild(searchBar);
  searchField.appendChild(searchButt);

  searchButt.addEventListener('click', (event) => {
    const newList = [];
    const userInput = searchBar.value.toUpperCase();

    for (let i = 0; i < stuNames.length; i++){
      const stuName = stuNames[i].textContent;
      if (stuName.toUpperCase().indexOf(userInput) > -1){
        listItems[i].style.display = '';
        newList.push(listItems[i]);
      } else {
        listItems[i].style.display = 'none';
      }
    }
    console.log(newList);
    if (newList.length === 0){
      noResultsMsg.textContent = "No results";
      appendPageLinks(newList);
    } else {
      showPage(newList, 1);
      appendPageLinks(newList);
    }
    //if counter == 0, "No results"
    //else, show the buttons and pages.
  });

}

//run the appendPageLinks function when the webpage loads.
window.onload = () => {
  showPage(studentItems, 1);
  appendPageLinks(studentItems);
  appendSearchField(studentItems);
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.
