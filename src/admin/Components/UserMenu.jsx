const UserMenu = () => {
  
    return (
      <div className="user-menu dropdown-menu">
      <a className="nav-link" href="#"><i className="fa fa-user"></i>My Profile</a>
      <button 
        className="nav-link" 
 
      >
        <i className="fa fa-power-off"></i>Logout
      </button>
    </div>
    );
  };
  export default UserMenu;
  