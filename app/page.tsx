import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { Footer } from "@/components/landing/footer"
import Script from "next/script"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
      <Script id="voxeleon-chat" strategy="afterInteractive">
        {`window.voxeleonSettings = {"position":"right","type":"standard","launcherTitle":""};
(function(d,t) {
  var BASE_URL="https://app.voxeleon.com";
  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.src=BASE_URL+"/packs/js/voxeleon-sdk.js";
  g.async = true;
  s.parentNode.insertBefore(g,s);
  g.onload=function(){
    window.voxeleonSDK.run({
      websiteToken: 'FANHVthu9im9ESUQUPk9drtN',
      baseUrl: BASE_URL
    })
  }
})(document,"script");`}
      </Script>
    </div>
  )
}
