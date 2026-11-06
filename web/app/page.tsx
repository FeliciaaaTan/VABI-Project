import { Nav } from "@/components/ui/Nav";
import {
  Debate,
  Explore,
  Findings,
  Footer,
  Hero,
  Methodology,
  Story,
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
        <Story />
        <Takeaways />
        <Methodology />
      </main>
      <Footer />
    </>
  );
}
