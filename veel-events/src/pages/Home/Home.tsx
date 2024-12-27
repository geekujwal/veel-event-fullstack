import { useNavigate } from "react-router";
import JitteryText from "../../components/ui/jittery-text/JitteryText";
import { JumpingText } from "../../components/ui/jumping-text";
import Marquee from "../../components/ui/marquee/Marquee";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="text-white relative  text-center h-[calc(100vh-160px)]">
      <div className="h-full">
        <div className="padding-primary container">
          <div className="flex h-1/2 items-center">
            <div>
              <div className="flex justify-center ">
                <div className="flex">
                  <JumpingText text="Hello" className="text-5xl" />
                  <JitteryText text="👋," className="text-5xl" />
                </div>
              </div>
              <JumpingText
                text="Welcome to first ever Table tennis tournament of VEEL  🏓"
                className="text-4xl"
              />
            </div>
          </div>
          <button
            className="bg-white animate-bounce mt-10 text-xl px-8 py-4 rounded-lg text-primaryBlack"
            onClick={() => navigate("/login")}
          >
            Get Started!
          </button>
        </div>
        <div className="mt-10">
          <Marquee
            sponsors={[
              "Abcon",
              "Dipesh",
              "Bijen",
              "Dipendra",
              "Pranij",
              "Aastha",
              "Bisham",
              "Shamir",
              "Abhishek",
              "Subash",
              "Aditya",
              "Sushartha",
              "Ujwal",
              "Rohan",
              "Chandra",
              "Sandesh",
              "Deepa",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
