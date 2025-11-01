import ConnectWalletButton from "../components/ConnectWalletButton";
import Header from "../components/Header";
import LogoAndTitle from "../components/LogoAndTitle";
import { RxLightningBolt } from "react-icons/rx";
import { GoShieldCheck, GoLock } from "react-icons/go";
import InfoCards from "../components/InfoCards";


const LandingPage = () => {
  const infoCards = [
    {
      id:1,
      icon: GoShieldCheck,
      title: "Trustworthy",
      desc: "All credentials are verified on-chain, ensuring authenticity and preventing fraud.",
    },
    {
      id:2,
      icon: GoLock,
      title: "Private & Secure",
      desc: "You control your data. Grant temporary access only to who you choose.",
    },
    {
      id:3,
      icon: RxLightningBolt,
      title: "Instant Verification",
      desc: "Verifiers can instantly confirm credential authenticity without intermediaries.",
    },
  ];

  return (
    <div className="pt-20 mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <LogoAndTitle extra={true} />
      <ConnectWalletButton />
      <div className="flex justify-evenly items-center mt-10">
        {infoCards.map((card) => {
          return <InfoCards key={card.id} card={card} />;
        })}
      </div>
    </div>
  );
};

export default LandingPage;
