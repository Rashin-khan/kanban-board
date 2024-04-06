import React from "react";

function Header({ setDropdownData }) {
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setDropdownData(event.target.value)
  };

  const toggleVisibility = (event) => {
    if (document.getElementById("myDropdown").classList.contains("hide")) {
      document.getElementById("myDropdown").classList.remove("hide");
      document.getElementById("myDropdown").classList.add("dropdown-content");
    } else {
      document.getElementById("myDropdown").classList.remove("dropdown-content");
      document.getElementById("myDropdown").classList.add("hide");
    }
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('hide')) {
          openDropdown.classList.remove('hide');
        }
      }
    }
  }

  return (
    <div class="header">
      <div className="dropdown">
        <button className="dropbtn" onClick={toggleVisibility}>Display</button>

        <div id="myDropdown" class="hide">
          <div className="dropdownDiv">
            Grouping
            <select className="dropdownSelect" onChange={handleSelectChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdownDiv">
            Ordering
            <select className="dropdownSelect" onChange={handleSelectChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Header;