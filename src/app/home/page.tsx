import Connections from "../connections/component";
import CreateNewConnection from "../create-new-connection/component";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row-reverse justify-between gap-4">
        <div>
          <CreateNewConnection></CreateNewConnection>
        </div>
        <div>
          <Connections></Connections>
        </div>
      </div>
    </>
  );
}
