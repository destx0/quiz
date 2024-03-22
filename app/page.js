import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className="container">
        <Link href="/quiz">
          <button> quiz app</button>
        </Link>
      </div>
    </main>
  );
}
