import LogoAndTitle from "../components/LogoAndTitle";
import CustomButton from '../components/CustomButton'

const UserSelection = () => {
  return (
    <div className="flex flex-col mt-10 mx-auto w-fit">
      <LogoAndTitle extra={false} />
      <div className="font-bold text-4xl">Select User Type</div>
      <div className="text-xl mt-3">Choose how you want to use Credible</div>
      <CustomButton type={"Issuer"} />
      <CustomButton type={"Holder"} />
      <CustomButton type={"Verifier"} />
    </div>
  );
}

export default UserSelection