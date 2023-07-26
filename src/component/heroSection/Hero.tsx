

function Hero() {
  return (
    <>
        <section  className={`w-full h-[300px] sm:h-[400px] md:h-[600px] md:min-h-[700px] md:max-h-[700px] bg-center bg-black`}>
            <img src="../public/images/hero_img.png" alt="TechHq" srcSet="../public/images/hero_img.png 2x" className="w-full h-full" />
        </section>
    </>
  )
}

export default Hero