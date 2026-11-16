import { Nav } from "@/components/ui/Nav";
import {
  Debate,
  Explore,
  Findings,
  Footer,
  Hero,
  Methodology,
  Takeaways,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Debate />
        <Findings />
        <Explore />
        <Takeaways />
        <Methodology />
      </main>
      <Footer />
    </>
  );
}
