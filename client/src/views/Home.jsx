import Hover3D from "../js/hover3D";

const Home = (props) => {
  const createHoverEffect = () => {
    let hoverEffect = new Hover3D(".hover-effect");
  };

  setTimeout(createHoverEffect, 1000);

  return (
    <div className="">
      <div className="title-card m-auto mt-3 hover-effect">
        <div class="title-card-inner">
          <div class="title-card-front">
            <h1>ProCras</h1>
          </div>
          <div class="title-card-back">
            <h1>When it's time to cram...</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
