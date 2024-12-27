import Card from "../../components/ui/card/Card";

function Sponsors() {
  return (
    <section className="h-full padding-primary">
      <div className="max-w-sm mx-auto ">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Our sponsors:
        </h1>
        {[
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
          "Ganesh"
        ].map((item) => (
          <Card className="mb-4">
            <h2 className="text-xl font-semibold">{item}</h2>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Sponsors;