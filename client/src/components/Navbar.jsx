import { Link } from "react-router-dom";
// import { handleHover, resetStyles } from "../js/cardHover";
import planeLogo from "../assets/paper-plane.png";
import Hover3D from "../js/hover3D";

const Navbar = (props) => {
  const hoverLink = new Hover3D(".hover-card-link");
  hoverLink.xOffset = 25;
  hoverLink.yOffset = 25;

  return (
    <>
      <div className="navbar-body text-light">
        <div className="navbar-content d-flex align-items-center justify-content-between col-8 m-auto">
          <div className="d-flex align-items-center gap-2">
            <img src={planeLogo} alt="Plane Logo" className="plane-logo" />
            <h1 className="site-title">ProCras</h1>
          </div>
          <div className="links d-flex col-5 justify-content-around holder">
            <Link>
              <div className={`hover-card-link ${hoverLink}`}>
                <div className="hover-card-link-content">
                  <h4>Browse</h4>
                </div>
              </div>
            </Link>
            <Link>
              <div className={`hover-card-link ${hoverLink}`}>
                <div className="hover-card-link-content">
                  <h4>MyCards</h4>
                </div>
              </div>
            </Link>
            <Link>
              <div className={`hover-card-link ${hoverLink}`}>
                <div className="hover-card-link-content">
                  <h4>Study</h4>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
