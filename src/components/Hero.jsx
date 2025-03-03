import model from "../img/model.png";

export const Hero = () => {
  return (
    <>
      <section className="h-[800px] bg-hero bg-no-repeat bg-center bg-cover py-24">
        <div className="container mx-auto flex justify-around h-full">
          {/* texto */}
          <div className="flex flex-col justify-center">
            <div className="font-semibold flex items-center uppercase">
              <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
              Compra aquí tu móvil
            </div>
            <h1 className="w-full bg-white border-[20px] p-[20px] mt-[20px] text-[70px] leading-[1.1] font-light mb-4 uppercase">
                Los mejores móviles{" "}
              <span className="font-semibold">de este año 2025</span>
            </h1>
          </div>
          <div className="hidden lg:block lg:w-1/2 lg:mr-20">
            <img className="lg:w-full" src={model} alt="Imagen de portada" />
          </div>
        </div>
      </section>
    </>
  );
};