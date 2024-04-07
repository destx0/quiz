import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button"
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {Button as NextButton} from '@nextui-org/button'; 
import TestBlock from "./components/TestBlock.jsx";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function Home() {
  
  return (
    <main>
      <TestBlock />
    <NextButton>Click me</NextButton>
      <div className="container">
        <Link href="/quiz">
          <Button> quiz app</Button>
        </Link>
      </div>
    </main>
  );
}
