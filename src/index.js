import './index.css';
import {getUsers, deleteUser} from './api/userAPI';

//Popualate of users via API call

getUsers().then(result =>{
  let usersBody="";
  result.forEach(user =>{
    usersBody+=`<tr>
    <td><a href='#' data-id="${user.id}" calss="deleteUser">Delete</a></td>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.email}</td>
    </tr>`
  });
  global.document.getElementById('users').innerHTML=usersBody;

  const deletLinks=global.document.getElementsByClassName('deleteuser');
  Array.from(deletLinks,link => {
    link.onclick=function(event){
      const element =event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
