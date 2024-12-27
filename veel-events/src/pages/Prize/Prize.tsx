import Card from "../../components/ui/card/Card";

function Prize() {
  return (
    <section className="h-full padding-primary">
      <div className="max-w-sm mx-auto ">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Tournament Prizes
        </h1>
        <Card className="mb-4">
          <h2 className="text-xl font-semibold mb-2">First Place</h2>
          <p className="text-gray-700">
            🏆 Gold Medal with exciting Gift hamper
          </p>
        </Card>

        <Card className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Second Place</h2>
          <p className="text-gray-700">🥈 Silver Medal</p>
        </Card>

        <Card className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Third Place</h2>
          <p className="text-gray-700">🥉 Bronze Medal</p>
        </Card>

        <div className="bg-yellow-100 shadow rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Match of the Tournament
          </h2>
          <p className="text-gray-700">⭐ Special gift! 😉</p>
        </div>
      </div>
    </section>
  );
}

export default Prize;
