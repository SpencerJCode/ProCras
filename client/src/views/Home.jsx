import Hover3D from "../assets/js/hover3D";

const Home = (props) => {
  const createHoverEffect = () => {
    let hoverEffect = new Hover3D(".hover-effect");
  };

  document.querySelector(".navbar-body").style.display = "block"

  setTimeout(createHoverEffect, 1000);

  return (
    <div className="">
      <div className="title-card m-auto mt-3 hover-effect">
        <div className="title-card-inner">
          <div className="title-card-front">
            <h1>ProCras</h1>
          </div>
          <div className="title-card-back">
            <h1>When it's time to cram...</h1>
          </div>
        </div>
      </div>
      <div className="card mt-4 col-9 m-auto">
        <h3 className="text-center text-secondary card-header">A Flash-Card App Created by:</h3>
        <div className="card-body">
          <div className="contact-info d-flex justify-content-around gap-2">
            <div className="left card col-4">
              <h4 className="card-header">Bill Davies</h4>
              <div className="card-body"></div>
            </div>
            <div className="middle card col-4">
              <h4 className="card-header">Spencer Johnson</h4>
              <div className="card-body">
                <div className="d-flex gap-2">
                  <img src="https://avatars.githubusercontent.com/u/123844048?v=4" alt="Spencer Photo" className="contributors-photo" />
                  <div className="contact-links d-flex flex-column">
                    <a href="https://www.linkedin.com/in/spencer-j-6ba942198?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC5pwW4Bi9Gw52oFDn1jiSuITTlZTZMLIiA&lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BgFFTfPE3Sf21lhy09kSfqQ%3D%3D" target="_blank">Linkedin</a>
                    <a href="https://github.com/SpencerJCode" target="_blank">GitHub</a>
                    <a href="mailto:spencerjcode@gmail.com" target="_blank">Email</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="right card col-4">
              <h4 className="card-header">Evan Wiorek</h4>
              <div className="card-body">
                <div className="d-flex gap-2">
                  <img src="https://avatars.githubusercontent.com/u/124269000?v=4" alt="Evan Photo" className="contributors-photo" />
                  <div className="contact-links d-flex flex-column">
                    <a href="http://evanwiorek.com" target="_blank">Portfolio</a>
                    <a href="https://www.linkedin.com/in/evan-wiorek-082900104/" target="_blank">Linkedin</a>
                    <a href="https://github.com/EvanWiorek/" target="_blank">GitHub</a>
                    <a href="https://docs.google.com/document/d/1tZlbV8r2pbCLak3IxiGfJN4ycTAuYcPlBnHfAlfiX-s/edit?usp=sharing" target="_blank">Resume</a>
                    <a href="mailto:wiorek.evan@gmail.com" target="_blank">Email</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
