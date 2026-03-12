import HeroSection from '../../src/components/home/HeroSection';
import EcosystemExplanation from '../../src/components/home/EcosystemExplanation';
import FeaturedKoonang from '../../src/components/home/FeaturedKoonang';
import PlatformGrid from '../../src/components/home/PlatformGrid';
import CoverageMap from '../../src/components/home/CoverageMap';
import PortfolioShowcase from '../../src/components/home/PortfolioShowcase';
import PartnerEcosystem from '../../src/components/home/PartnerEcosystem';
import MarketInsights from '../../src/components/home/MarketInsights';
import InvestorRelations from '../../src/components/home/InvestorRelations';
import CallToAction from '../../src/components/home/CallToAction';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-deepBlue-900 overflow-hidden">
      <HeroSection />
      <EcosystemExplanation />
      <FeaturedKoonang />
      <PlatformGrid />
      <CoverageMap />
      <PortfolioShowcase />
      <PartnerEcosystem />
      <MarketInsights />
      <InvestorRelations />
      <CallToAction />
    </div>
  );
}
