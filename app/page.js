import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <main>
      <div className="container">
        <Link href="/quiz">
          <Button> quiz app</Button>
        </Link>
      </div>
    </main>
  );
}
